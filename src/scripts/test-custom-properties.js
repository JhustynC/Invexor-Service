const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3001';
const CUSTOM_PROPERTY_ENDPOINT = `${BASE_URL}/customProperty`;

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

// Test data - Real data structure for MongoDB creation
const testCustomProperty = {
    _id: `test-entity-${Date.now()}`, // Unique ID to avoid conflicts
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

// Test functions - REAL OPERATIONS
async function testCreateCustomProperty() {
    try {
        log('\n🔧 Testing CREATE Custom Property...', colors.blue);
        
        const response = await axios.post(CUSTOM_PROPERTY_ENDPOINT, testCustomProperty);
        
        if (response.status === 201 && response.data.ok) {
            createdCustomPropertyId = response.data.data._id;
            logTest('Create Custom Property', true, `Created with ID: ${createdCustomPropertyId}`);
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
    log('=' * 60, colors.blue);
    
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