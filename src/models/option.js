const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const Product = require('./Product'); 
const Option = sequelize.define('Option', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product, 
      key: 'id',
    },
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shape: {
    type: DataTypes.ENUM('square', 'circle'),
    defaultValue: 'square',
  },
  radius: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  type: {
    type: DataTypes.ENUM('text', 'color'),
    defaultValue: 'text',
  },
  values: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'options',
  timestamps: true, 
});

Product.hasMany(Option, { foreignKey: 'product_id' });
Option.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Option;