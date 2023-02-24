import pool from './pool';

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
    let name = req.query['search-name'];

    const db = await pool.connect();
    try {

        /* 検索条件を組み立て */
        let optionalCondition = '';
        if (/^(.+[^\s]*)\s+::([^:]+)$/.test(name)) {
            name = RegExp.$1;
            optionalCondition = ` AND nja_city LIKE '${RegExp.$2}%'`;
        }
        else if (/^(.+[^\s]*)\s+:([^:]+)$/.test(name)) {
            name = RegExp.$1;
            optionalCondition = ` AND nja_pref LIKE '${RegExp.$2}%'`;
        }

        const nameArr = name.split(/\s+/);
        let essentialCondition = '';
        for (let i = 0; i < nameArr.length; i++) {
            if (i > 0) essentialCondition += ' AND ';
            essentialCondition += `searched_name LIKE '%${nameArr[i]}%'`;
        }
        const searchCondition = essentialCondition + optionalCondition;

        /* 不正クエリをチェック */
        if (/%%/.test(searchCondition)) return res.status(400).json('400 Bad Request');

        const rows = (await db.query(`SELECT * FROM customers WHERE ${searchCondition} ORDER BY updated_at DESC;`)).rows;
        if (rows !== null && rows.length > 0) {
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

export const getSameAddress = async (req, res, next) => {
    const addressSha1 = req.query['address-sha1'];

    const db = await pool.connect();
    try {
        const rows = (await db.query('SELECT * FROM customers WHERE address_sha1 = $1 ORDER BY updated_at DESC;', [addressSha1])).rows;
        return res.status(200).json(rows);
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};

export const getInvoices = async (req, res, next) => {

    const db = await pool.connect();
    try {
        const rows = (await db.query('SELECT * FROM invoices ORDER BY id;')).rows;
        return res.status(200).json(rows);
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};

export const getNotesById = async (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    const db = await pool.connect();
    try {
        const rows = (await db.query('SELECT * FROM notes WHERE customer_id = $1 ORDER BY serial_number;', [id])).rows;
        return res.status(200).json(rows);
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};
