const pool = require('./pool');

export const createCustomer = async (req, res, next) => {
    const {
        tel, zip_code,
        address1, address2, address3,
        name1, name2, alias, searched_name,
        address_sha1, sha1_same_val,
        nja_pref, nja_city, nja_town, nja_addr, nja_lat, nja_lng, nja_level,
        invoice_id
    } = req.body;

    const db = await pool.connect();
    try {
        return res.status(201).send(`${JSON.stringify(req.body)}`);
    } catch (err) {
        next(err.stack);
    } finally {
        db.release();
    }
    pool.end();
};

export const createUser = (req, res, next) => {
    const { name, email } = req.body;
    db.one('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id', [name, email])
      .then(data => {
        return res.status(201).send(`User added with ID: ${data.id}`);
      })
      .catch(err => next(err));
  };