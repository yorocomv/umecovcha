const pool = require('./pool');

export const deleteCustomerById = async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    const db = await pool.connect();
    try {
        const result = await db.query('DELETE FROM customers WHERE id = $1', [id]);
        const text = `${result.command} ${result.rowCount} row(s).`;
        console.log(text);
        return res.status(200).send(`${JSON.stringify(text)}`);
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};
