const express = require('express');
const OptionController = require('../controllers/optionController');

const router = express.Router();

// Definir rotas para as operações de opções
router.post('/options', OptionController.createOption);
router.get('/options/:id', OptionController.getOptionById);
router.put('/options/:id', OptionController.updateOption);
router.delete('/options/:id', OptionController.deleteOption);

module.exports = router;
