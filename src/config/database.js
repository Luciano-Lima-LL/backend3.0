const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.HOST,
  port: process.env.PORTA_BANCO,
  username: process.env.USUARIO,
  password: process.env.SENHA,
  database: process.env.BANCO,
});

module.exports = sequelize;
