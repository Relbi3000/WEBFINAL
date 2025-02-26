const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Форма регистрации
router.get('/register', userController.registerForm);

// Регистрация пользователя
router.post('/register', userController.registerUser);

// Форма входа
router.get('/login', userController.loginForm);

// Вход пользователя
router.post('/login', userController.loginUser);

module.exports = router;
