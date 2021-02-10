// Server
const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
require('module-alias/register')

// Loggers
const morgan     = require('morgan');

// Routing and connections
const router     = require('@routes/routes');
const sequelize  = require('@config/config');

require('dotenv').config();

const app = express();
// --------------------------- LOGGING -----------------------------

const logger     = require('@common/winston');
app.use(morgan('dev')); // HTTP requests in development

// ----------------------------- APP -------------------------------
app.use(cors({origin: "*"}));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Load routes
app.use(router);

// Route not found
app.use((req, res) => {
  logger.log({
    level: 'info',
    message: `The route ${req.url} was not found.`
  });

  return res.status(404).json({
    message: "Route not found."
  })
});

module.exports = app;
