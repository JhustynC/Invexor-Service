import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Invexor Service API',
            version: '1.0.0',
            description: 'API REST for Invexor Service - Complete management system for areas, branches, entities, items, resources, transactions, and users and user roles',

            contact: {
                name: 'Invexor Team',
                email: 'support@invexor.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Development server'
            },
            {
                url: 'http://localhost:3000',
                description: 'Deploy server'
            }
        ],
        components: {
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Error message'
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: 'Health',
                description: 'API health check endpoints'
            },
            {
                name: 'Users',
                description: 'User management endpoints'
            },
            {
                name: 'Areas',
                description: 'Area management endpoints'
            },
            {
                name: 'Branches',
                description: 'Branch management endpoints'
            },
            {
                name: 'Entities',
                description: 'Entity management endpoints'
            },
            {
                name: 'Items',
                description: 'Item management endpoints'
            },
            {
                name: 'ItemTypes',
                description: 'Item type management endpoints'
            },
            {
                name: 'Resources',
                description: 'Resource management endpoints'
            },
            {
                name: 'UserRoles',
                description: 'User role management endpoints'
            },
            {
                name: 'Transactions',
                description: 'Transaction management endpoints'
            }   
        ]
    },
    apis: [
        './src/presentation/routes.ts',
        './src/presentation/user/user.routes.ts',
        './src/presentation/area/area.routes.ts',
        './src/presentation/branch/branch.routes.ts',
        './src/presentation/entity/entity.routes.ts',
        './src/presentation/item/item.routes.ts',
        './src/presentation/itemType/itemType.routes.ts',
        './src/presentation/resource/resource.routes.ts',
        './src/presentation/userRol/userRol.routes.ts',
        './src/presentation/transaction/transaction.routes.ts'  
    ]
};

export const swaggerSpec = swaggerJSDoc(options); 