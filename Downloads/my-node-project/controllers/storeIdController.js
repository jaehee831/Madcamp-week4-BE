const initializeDatabase = require('../config/db');

exports.handlePassword = async (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    try {
        const db = req.db;
        const connection = await initializeDatabase();
        // 먼저 중복된 password가 있는지 확인
        const [rows] = await connection.execute('SELECT idstores FROM stores WHERE password = ?', [password]);

        if (rows.length > 0) {
            // 이미 존재하는 경우 해당 store_id 반환
            res.status(200).json({ idstores: rows[0].idstores });
        } else {
            // 중복되지 않은 경우 새로운 password 삽입
            const [results] = await connection.execute('INSERT INTO stores (password) VALUES (?)', [password]);
            res.status(200).json({ idstores: results.insertId });
        }

    } catch (err) {
        console.error('Error processing request: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
