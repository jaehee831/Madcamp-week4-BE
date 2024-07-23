// 서버를 설정하고 라우트를 연결
const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const storeIdRoutes = require('./routes/storeIdRoutes');
const storePWListRoutes = require('./routes/storePWListRoutes');
const userStoreRoutes = require('./routes/userStoreRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const storeRoutes = require('./routes/storeRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const userTaskRoutes = require('./routes/userTaskRoutes');
const boardRoutes = require('./routes/boardRoutes');
const postRoutes = require('./routes/postRoutes');
const userWageRoutes = require('./routes/userWageRoutes'); 
const initializeDatabase = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

initializeDatabase().then((db) => {
  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  app.use('/', userRoutes);
  app.use('/', taskRoutes);
  app.use('/', storeIdRoutes);
  app.use('/', storePWListRoutes);
  app.use('/', userStoreRoutes);
  app.use('/', attendanceRoutes); 
  app.use('/', storeRoutes);
  app.use('/', noticeRoutes);
  app.use('/', userTaskRoutes); 
  app.use('/', boardRoutes);
  app.use('/', postRoutes);
  app.use('/', userWageRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to initialize database:', error);
});
