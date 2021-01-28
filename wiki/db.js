const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres:/wiki', {
  logging: false,
  dialect: 'postgres'
});

module.exports = sequelize;