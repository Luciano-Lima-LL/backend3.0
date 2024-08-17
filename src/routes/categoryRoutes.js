const CategoryController = require('../controllers/CategoryController'); 
const express = require('express');
const router = express.Router();

router.get('/v1/category/search', CategoryController.getCategories);
router.get('/v1/category/:id', CategoryController.getCategoryById);
router.post('/v1/category', CategoryController.createCategory);
router.put('/v1/category/:id', CategoryController.updateCategory);
router.delete('/v1/category/:id', CategoryController.deleteCategory);

module.exports = {router}; 