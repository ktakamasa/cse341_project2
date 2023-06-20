const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Trips API'
  },
  host: 'cse341-planner.onrender.com',
  schemes: ['https']
};

const outputFile = 'swagger.json';
const endpointsFiles = ['routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
