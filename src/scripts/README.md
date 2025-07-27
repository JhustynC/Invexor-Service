# API Test Scripts

This directory contains test scripts for testing the Invexor Service API endpoints.

## Available Test Scripts

### 1. Custom Properties Test Script (`test-custom-properties.js`)
Tests all endpoints related to custom properties management.

**Endpoints tested:**
- `POST /customProperty` - Create custom property
- `GET /customProperty` - Get all custom properties
- `GET /customProperty/:id` - Get custom property by ID
- `PUT /customProperty/:id` - Update custom property
- `DELETE /customProperty/:id` - Delete custom property
- `POST /customProperty/:id/properties` - Add property to custom property
- `GET /customProperty/:id/properties/:key` - Get specific property value
- `DELETE /customProperty/:id/properties/:key` - Remove specific property

### 2. Form Templates Test Script (`test-form-templates.js`)
Tests all endpoints related to form templates management.

**Endpoints tested:**
- `POST /template` - Create form template
- `GET /template` - Get all form templates
- `GET /template/:id` - Get form template by ID
- `GET /template/name/:name` - Get form template by name
- `PUT /template/:id` - Update form template
- `DELETE /template/:id` - Delete form template

## Prerequisites

1. **Node.js and npm** installed on your system
2. **Axios** package installed (for HTTP requests)
3. **Invexor Service** running on `http://localhost:3000`

## Installation

1. Navigate to the scripts directory:
```bash
cd invexor-service/src/scripts
```

2. Install axios if not already installed:
```bash
npm install axios
```

## Usage

### Running Individual Test Scripts

#### Test Custom Properties API:
```bash
node test-custom-properties.js
```

#### Test Form Templates API:
```bash
node test-form-templates.js
```

### Running Both Test Scripts

You can run both scripts sequentially:

```bash
node test-custom-properties.js && node test-form-templates.js
```

## Test Features

### Custom Properties Tests
- ✅ Create custom property with initial properties
- ✅ Get all custom properties
- ✅ Get custom property by ID
- ✅ Update custom property properties
- ✅ Add new property to existing custom property
- ✅ Get specific property value
- ✅ Remove specific property
- ✅ Delete custom property
- ✅ Error handling for invalid requests
- ✅ Error handling for non-existent resources

### Form Templates Tests
- ✅ Create form template with various control types
- ✅ Get all form templates
- ✅ Get form template by ID
- ✅ Get form template by name
- ✅ Update form template
- ✅ Delete form template
- ✅ Test all form control types (text, textarea, select, checkbox, toggle, range)
- ✅ Test validation rules (required, email, minLength, maxLength, pattern)
- ✅ Error handling for invalid requests
- ✅ Error handling for non-existent resources

## Test Data

### Custom Properties Test Data
```javascript
{
    _id: 'test-entity-123',
    properties: {
        color: 'blue',
        size: 'large',
        material: 'plastic'
    }
}
```

### Form Templates Test Data
The script tests various form control types including:
- Text fields with validation
- Text areas
- Select dropdowns with options
- Checkboxes
- Toggle switches
- Range sliders
- Email validation
- Pattern validation
- Length validation

## Output

The test scripts provide colored console output with:
- 🟢 **Green**: Passed tests
- 🔴 **Red**: Failed tests
- 🟡 **Yellow**: Test details
- 🔵 **Blue**: Test section headers

Example output:
```
🚀 Starting Custom Properties API Tests
==================================================
🔧 Testing CREATE Custom Property...
✅ PASS - Create Custom Property
   Details: Created with ID: 507f1f77bcf86cd799439011

📋 Testing GET ALL Custom Properties...
✅ PASS - Get All Custom Properties
   Details: Found 1 properties

📊 Test Results: 9/9 tests passed
🎉 All tests passed! Custom Properties API is working correctly.
```

## Error Handling

The scripts include comprehensive error handling tests:
- Invalid data validation
- Non-existent resource handling
- Missing required fields
- Server error responses

## Configuration

You can modify the following configuration in each script:

```javascript
const BASE_URL = 'http://localhost:3000'; // Change if your API runs on different port
```

## Troubleshooting

### Common Issues

1. **Connection refused**: Make sure the Invexor Service is running
2. **404 errors**: Check that the API routes are properly configured
3. **Validation errors**: Verify the test data structure matches the DTOs
4. **Database errors**: Ensure MongoDB is running and accessible

### Debug Mode

To see more detailed error information, you can modify the scripts to log the full error response:

```javascript
} catch (error) {
    console.error('Full error:', error.response?.data || error.message);
    logTest('Test Name', false, error.response?.data?.message || error.message);
    return false;
}
```

## Contributing

When adding new endpoints or modifying existing ones, please update the corresponding test script to ensure comprehensive coverage.

## Notes

- The scripts clean up after themselves by deleting test data
- Tests are designed to be idempotent (can be run multiple times safely)
- All tests include proper error handling and validation
- The scripts use async/await for better readability and error handling 