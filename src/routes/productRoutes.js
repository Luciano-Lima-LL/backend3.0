const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

router.get('/v1/product/search', ProductController.getProducts);
router.get('/v1/product/:id', ProductController.getProductById);
router.post('/v1/product', ProductController.createProduct);
router.put('/v1/product/:id', ProductController.updateProduct);
router.delete('/v1/product/:id', ProductController.deleteProduct);

module.exports = router;