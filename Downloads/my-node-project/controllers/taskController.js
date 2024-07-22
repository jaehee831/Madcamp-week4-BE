//db에서 파일을 불러오는 등의 api 로직
const db = require('../config/db');

exports.addTask = async (req, res) => {
  const { task_name, description, start_time, end_time, store_id, user_id } = req.body;

  console.log('Received task creation request:', req.body);  // 요청 데이터를 로그에 기록

  if (!task_name || !description || !start_time || !end_time || !store_id || !user_id) {
    return res.status(400).send('Missing required fields');
  }

  const taskQuery = 'INSERT INTO tasks (task_name, description, start_time, end_time, store_id) VALUES (?, ?, ?, ?, ?)';

  try {
    const db = req.db;  // req.db 사용

    const [taskResult] = await db.query(taskQuery, [task_name, description, start_time, end_time, store_id]);
    const taskId = taskResult.insertId;

    const userTaskQuery = 'INSERT INTO user_task (user_id, task_id) VALUES ?';
    const userTasks = user_id.map(userId => [userId, taskId]);

    await db.query(userTaskQuery, [userTasks]);

    res.status(200).send('Task added successfully');
  } catch (err) {
    console.error('Error inserting task:', err);  // 에러를 로그에 기록
    res.status(500).send('Error inserting task');
  }
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


exports.getTasks = async (req, res) => {
  const { store_id } = req.body;

  if (!store_id) {
      return res.status(400).json({ error: 'store_id is required' });
  }

  const query = 'SELECT task_name, description, start_time, end_time FROM tasks WHERE store_id = ?';
  try {
      const [rows] = await db.query(query, [store_id]);
      if (rows.length === 0) {
          res.json({ message: 'No tasks found for the specified store_id' });
      } else {
          res.json(rows);
      }
  } catch (error) {
      console.error('Database query error: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
