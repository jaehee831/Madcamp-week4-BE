//db에서 파일을 불러오는 등의 api 로직
const db = require('../config/db');

exports.addTask = (req, res) => {
  const { task_name, description, start_time, end_time, users } = req.body;
  
  console.log('Received task creation request:', req.body);  // 요청 데이터를 로그에 기록
  
  if (!task_name || !description || !start_time || !end_time || !users) {
    return res.status(400).send('Missing required fields');
  }

  const taskQuery = 'INSERT INTO tasks (task_name, description, start_time, end_time) VALUES (?, ?, ?, ?)';

  db.query(taskQuery, [task_name, description, start_time, end_time], (err, result) => {
    if (err) {
      console.error('Error inserting task:', err);  // 에러를 로그에 기록
      return res.status(500).send('Error inserting task');
    }
    const taskId = result.insertId;

    const userTaskQuery = 'INSERT INTO user_task (user_id, task_id) VALUES ?';
    const userTasks = users.map(userId => [userId, taskId]);

    db.query(userTaskQuery, [userTasks], (err, result) => {
      if (err) {
        console.error('Error inserting user tasks:', err);  // 에러를 로그에 기록
        return res.status(500).send('Error inserting user tasks');
      }
      res.send('Task added successfully');
    });
  });
};

exports.getUsers = (req, res) => {
  const userQuery = 'SELECT iduser, name FROM user';
  db.query(userQuery, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);  // 에러를 로그에 기록
      return res.status(500).send('Error fetching users');
    }
    res.json(results);
  });
};
