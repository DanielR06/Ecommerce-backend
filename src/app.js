const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan')
require('dotenv').config();
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');

// Esta es nuestra aplicación
const app = express();

// Middlewares 
app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors());
app.use(morgan('dev'))

// rutas
app.use(router);


// Middlewares después de las rutas
app.use(errorHandler);

module.exports = app;