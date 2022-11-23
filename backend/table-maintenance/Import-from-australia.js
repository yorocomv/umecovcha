import pool from "../pool";
import { getAddress } from './lib/get-address';
import { jaKousei } from './lib/ja-kousei';
import { config, normalize } from '@geolonia/normalize-japanese-addresses';
import path from 'path';
let njaApiPath = path.join(__dirname, '../../frontend/public/jp/api/ja');
njaApiPath = 'file:///' + njaApiPath.slice(3).split('\\').join('/');
config.japaneseAddressesApi = njaApiPath;
import SHA1 from 'crypto-js/sha1';

; (async () => {
    const db = await pool.connect();

    let lastRow = 0;
    try {
        lastRow = (await db.query('SELECT COUNT(*) AS ct FROM australia;')).rows[0]['ct'];
        console.log(lastRow);
    } catch (err) {
        throw (err);
    }

    try {
        for (let i = 0; i < lastRow; i++) {
            let { zip_code, name1, name2, address1, address2, tel } = (await db.query('SELECT * FROM australia ORDER BY code ASC LIMIT $1 OFFSET $2', [1, i])).rows[0];
            /* 引用符やプライム記号はシングルクォーテーションに強制変換してからエスケープ
               pg-protocol のエラー対策 */
            name1 = name1.replace( /['′‵ʹ’]/g, "''" );
            let address = address1 + address2;
            address = getAddress(address);
            const { pref, city, town, addr, lat, lng, level } = await normalize(address);
            /* 2: 市区町村まで判別できた */
            if (level > 1) {
                const nayose__Addr = pref + city + town + addr;
                const address_sha1 = SHA1(nayose__Addr).toString();
                let sha1_same_val = 0;
                const max = (await db.query(`SELECT MAX(sha1_same_val) AS max FROM customers WHERE address_sha1 = '${address_sha1}';`)).rows[0]['max'];
                if (max !== null && max >= 0) sha1_same_val = max + 1;
                let searched_name = name1 + name2;
                searched_name = jaKousei(searched_name);
                await db.query(`INSERT INTO customers
                    (tel,      zip_code,      address1,      address2,      name1,      name2,      searched_name,      address_sha1,      sha1_same_val,  nja_pref,  nja_city,  nja_town,  nja_addr,  nja_lat,  nja_lng,  nja_level)
                    VALUES
                    ('${tel}', '${zip_code}', '${address1}', '${address2}', '${name1}', '${name2}', '${searched_name}', '${address_sha1}', ${sha1_same_val}, '${pref}', '${city}', '${town}', '${addr}', '${lat}', '${lng}', ${level});`);
                console.log(i);
            }
        }
    } catch (err) {
        throw (err);
    } finally {
        db.release();
    }
})().catch(e => console.error(e.stack));

pool.end();
