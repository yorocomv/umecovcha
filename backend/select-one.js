const pool = require('./pool');

export const getCustomerById = async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    const db = await pool.connect();
    try {
        const rows = (await db.query('SELECT * FROM customers WHERE id = $1;', [id])).rows;
        return res.status(200).json(rows);
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};