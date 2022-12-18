import fs from 'node:fs/promises';

export const writeOutCustomerDetails = async (req, res, next) => {
    const {
        tel, zip_code,
        address1, address2, address3,
        name1, name2,
        nja_pref, nja_city
    } = req.body;
    /* UTF-8 BOM */
    const textData = '\ufeff' +
        '\t' + tel + '\r\n' +
        '\t' + zip_code + '\r\n' +
        nja_pref + nja_city + '\t' + address1 + address2 + address3 + '\r\n' +
        name1 + '\t' + name1 + name2;

    try {
        let tsvOPutPath = './__SYMBOLICLINK__/Selected_Customer_Data.tsv';
        if (process.env['TSV_OPUT_DIR']) {
            tsvOPutPath = process.env['TSV_OPUT_DIR'] + '\\Selected_Customer_Data.tsv';
        } else if (process.env['USERPROFILE'] && /^C:\\Users/.test(process.env['USERPROFILE'])) {
            tsvOPutPath = process.env['USERPROFILE'] + '\\Desktop\\Selected_Customer_Data.tsv';
        }
        await fs.writeFile(tsvOPutPath, textData);
        console.log('  -- TSV 作成    : io.js');
        return res.status(201).send('  -- TSV 作成    : io.js');
    } catch (err) {
        next(err.stack);
    }
};