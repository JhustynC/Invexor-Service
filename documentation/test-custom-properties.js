const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testCustomProperties() {
    console.log('🧪 Testing Custom Properties API...\n');

    try {
        // Test 1: Create a new custom property document
        console.log('1. Creating a new custom property document...');
        const createResponse = await axios.post(`${BASE_URL}/customProperty`, {
            _id: 'user_001',
            properties: {
                theme: 'dark',
                language: 'es',
                notifications: 'enabled'
            }
        });
        console.log('✅ Created:', createResponse.data.data);
        console.log('');

        // Test 2: Get all custom properties
        console.log('2. Getting all custom properties...');
        const getAllResponse = await axios.get(`${BASE_URL}/customProperty`);
        console.log('✅ All custom properties:', getAllResponse.data.data);
        console.log('');

        // Test 3: Get specific custom property by ID
        console.log('3. Getting custom property by ID...');
        const getByIdResponse = await axios.get(`${BASE_URL}/customProperty/user_001`);
        console.log('✅ Custom property by ID:', getByIdResponse.data.data);
        console.log('');

        // Test 4: Add a new property
        console.log('4. Adding a new property...');
        const addPropertyResponse = await axios.post(`${BASE_URL}/customProperty/user_001/properties`, {
            key: 'timezone',
            value: 'America/Mexico_City'
        });
        console.log('✅ Added property:', addPropertyResponse.data.data);
        console.log('');

        // Test 5: Get specific property value
        console.log('5. Getting specific property value...');
        const getPropertyResponse = await axios.get(`${BASE_URL}/customProperty/user_001/properties/theme`);
        console.log('✅ Property value:', getPropertyResponse.data.data);
        console.log('');

        // Test 6: Update properties
        console.log('6. Updating properties...');
        const updateResponse = await axios.put(`${BASE_URL}/customProperty/user_001`, {
            properties: {
                theme: 'light',
                language: 'en',
                notifications: 'disabled',
                timezone: 'America/Mexico_City'
            }
        });
        console.log('✅ Updated properties:', updateResponse.data.data);
        console.log('');

        // Test 7: Remove a property
        console.log('7. Removing a property...');
        const removePropertyResponse = await axios.delete(`${BASE_URL}/customProperty/user_001/properties/notifications`);
        console.log('✅ Removed property:', removePropertyResponse.data.data);
        console.log('');

        // Test 8: Delete the document
        console.log('8. Deleting the document...');
        const deleteResponse = await axios.delete(`${BASE_URL}/customProperty/user_001`);
        console.log('✅ Deleted:', deleteResponse.data.message);
        console.log('');

        console.log('🎉 All tests passed successfully!');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

// Run the tests
testCustomProperties(); 