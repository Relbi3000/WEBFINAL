const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Регистрация' });
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.redirect('/users/login');
  } catch (err) {
    res.status(400).send('Ошибка при регистрации: ' + err.message);
  }
};

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Вход' });
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send('Неверные учетные данные');
    }
    // Генерация JWT-токена
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Устанавливаем токен в cookie (httpOnly для безопасности)
    res.cookie('token', token, { httpOnly: true });
    
    // Перенаправляем пользователя на главную страницу событий
    res.redirect('/events');
  } catch (err) {
    res.status(400).send('Ошибка при входе: ' + err.message);
  }
};
