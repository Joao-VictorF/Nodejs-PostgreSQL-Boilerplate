const Sequelize = require('sequelize');
const db_config = require('./config.json')
require('dotenv').config();

const sequelize = new Sequelize(
  db_config[process.env.NODE_ENV].database, // Database name
  db_config[process.env.NODE_ENV].username, // Database username
  db_config[process.env.NODE_ENV].password, // Database password
  { 
    host: db_config[process.env.NODE_ENV].host, // Database host
    dialect: db_config[process.env.NODE_ENV].dialect // Database type
  }
);

sequelize
  .authenticate()
  .then(async () =>  {
    console.log('[ DB CONNECTION SUCCEFULLY STARTED ]');
  })
  .catch((err) => {
    console.error(`[ SOMETHING WENT WRONG WHEN CONNECTING TO DB ]\n`) // eslint-disable-line no-console
    console.log('==============================================');
    console.log(err.toString());
  });

module.exports = sequelize;