const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const Product = require('./Product'); 

const Image = sequelize.define('Image', {
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
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'images',
  timestamps: true, 
});


Product.hasMany(Image, { foreignKey: 'product_id' });
Image.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Image;