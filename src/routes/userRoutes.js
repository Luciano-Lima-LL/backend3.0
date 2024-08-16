// src/routes/userRoutes.js
const express = require('express');
const usercontroller = require('../controllers/usercontroller');

const router = express.Router();

router.get('/v1/user/:id', usercontroller.getUserById); // Requisito 01
router.post('/v1/user', usercontroller.createUser); // Requisito 02
router.put('/v1/user/:id', usercontroller.updateUser); // Requisito 04
router.delete('/v1/user/:id', usercontroller.deleteUser); // Requisito 05

module.exports = router;
