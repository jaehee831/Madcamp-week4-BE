const db = require('../config/db');

exports.addUserTask = async (req, res) => {
    const { task_id, user_ids } = req.body;

    if (!task_id || !Array.isArray(user_ids) || user_ids.length === 0) {
        return res.status(400).send('task_id and user_ids are required and user_ids should be a non-empty array');
    }

    const userTaskQuery = 'INSERT INTO user_task (task_id, user_id) VALUES ?';
    const userTasks = user_ids.map(userId => [task_id, userId]);

    try {
        const db = req.db;
        await db.query(userTaskQuery, [userTasks]);
        res.status(200).send('User tasks added successfully');
    } catch (err) {
        console.error('Error inserting user tasks:', err);
        res.status(500).send('Error inserting user tasks');
    }
};