const fs = require('node:fs/promises');

export const writeOutDetailsCustomer = async (req, res, next) => {
    const {
        tel, zip_code,
        address1, address2, address3,
        name1, name2
    } = req.body;
    /* UTF-8 BOM */
    const textData = '\ufeff' +
        tel + '\r\n' +
        zip_code + '\r\n' +
        address1 + address2 + address3 + '\r\n' +
        name1 + name2;

    try {
        /* 保存先は後で考える・・・ */
        await fs.writeFile('./___HoGe_fUgA___.csv', textData);
        console.log('  -- CSV 作成    : io.js');
        return res.status(201).send('  -- CSV 作成    : io.js');
    } catch (err) {
        next(err.stack);
    }
};