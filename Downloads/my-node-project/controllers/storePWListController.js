const db = require('../config/db');

exports.getStorePWList = async (req, res) => {
    try {
        const [rows, fields] = await db.query('SELECT password FROM stores');
        const passwordList = rows.map(row => row.password);
        res.json(passwordList);
    } catch (error) {
        console.error('Database query error: ', error);
        res.status(500).json({ error: 'Database query error' });
    }
};