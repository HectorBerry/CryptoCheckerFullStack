const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'CryptoPriceChecker API',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    servers: [{ url: 'http://localhost:3000', description: 'Development server' }],
  },
  apis: ['src/routes/*.ts'], // Path to your API routes
};

const specs = swaggerJsDoc(options);
export default specs;