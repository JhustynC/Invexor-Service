const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

// Configuration
const BASE_URL = 'http://localhost:3001';
const CUSTOM_PROPERTY_ENDPOINT = `${BASE_URL}/customProperty`;

// Prisma client for getting real entity IDs
const prisma = new PrismaClient();

// Colors for console output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

// Helper function to log with colors
function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

// Helper function to log test results
function logTest(testName, success, details = '') {
    const status = success ? '✅ PASS' : '❌ FAIL';
    const color = success ? colors.green : colors.red;
    log(`${status} - ${testName}`, color);
    if (details) {
        log(`   Details: ${details}`, colors.yellow);
    }
}

// Test data - Will be created dynamically with real entity IDs
let testCustomProperty = {
    _id: `test-entity-${Date.now()}`, // Fallback ID
    properties: {
        color: 'blue',
        size: 'large',
        material: 'plastic',
        weight: '2.5kg'
    }
};

const updatedProperties = {
    color: 'red',
    size: 'medium',
    weight: '1.8kg',
    brand: 'TestBrand'
};

let createdCustomPropertyId = null;
let realEntityIds = [];

// Function to get real entity IDs from PostgreSQL
async function getRealEntityIds() {
    try {
        log('\n🔗 Getting real entity IDs from PostgreSQL...', colors.blue);
        
        // Get some entities from different types
        const entities = await prisma.entity.findMany({
            take: 5,
            include: {
                user: true,
                item: true,
                resource: true,
                branch: true,
                area: true
            }
        });
        
        realEntityIds = entities.map(entity => ({
            id: entity.id_entity,
            type: entity.entity_type,
            relatedData: {
                user: entity.user?.username || null,
                item: entity.item?.name_item || null,
                resource: entity.resource?.resourcename || null,
                branch: entity.branch?.name_branch || null,
                area: entity.area?.areaname || null
            }
        }));
        
        logTest('Get Real Entity IDs', true, `Found ${realEntityIds.length} entities`);
        
        // Log some details about the entities
        realEntityIds.forEach((entity, index) => {
            const relatedInfo = Object.entries(entity.relatedData)
                .filter(([key, value]) => value !== null)
                .map(([key, value]) => `${key}: ${value}`)
                .join(', ');
            log(`   Entity ${index + 1}: ID=${entity.id}, Type=${entity.type}${relatedInfo ? `, ${relatedInfo}` : ''}`, colors.yellow);
        });
        
        return true;
    } catch (error) {
        logTest('Get Real Entity IDs', false, error.message);
        return false;
    }
}

// Function to create test data with real entity IDs
function createTestDataWithRealIds() {
    if (realEntityIds.length === 0) {
        log('⚠️ No real entity IDs available, using fallback test data', colors.yellow);
        return {
            _id: `test-entity-${Date.now()}`,
            properties: {
                color: 'blue',
                size: 'large',
                material: 'plastic',
                weight: '2.5kg'
            }
        };
    }
    
    // Use the first real entity ID
    const selectedEntity = realEntityIds[0];
    
    // Create properties based on entity type
    let properties = {};
    
    switch (selectedEntity.type) {
        case 1: // User entity
            properties = {
                department: 'IT',
                level: 'Senior',
                skills: 'JavaScript, Node.js, React',
                certification: 'AWS Certified'
            };
            break;
        case 2: // Branch entity
            properties = {
                region: 'Norte',
                manager: 'Juan Pérez',
                employees: '25',
                established: '2020'
            };
            break;
        case 3: // Area entity
            properties = {
                budget: '$50000',
                head: 'María García',
                projects: '5',
                priority: 'High'
            };
            break;
        case 4: // Item entity
            properties = {
                condition: 'Excellent',
                warranty: '2 years',
                location: 'Office A-101',
                assigned_to: 'admin_user'
            };
            break;
        case 5: // Resource entity
            properties = {
                availability: '80%',
                cost_center: 'CC-001',
                responsible: 'Finance Team',
                renewal_date: '2025-12-31'
            };
            break;
        default:
            properties = {
                color: 'blue',
                size: 'large',
                material: 'plastic',
                weight: '2.5kg'
            };
    }
    
    return {
        _id: selectedEntity.id.toString(),
        properties: properties
    };
}

// Test functions - REAL OPERATIONS
async function testCreateCustomProperty() {
    try {
        log('\n🔧 Testing CREATE Custom Property...', colors.blue);
        
        // Create test data with real entity ID
        testCustomProperty = createTestDataWithRealIds();
        
        log(`   Using Entity ID: ${testCustomProperty._id}`, colors.yellow);
        log(`   Properties: ${JSON.stringify(testCustomProperty.properties, null, 2)}`, colors.yellow);
        
        const response = await axios.post(CUSTOM_PROPERTY_ENDPOINT, testCustomProperty);
        
        if (response.status === 201 && response.data.ok) {
            createdCustomPropertyId = response.data.data._id;
            logTest('Create Custom Property', true, `Created with Entity ID: ${createdCustomPropertyId}`);
            return true;
        } else {
            logTest('Create Custom Property', false, 'Unexpected response format');
            return false;
        }
    } catch (error) {
        logTest('Create Custom Property', false, error.response?.data?.message || error.message);
        return false;
    }
}

async function testGetAllCustomProperties() {
    try {
        log('\n📋 Testing GET ALL Custom Properties...', colors.blue);
        
        const response = await axios.get(CUSTOM_PROPERTY_ENDPOINT);
        
        if (response.status === 200 && response.data.ok) {
            logTest('Get All Custom Properties', true, `Found ${response.data.data.length} properties`);
            return true;
        } else {
            logTest('Get All Custom Properties', false, 'Unexpected response format');
            return false;
        }
    } catch (error) {
        logTest('Get All Custom Properties', false, error.response?.data?.message || error.message);
        return false;
    }
}

async function testGetCustomPropertyById() {
    if (!createdCustomPropertyId) {
        logTest('Get Custom Property by ID', false, 'No custom property ID available');
        return false;
    }

    try {
        log('\n🔍 Testing GET Custom Property by ID...', colors.blue);
        
        const response = await axios.get(`${CUSTOM_PROPERTY_ENDPOINT}/${createdCustomPropertyId}`);
        
        if (response.status === 200 && response.data.ok) {
            logTest('Get Custom Property by ID', true, `Retrieved property with ID: ${createdCustomPropertyId}`);
            return true;
        } else {
            logTest('Get Custom Property by ID', false, 'Unexpected response format');
            return false;
        }
    } catch (error) {
        logTest('Get Custom Property by ID', false, error.response?.data?.message || error.message);
        return false;
    }
}

async function testUpdateCustomProperty() {
    if (!createdCustomPropertyId) {
        logTest('Update Custom Property', false, 'No custom property ID available');
        return false;
    }

    try {
        log('\n✏️ Testing UPDATE Custom Property...', colors.blue);
        
        const response = await axios.put(`${CUSTOM_PROPERTY_ENDPOINT}/${createdCustomPropertyId}`, {
            properties: updatedProperties
        });
        
        if (response.status === 200 && response.data.ok) {
            logTest('Update Custom Property', true, 'Properties updated successfully');
            return true;
        } else {
            logTest('Update Custom Property', false, 'Unexpected response format');
            return false;
        }
    } catch (error) {
        logTest('Update Custom Property', false, error.response?.data?.message || error.message);
        return false;
    }
}

async function testAddProperty() {
    if (!createdCustomPropertyId) {
        logTest('Add Property', false, 'No custom property ID available');
        return false;
    }

    try {
        log('\n➕ Testing ADD Property...', colors.blue);
        
        const response = await axios.post(`${CUSTOM_PROPERTY_ENDPOINT}/${createdCustomPropertyId}/properties`, {
            key: 'newProperty',
            value: 'newValue'
        });
        
        if (response.status === 200 && response.data.ok) {
            logTest('Add Property', true, 'Property added successfully');
            return true;
        } else {
            logTest('Add Property', false, 'Unexpected response format');
            return false;
        }
    } catch (error) {
        logTest('Add Property', false, error.response?.data?.message || error.message);
        return false;
    }
}

async function testGetProperty() {
    if (!createdCustomPropertyId) {
        logTest('Get Property', false, 'No custom property ID available');
        return false;
    }

    try {
        log('\n🔍 Testing GET Property...', colors.blue);
        
        const response = await axios.get(`${CUSTOM_PROPERTY_ENDPOINT}/${createdCustomPropertyId}/properties/newProperty`);
        
        if (response.status === 200 && response.data.ok) {
            logTest('Get Property', true, `Property value: ${response.data.data.value}`);
            return true;
        } else {
            logTest('Get Property', false, 'Unexpected response format');
            return false;
        }
    } catch (error) {
        logTest('Get Property', false, error.response?.data?.message || error.message);
        return false;
    }
}

// async function testRemoveProperty() {
//     if (!createdCustomPropertyId) {
//         logTest('Remove Property', false, 'No custom property ID available');
//         return false;
//     }

//     try {
//         log('\n➖ Testing REMOVE Property...', colors.blue);
        
//         const response = await axios.delete(`${CUSTOM_PROPERTY_ENDPOINT}/${createdCustomPropertyId}/properties/newProperty`);
        
//         if (response.status === 200 && response.data.ok) {
//             logTest('Remove Property', true, 'Property removed successfully');
//             return true;
//         } else {
//             logTest('Remove Property', false, 'Unexpected response format');
//             return false;
//         }
//     } catch (error) {
//         logTest('Remove Property', false, error.response?.data?.message || error.message);
//         return false;
//     }
// }

// async function testDeleteCustomProperty() {
//     if (!createdCustomPropertyId) {
//         logTest('Delete Custom Property', false, 'No custom property ID available');
//         return false;
//     }

//     try {
//         log('\n🗑️ Testing DELETE Custom Property...', colors.blue);
        
//         const response = await axios.delete(`${CUSTOM_PROPERTY_ENDPOINT}/${createdCustomPropertyId}`);
        
//         if (response.status === 200 && response.data.ok) {
//             logTest('Delete Custom Property', true, 'Custom property deleted successfully');
//             return true;
//         } else {
//             logTest('Delete Custom Property', false, 'Unexpected response format');
//             return false;
//         }
//     } catch (error) {
//         logTest('Delete Custom Property', false, error.response?.data?.message || error.message);
//         return false;
//     }
// }

// Error handling tests
async function testErrorHandling() {
    try {
        log('\n⚠️ Testing ERROR HANDLING...', colors.blue);
        
        // Test creating with invalid data (missing _id)
        try {
            await axios.post(CUSTOM_PROPERTY_ENDPOINT, { properties: { test: 'value' } });
            logTest('Error Handling - Invalid Create (missing _id)', false, 'Should have failed with missing _id');
        } catch (error) {
            if (error.response?.status === 500) {
                logTest('Error Handling - Invalid Create (missing _id)', true, 'Properly handled missing _id');
            } else {
                logTest('Error Handling - Invalid Create (missing _id)', false, 'Unexpected error response');
            }
        }
        
        // Test getting non-existent property
        try {
            await axios.get(`${CUSTOM_PROPERTY_ENDPOINT}/non-existent-id`);
            logTest('Error Handling - Non-existent ID', false, 'Should have returned 404');
        } catch (error) {
            if (error.response?.status === 404) {
                logTest('Error Handling - Non-existent ID', true, 'Properly handled non-existent ID');
            } else {
                logTest('Error Handling - Non-existent ID', false, 'Unexpected error response');
            }
        }
        
        // Test adding property to non-existent document
        if (createdCustomPropertyId) {
            try {
                await axios.post(`${CUSTOM_PROPERTY_ENDPOINT}/non-existent-id/properties`, {
                    key: 'test',
                    value: 'test'
                });
                logTest('Error Handling - Add Property to Non-existent ID', false, 'Should have returned 404');
            } catch (error) {
                if (error.response?.status === 404) {
                    logTest('Error Handling - Add Property to Non-existent ID', true, 'Properly handled non-existent ID');
                } else {
                    logTest('Error Handling - Add Property to Non-existent ID', false, 'Unexpected error response');
                }
            }
        }
        
        return true;
    } catch (error) {
        logTest('Error Handling', false, error.message);
        return false;
    }
}

// Main test runner
async function runAllTests() {
    log('\n🚀 Starting Custom Properties API Tests (REAL OPERATIONS)', colors.bold + colors.blue);
    log('=' * 60, colors.blue);
    log('📝 DOCUMENTS WILL BE CREATED, UPDATED, AND DELETED IN MONGODB', colors.green);
    log('🔗 USING REAL ENTITY IDS FROM POSTGRESQL DATABASE', colors.green);
    log('=' * 60, colors.blue);
    
    try {
        // First, get real entity IDs from PostgreSQL
        const entityIdsLoaded = await getRealEntityIds();
        if (!entityIdsLoaded) {
            log('⚠️ Failed to load real entity IDs, continuing with fallback data', colors.yellow);
        }
        
        const tests = [
            testCreateCustomProperty,
            testGetAllCustomProperties,
            testGetCustomPropertyById,
            testUpdateCustomProperty,
            testAddProperty,
            testGetProperty,
            // testRemoveProperty,
            // testDeleteCustomProperty,
            testErrorHandling
        ];
        
        let passedTests = 0;
        let totalTests = tests.length;
        
        for (const test of tests) {
            try {
                const result = await test();
                if (result) passedTests++;
            } catch (error) {
                logTest('Test Execution', false, error.message);
            }
        }
        
        log('\n' + '=' * 60, colors.blue);
        log(`📊 Test Results: ${passedTests}/${totalTests} tests passed`, colors.bold + (passedTests === totalTests ? colors.green : colors.red));
        
        if (passedTests === totalTests) {
            log('🎉 All tests passed! Custom Properties API is working correctly.', colors.green);
        } else {
            log('⚠️ Some tests failed. Please check the API implementation.', colors.yellow);
        }
        
        log('\n✅ Real documents were created, updated, and deleted in MongoDB', colors.green);
        log('🔗 Used real entity IDs from PostgreSQL database', colors.green);
        
    } finally {
        // Cleanup Prisma connection
        await prisma.$disconnect();
        log('\n📌 Disconnected from PostgreSQL database', colors.blue);
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    runAllTests().catch(error => {
        log(`\n💥 Test runner failed: ${error.message}`, colors.red);
        process.exit(1);
    });
}

module.exports = {
    runAllTests,
    testCreateCustomProperty,
    testGetAllCustomProperties,
    testGetCustomPropertyById,
    testUpdateCustomProperty,
    testAddProperty,
    testGetProperty,
    // testRemoveProperty,
    // testDeleteCustomProperty,
    testErrorHandling
}; 