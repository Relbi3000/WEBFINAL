
---

# Sports Event Management

**Sports Event Management** — это веб-приложение для управления спортивными мероприятиями. Пользователи могут создавать, просматривать, редактировать и удалять события, регистрироваться на мероприятия, а также управлять своим профилем. Приложение построено на Node.js и Express.js, использует MongoDB для хранения данных и реализует аутентификацию с помощью JWT и bcrypt. Кроме того, реализована Role-Based Access Control (RBAC), позволяющая только создателю события или администратору редактировать и удалять мероприятия.

---

## Содержание

- [Обзор проекта](#обзор-проекта)
- [Технологии](#технологии)
- [Структура проекта](#структура-проекта)
- [Установка и запуск](#установка-и-запуск)
- [API Документация](#api-документация)
- [Дополнительные функции](#дополнительные-функции)
- [Деплой](#деплой)
- [Защита проекта](#защита-проекта)

---

## Обзор проекта

**Sports Event Management** позволяет пользователям:
- **Регистрация и аутентификация:** Создавать аккаунты, входить в систему с помощью JWT, защищая приватные эндпоинты.
- **Управление событиями:** Создавать, изменять, удалять и просматривать спортивные события. Доступ к редактированию/удалению ограничен — только создатель события или администратор может выполнять эти действия.
- **Регистрация на события:** Пользователи могут регистрироваться на мероприятия.
- **Управление профилем:** Получать и изменять данные своего профиля.

---

## Технологии

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (с использованием Mongoose)  
- **Frontend:** EJS, Bootstrap 5, CSS, JavaScript  
- **Аутентификация:** JWT, bcrypt  
- **Безопасность:** Helmet, express-mongo-sanitize, express-rate-limit  
- **Дополнительные библиотеки:** method-override (для поддержки PUT и DELETE в HTML‑формах)

---

## Структура проекта

```
sports-event-management/
├── node_modules/           
├── public/                 
│   ├── style.css           # Стилизация проекта
│   ├── scripts.js          # Клиентские скрипты
│   ├── images/             # Изображения
│   └── icons/              # Иконки
├── views/                  
│   ├── layout.ejs          # Основной шаблон (header, footer)
│   ├── index.ejs           # Главная страница: список событий
│   ├── add-event.ejs       # Форма для создания события
│   ├── edit-event.ejs      # Форма для редактирования события
│   ├── event-details.ejs   # Детальный просмотр события
│   ├── stats.ejs           # Статистика по событиям
│   ├── register.ejs        # Форма регистрации пользователя
│   ├── login.ejs           # Форма входа
│   ├── registration.ejs    # Форма регистрации на событие
│   └── profile.ejs         # Управление профилем пользователя
├── models/                 
│   ├── Event.js            # Модель события
│   ├── User.js             # Модель пользователя
│   └── Registration.js     # Модель регистрации на событие
├── routes/                 
│   ├── eventRoutes.js      # Маршруты для событий
│   ├── userRoutes.js       # Маршруты для пользователей
│   └── registrationRoutes.js # Маршруты для регистрации на событие
├── controllers/            
│   ├── eventController.js  # Логика для событий
│   ├── userController.js   # Логика для пользователей
│   └── registrationController.js  # Логика для регистрации
├── middlewares/            
│   └── auth.js             # Middleware для проверки аутентификации
├── .env                    # Переменные окружения (PORT, MONGO_URI, JWT_SECRET)
├── server.js               # Основной серверный файл
├── package.json            # Конфигурация npm
└── README.md               # Документация проекта (это файл)
```

---

## Установка и запуск

1. **Клонируйте репозиторий:**

   ```bash
   git clone <repository_url>
   ```

2. **Перейдите в директорию проекта:**

   ```bash
   cd sports-event-management
   ```

3. **Установите зависимости:**

   ```bash
   npm install
   ```

4. **Настройте переменные окружения:**  
   Создайте файл `.env` в корневой директории и добавьте:
   
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/sports_events_db
   JWT_SECRET=your_jwt_secret
   ```

   Замените `your_jwt_secret` на безопасную, сгенерированную строку.

5. **Запустите приложение:**

   ```bash
   npm run dev
   ```

6. **Откройте приложение в браузере:**  
   Перейдите по адресу [http://localhost:3000](http://localhost:3000)

---

## API Документация

### Authentication (Public Endpoints)

- **POST /users/register**  
  Регистрирует нового пользователя с хешированным паролем.  
  **Тело запроса:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```

- **POST /users/login**  
  Аутентифицирует пользователя и устанавливает JWT в cookie.  
  **Тело запроса:**
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```

### User Management (Private Endpoints)

- **GET /users/profile**  
  Получает профиль текущего пользователя.

- **PUT /users/profile**  
  Обновляет профиль текущего пользователя.  
  **Тело запроса:**
  ```json
  {
    "name": "New Name",
    "email": "newemail@example.com"
  }
  ```

### Events Management (Private Endpoints)

- **POST /events**  
  Создаёт новое событие (только для авторизованных пользователей).  
  **Тело запроса:**
  ```json
  {
    "name": "Football Match",
    "date": "2025-03-01",
    "location": "Stadium",
    "description": "Quarter-final match."
  }
  ```

- **PUT /events/edit/:id**  
  Обновляет событие. Доступно только для создателя события или администратора.  
  **Тело запроса:**
  ```json
  {
    "name": "Updated Event Name",
    "date": "2025-03-02",
    "location": "Updated Location",
    "description": "Updated description."
  }
  ```

- **DELETE /events/delete/:id**  
  Удаляет событие. Доступно только для создателя события или администратора.

- **GET /events**  
  Получает список всех событий (публично).

- **GET /events/:id**  
  Получает детальную информацию о событии (публично).

- **GET /events/stats**  
  Получает статистику по событиям (например, количество участников).

### Event Registration (Private Endpoints)

- **GET /registrations/register/:eventId**  
  Отображает форму регистрации на событие (только для авторизованных пользователей).

- **POST /registrations/register/:eventId**  
  Регистрирует пользователя на событие (userId берётся из JWT).

---

## Дополнительные функции

- **Role-Based Access Control (RBAC):**  
  Только создатель события или пользователь с ролью `"admin"` может редактировать или удалять событие.

- **Method Override:**  
  Для поддержки HTTP‑методов PUT и DELETE в HTML‑формах используется пакет method-override.

- **Глобальный обработчик ошибок:**  
  Все ошибки обрабатываются глобальным middleware, возвращающим понятные сообщения.

---
