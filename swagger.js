const options = {
    definition: {
        openapi: '3.0.0',
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        info: {
            title: 'HR System API',
            version: '1.0.0',
            description: 'API for managing users and attendance in an HR system',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Path to the API docs
};

module.exports = options;
