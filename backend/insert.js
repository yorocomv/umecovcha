import pool from './pool';

export const createCustomer = async (req, res, next) => {
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
        const newRow = (await db.query(`INSERT INTO customers
            (tel, zip_code, address1, address2, address3, name1, name2, alias,
            searched_name, address_sha1, sha1_same_val,
            nja_pref, nja_city, nja_town, nja_addr, nja_lat, nja_lng, nja_level, invoice_id)
            VALUES
            ('${tel}', '${zipCode}', '${address1}', '${address2}', '${address3}', '${name1}', '${name2}', '${alias}',
            '${searchedName}', '${addressSHA1}', ${sha1SameVal},
            '${pref}', '${city}', '${town}', '${addr}', '${lat}', '${lng}', ${level}, ${invoiceId})
            RETURNING *;
        `)).rows[0];
        return res.status(201).send(`${JSON.stringify(newRow)}`);
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};

export const takeNote = async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const { serialNum, note } = req.body;

    const db = await pool.connect();
    try {
        let valueList = [];
        {
            const customer_id = id;
            const serial_number = serialNum;
            const body = note;
            /* INSERT 文の列名部分をコピペ */
            valueList = [customer_id, serial_number, body];
        }
        const newRow = (await db.query(`INSERT INTO notes (
                customer_id, serial_number, body
            )
            VALUES ($1 , $2, $3)
            RETURNING *;`,
            valueList)).rows[0];
            return res.status(201).send(`${JSON.stringify(newRow)}`);
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};