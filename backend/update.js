import pool from './pool';

export const updateCustomerById = async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const {
        tel, zipCode,
        address1, address2, address3,
        name1, name2, alias, searchedName,
        addressSHA1, sha1SameVal,
        pref, city, town, addr, lat, lng, level,
        invoiceId
    } = req.body;

    const db = await pool.connect();
    try {
        const newRow = (await db.query(`
            UPDATE customers SET
                tel = '${tel}',
                zip_code = '${zipCode}',
                address1 = '${address1}',
                address2 = '${address2}',
                address3 = '${address3}',
                name1 = '${name1}',
                name2 = '${name2}',
                alias = '${alias}',
                searched_name = '${searchedName}',
                address_sha1 = '${addressSHA1}',
                sha1_same_val = ${sha1SameVal},
                nja_pref = '${pref}',
                nja_city = '${city}',
                nja_town = '${town}',
                nja_addr = '${addr}',
                nja_lat = '${lat}',
                nja_lng = '${lng}',
                nja_level = ${level},
                invoice_id = ${invoiceId}
            WHERE
                id = ${id}
            RETURNING
                *;

        `)).rows[0];
        return res.status(200).send(`${JSON.stringify(newRow)}`);
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};

export const changeRanksOfNotes = async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const { oldNum, newNum } = req.body;

    const db = await pool.connect();
    try {
        const newRow = (await db.query(`
            UPDATE notes SET
            rank = ${newNum}
            WHERE
            customer_id = ${id} AND rank = ${oldNum}
            RETURNING
                *;

        `)).rows[0];
        return res.status(200).send(`${JSON.stringify(newRow)}`);
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};

export const updateNoteBy2Id = async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const { rank, note } = req.body;

    const db = await pool.connect();
    try {
        const newRow = (await db.query(`
            UPDATE notes SET
            body = '${note}'
            WHERE
            customer_id = ${id} AND rank = ${rank}
            RETURNING
                *;

        `)).rows[0];
        return res.status(200).send(`${JSON.stringify(newRow)}`);
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};

export const changeNotesOfCustomers = async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const count = parseInt(req.params.count, 10);

    const db = await pool.connect();
    try {
        const newRow = (await db.query(`
            UPDATE customers SET
            notes = ${count}
            WHERE
            id = ${id}
            RETURNING
                id, name1, notes;

        `)).rows[0];
        return res.status(200).send(`${JSON.stringify(newRow)}`);
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};
