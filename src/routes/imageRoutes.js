const express = require('express');
const ImageController = require('../controllers/imageController');

const router = express.Router();

router.post('/images', ImageController.createImage);
router.get('/images/:id', ImageController.getImageById);
router.put('/images/:id', ImageController.updateImage);
router.delete('/images/:id', ImageController.deleteImage);

module.exports = router;
