const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3001';
const FORM_TEMPLATE_ENDPOINT = `${BASE_URL}/template`;

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

// Test data - Sample form template
const testFormTemplate = {
    name: 'Test User Form',
    description: 'A test form template for user registration',
    category: 'user-management',
    version: '1.0.0',
    controls: [
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            validators: {
                required: true,
                minLength: 2,
                maxLength: 50
            }
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            validators: {
                required: true,
                minLength: 2,
                maxLength: 50
            }
        },
        {
            name: 'email',
            label: 'Email Address',
            type: 'text',
            validators: {
                required: true,
                email: true
            }
        },
        {
            name: 'age',
            label: 'Age',
            type: 'range',
            options: {
                min: '18',
                max: '100',
                step: '1'
            }
        },
        {
            name: 'department',
            label: 'Department',
            type: 'select',
            selectOptions: [
                { label: 'Engineering', value: 'engineering' },
                { label: 'Marketing', value: 'marketing' },
                { label: 'Sales', value: 'sales' },
                { label: 'HR', value: 'hr' }
            ]
        },
        {
            name: 'isActive',
            label: 'Active Status',
            type: 'toggle',
            value: 'true'
        },
        {
            name: 'notes',
            label: 'Additional Notes',
            type: 'textarea',
            validators: {
                maxLength: 500
            }
        }
    ]
};

const updatedFormTemplate = {
    name: 'Updated User Form',
    description: 'An updated test form template for user registration',
    category: 'user-management',
    version: '1.1.0',
    controls: [
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            validators: {
                required: true,
                minLength: 2,
                maxLength: 50
            }
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            validators: {
                required: true,
                minLength: 2,
                maxLength: 50
            }
        },
        {
            name: 'email',
            label: 'Email Address',
            type: 'text',
            validators: {
                required: true,
                email: true
            }
        },
        {
            name: 'phone',
            label: 'Phone Number',
            type: 'text',
            validators: {
                pattern: '^[0-9]{10}$'
            }
        }
    ]
};

let createdFormTemplateId = null;

// Test functions
async function testCreateFormTemplate() {
    try {
        log('\n🔧 Testing CREATE Form Template...', colors.blue);
        
        const response = await axios.post(FORM_TEMPLATE_ENDPOINT, testFormTemplate);
        
        if (response.status === 201 && response.data.ok) {
            createdFormTemplateId = response.data.data.id;
            logTest('Create Form Template', true, `Created with ID: ${createdFormTemplateId}`);
            return true;
        } else {
            logTest('Create Form Template', false, 'Unexpected response format');
            return false;
        }
    } catch (error) {
        logTest('Create Form Template', false, error.response?.data?.message || error.message);
        return false;
    }
}

async function testGetAllFormTemplates() {
    try {
        log('\n📋 Testing GET ALL Form Templates...', colors.blue);
        
        const response = await axios.get(FORM_TEMPLATE_ENDPOINT);
        
        if (response.status === 200 && response.data.ok) {
            logTest('Get All Form Templates', true, `Found ${response.data.data.length} templates`);
            return true;
        } else {
            logTest('Get All Form Templates', false, 'Unexpected response format');
            return false;
        }
    } catch (error) {
        logTest('Get All Form Templates', false, error.response?.data?.message || error.message);
        return false;
    }
}

async function testGetFormTemplateById() {
    if (!createdFormTemplateId) {
        logTest('Get Form Template by ID', false, 'No form template ID available');
        return false;
    }

    try {
        log('\n🔍 Testing GET Form Template by ID...', colors.blue);
        
        const response = await axios.get(`${FORM_TEMPLATE_ENDPOINT}/${createdFormTemplateId}`);
        
        if (response.status === 200 && response.data.ok) {
            logTest('Get Form Template by ID', true, `Retrieved template with ID: ${createdFormTemplateId}`);
            return true;
        } else {
            logTest('Get Form Template by ID', false, 'Unexpected response format');
            return false;
        }
    } catch (error) {
        logTest('Get Form Template by ID', false, error.response?.data?.message || error.message);
        return false;
    }
}

async function testGetFormTemplateByName() {
    try {
        log('\n🔍 Testing GET Form Template by Name...', colors.blue);
        
        const response = await axios.get(`${FORM_TEMPLATE_ENDPOINT}/name/${testFormTemplate.name}`);
        
        if (response.status === 200 && response.data.ok) {
            logTest('Get Form Template by Name', true, `Retrieved template: ${testFormTemplate.name}`);
            return true;
        } else {
            logTest('Get Form Template by Name', false, 'Unexpected response format');
            return false;
        }
    } catch (error) {
        logTest('Get Form Template by Name', false, error.response?.data?.message || error.message);
        return false;
    }
}

async function testUpdateFormTemplate() {
    if (!createdFormTemplateId) {
        logTest('Update Form Template', false, 'No form template ID available');
        return false;
    }

    try {
        log('\n✏️ Testing UPDATE Form Template...', colors.blue);
        
        const response = await axios.put(`${FORM_TEMPLATE_ENDPOINT}/${createdFormTemplateId}`, updatedFormTemplate);
        
        if (response.status === 200 && response.data.ok) {
            logTest('Update Form Template', true, 'Template updated successfully');
            return true;
        } else {
            logTest('Update Form Template', false, 'Unexpected response format');
            return false;
        }
    } catch (error) {
        logTest('Update Form Template', false, error.response?.data?.message || error.message);
        return false;
    }
}

async function testDeleteFormTemplate() {
    if (!createdFormTemplateId) {
        logTest('Delete Form Template', false, 'No form template ID available');
        return false;
    }

    try {
        log('\n🗑️ Testing DELETE Form Template...', colors.blue);
        
        const response = await axios.delete(`${FORM_TEMPLATE_ENDPOINT}/${createdFormTemplateId}`);
        
        if (response.status === 200 && response.data.ok) {
            logTest('Delete Form Template', true, 'Form template deleted successfully');
            return true;
        } else {
            logTest('Delete Form Template', false, 'Unexpected response format');
            return false;
        }
    } catch (error) {
        logTest('Delete Form Template', false, error.response?.data?.message || error.message);
        return false;
    }
}

// Test different form control types
async function testFormControlTypes() {
    try {
        log('\n🧪 Testing FORM CONTROL TYPES...', colors.blue);
        
        const controlTypesTemplate = {
            name: 'Control Types Test Form',
            description: 'Testing different form control types',
            category: 'testing',
            version: '1.0.0',
            controls: [
                {
                    name: 'textField',
                    label: 'Text Field',
                    type: 'text',
                    validators: { required: true }
                },
                {
                    name: 'textArea',
                    label: 'Text Area',
                    type: 'textarea',
                    validators: { maxLength: 200 }
                },
                {
                    name: 'selectField',
                    label: 'Select Field',
                    type: 'select',
                    selectOptions: [
                        { label: 'Option 1', value: 'opt1' },
                        { label: 'Option 2', value: 'opt2' }
                    ]
                },
                {
                    name: 'checkboxField',
                    label: 'Checkbox Field',
                    type: 'checkbox',
                    value: 'false'
                },
                {
                    name: 'toggleField',
                    label: 'Toggle Field',
                    type: 'toggle',
                    value: 'true'
                },
                {
                    name: 'rangeField',
                    label: 'Range Field',
                    type: 'range',
                    options: {
                        min: '0',
                        max: '100',
                        step: '5'
                    }
                }
            ]
        };
        
        const response = await axios.post(FORM_TEMPLATE_ENDPOINT, controlTypesTemplate);
        
        if (response.status === 201 && response.data.ok) {
            logTest('Form Control Types', true, 'All control types created successfully');
            
            // Clean up - delete the test template
            const templateId = response.data.data.id;
            await axios.delete(`${FORM_TEMPLATE_ENDPOINT}/${templateId}`);
            
            return true;
        } else {
            logTest('Form Control Types', false, 'Unexpected response format');
            return false;
        }
    } catch (error) {
        logTest('Form Control Types', false, error.response?.data?.message || error.message);
        return false;
    }
}

// Error handling tests
async function testErrorHandling() {
    try {
        log('\n⚠️ Testing ERROR HANDLING...', colors.blue);
        
        // Test creating with invalid data (missing required fields)
        try {
            await axios.post(FORM_TEMPLATE_ENDPOINT, {
                name: 'Invalid Template'
                // Missing controls array
            });
            logTest('Error Handling - Invalid Create', false, 'Should have failed with missing controls');
        } catch (error) {
            if (error.response?.status === 400) {
                logTest('Error Handling - Invalid Create', true, 'Properly handled missing required fields');
            } else {
                logTest('Error Handling - Invalid Create', false, 'Unexpected error response');
            }
        }
        
        // Test getting non-existent template
        try {
            await axios.get(`${FORM_TEMPLATE_ENDPOINT}/non-existent-id`);
            logTest('Error Handling - Non-existent ID', false, 'Should have returned 404');
        } catch (error) {
            if (error.response?.status === 404) {
                logTest('Error Handling - Non-existent ID', true, 'Properly handled non-existent ID');
            } else {
                logTest('Error Handling - Non-existent ID', false, 'Unexpected error response');
            }
        }
        
        // Test getting non-existent template by name
        try {
            await axios.get(`${FORM_TEMPLATE_ENDPOINT}/name/non-existent-name`);
            logTest('Error Handling - Non-existent Name', false, 'Should have returned 404');
        } catch (error) {
            if (error.response?.status === 404) {
                logTest('Error Handling - Non-existent Name', true, 'Properly handled non-existent name');
            } else {
                logTest('Error Handling - Non-existent Name', false, 'Unexpected error response');
            }
        }
        
        return true;
    } catch (error) {
        logTest('Error Handling', false, error.message);
        return false;
    }
}

// Validation tests
async function testValidationRules() {
    try {
        log('\n✅ Testing VALIDATION RULES...', colors.blue);
        
        const validationTemplate = {
            name: 'Validation Test Form',
            description: 'Testing form validation rules',
            category: 'testing',
            version: '1.0.0',
            controls: [
                {
                    name: 'requiredField',
                    label: 'Required Field',
                    type: 'text',
                    validators: {
                        required: true
                    }
                },
                {
                    name: 'emailField',
                    label: 'Email Field',
                    type: 'text',
                    validators: {
                        required: true,
                        email: true
                    }
                },
                {
                    name: 'lengthField',
                    label: 'Length Field',
                    type: 'text',
                    validators: {
                        minLength: 5,
                        maxLength: 20
                    }
                },
                {
                    name: 'patternField',
                    label: 'Pattern Field',
                    type: 'text',
                    validators: {
                        pattern: '^[A-Za-z]+$'
                    }
                }
            ]
        };
        
        const response = await axios.post(FORM_TEMPLATE_ENDPOINT, validationTemplate);
        
        if (response.status === 201 && response.data.ok) {
            logTest('Validation Rules', true, 'Validation rules created successfully');
            
            // Clean up - delete the test template
            const templateId = response.data.data.id;
            await axios.delete(`${FORM_TEMPLATE_ENDPOINT}/${templateId}`);
            
            return true;
        } else {
            logTest('Validation Rules', false, 'Unexpected response format');
            return false;
        }
    } catch (error) {
        logTest('Validation Rules', false, error.response?.data?.message || error.message);
        return false;
    }
}

// Main test runner
async function runAllTests() {
    log('\n🚀 Starting Form Templates API Tests', colors.bold + colors.blue);
    log('=' * 50, colors.blue);
    
    const tests = [
        testCreateFormTemplate,
        testGetAllFormTemplates,
        testGetFormTemplateById,
        testGetFormTemplateByName,
        testUpdateFormTemplate,
        testFormControlTypes,
        testValidationRules,
        testDeleteFormTemplate,
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
    
    log('\n' + '=' * 50, colors.blue);
    log(`📊 Test Results: ${passedTests}/${totalTests} tests passed`, colors.bold + (passedTests === totalTests ? colors.green : colors.red));
    
    if (passedTests === totalTests) {
        log('🎉 All tests passed! Form Templates API is working correctly.', colors.green);
    } else {
        log('⚠️ Some tests failed. Please check the API implementation.', colors.yellow);
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
    testCreateFormTemplate,
    testGetAllFormTemplates,
    testGetFormTemplateById,
    testGetFormTemplateByName,
    testUpdateFormTemplate,
    testDeleteFormTemplate,
    testFormControlTypes,
    testValidationRules,
    testErrorHandling
}; 