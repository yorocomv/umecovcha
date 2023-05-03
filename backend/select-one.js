import pool from './pool';

export const getCustomerById = async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    const db = await pool.connect();
    try {
        const rows = (await db.query('SELECT * FROM customers WHERE id = $1;', [id])).rows;
        if (rows !== null && rows.length === 1) {
            return res.status(200).json(rows);
        } else {
            return res.status(404).json('Customer does not exist.');
        }
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};

export const getMaxSha1SameVal = async (req, res, next) => {
    const addressSha1 = req.query['address-sha1'];

    const db = await pool.connect();
    try {
        // rows の後に続けるとデータベースに当該レコードが存在しない場合アプリがクラッシュする ↓↓要修正↓↓
        const max = (await db.query('SELECT MAX(sha1_same_val) AS max FROM customers WHERE address_sha1 = $1;', [addressSha1])).rows[0]['max'];
        return res.status(200).json(max);
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};

export const getNoteByPrimaryKey = async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const num = parseInt(req.params.num, 10);

    const db = await pool.connect();
    try {
        const rows = (await db.query(`SELECT * FROM notes WHERE customer_id = ${id} AND rank = ${num};`)).rows;
        return res.status(200).json(rows);
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};
