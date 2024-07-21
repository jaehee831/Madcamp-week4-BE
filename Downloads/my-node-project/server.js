//서버를 설정하고 라우트를 연결
const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use('/', userRoutes);
app.use('/', taskRoutes); // db table 이름

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
