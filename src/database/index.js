require('dotenv').config();

const { Sequelize,DataTypes } = require('sequelize');

const defineLevel = require('../models/level_model');
const defineUserLevel = require('../models/user_level_model');
const defineUser = require('../models/user_model');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

const Level = defineLevel(sequelize, DataTypes);
const UserLevel = defineUserLevel(sequelize, DataTypes);
const User = defineUser(sequelize, DataTypes);

sequelize.authenticate()
  .then(() => console.log('Conecting to the database.'))
  .catch(err => console.error('It was not possible to conect the database:', err));

sequelize.sync({ alter: true, force: false })
  .then(() => console.log('Sync done.'))
  .catch(err => console.error('Error error in the sync:', err));

module.exports = {
    Level,
    UserLevel,
    User,
};