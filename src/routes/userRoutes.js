// src/routes/userRoutes.js
const express = require('express');
const usercontroller = require('../controllers/usercontroller');

const router = express.Router();

router.get('/', (req , res) => {
    res.send('FUNCIONANDO MEU QUERIDO!!!');
})
router.get('/v1/user/:id', usercontroller.getUserById); 
router.post('/v1/user', usercontroller.createUser); 
router.put('/v1/user/:id', usercontroller.updateUser); 
router.delete('/v1/user/:id', usercontroller.deleteUser);

module.exports = {router};
