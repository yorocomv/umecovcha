const pool = require('./pool');

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