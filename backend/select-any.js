const pool = require('./pool');

export const getCustomers = async (req, res, next) => {

    const setLimit = (size = 30, page = 1) => {
        [size, page] = [parseInt(size, 10), parseInt(page, 10)];
        if (Number.isNaN(size) || Number.isNaN(page) || size <= 0 || page <= 0) {
            [size, page] = [30, 1];
        }
        const query = {};
        query.limit = size;
        query.offset = size * page - size;
        return query;
    };
    const { limit, offset } = setLimit(req.query.size, req.query.page);

    const db = await pool.connect();
    try {
        const rows = (await db.query('SELECT * FROM customers ORDER BY id ASC LIMIT $1 OFFSET $2;', [limit, offset])).rows;
        return res.status(200).json(rows);
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};

export const searchCustomer = async (req, res, next) => {
    const name = req.query['search-name'];

    const db = await pool.connect();
    try {
        const rows = (await db.query(`SELECT * FROM customers WHERE search_name LIKE '%${name}%';`)).rows;
        return res.status(200).json(rows);
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};

export const getSameAddress = async (req, res, next) => {
    const addressSha1 = req.query['address-sha1'];

    const db = await pool.connect();
    try {
        const rows = (await db.query('SELECT * FROM customers WHERE address_sha1 = $1;', [addressSha1])).rows;
        return res.status(200).json(rows);
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};