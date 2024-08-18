const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const Product = require('./Product'); 
const Category = require('./category'); 

const ProductCategory = sequelize.define('ProductCategory', {
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id', 
    },
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category, 
      key: 'id', 
    },
    allowNull: false,
  },
}, {
  tableName: 'product_categories', 
  timestamps: true, 
});

Product.belongsToMany(Category, { through: ProductCategory, foreignKey: 'product_id' });
Category.belongsToMany(Product, { through: ProductCategory, foreignKey: 'category_id' });

module.exports = ProductCategory;