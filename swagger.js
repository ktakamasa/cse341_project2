const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Trips API'
  },
  host: ['localhost:3000', 'cse341-planner.onrender.com'],
  schemes: ['http', 'https']
};

const outputFile = 'swagger.json';
const endpointsFiles = ['routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
