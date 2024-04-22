import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'CryptoChecker API with Swagger',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    servers: [{ url: 'http://localhost:3000', description: 'Development server' }],
  },
  apis: ['src/routes/*.ts'], // Path to your API routes
};

const specs = swaggerJsdoc(options);
export default specs;