const jaconv = require('jaconv');

const jaKousei = (orgName) => {
    let name = orgName;

    /* https://blog.foresta.me/posts/replace-hyphen-for-js */
    name = name.replace( /[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━]/g, "");

    /* 全角ひらがなを全角カタカナに */
    name = jaconv.toKatakana(name);
    /* 全角英数記号を半角に、半角カタカナを全角に */
    name = jaconv.normalize(name);
    name = name.trim();
    name = name.toUpperCase();
    name = name.replace( /\s/gi, "" );
    /* グロッサリ => グロサリ */
    name = name.replace( /ッ/g, "");
    /* 空() と ()の中に一文字 のものを削除 */
    name = name.replace( /\([^()]?\)/g, "");
    /* ()を外し 中点・機種依存文字を消す */
    name = name.replace( /[()・㈱㈲㈹]/g, "");
    /* 捨て仮名を全角カタカナに */
    name = name.replace( /ヶ/g, "ケ");
    /* 漢字を全角カタカナで代用 */
    name = name.replace(/[之乃]/g, "ノ");
    name = name.replace( /支店/g, "店");
    name = name.replace( /センタ/g, "C");
    name = name.replace( /物流ステション/g, "DS");
    name = name.replace( /流通C|物流C|配送C|共同配送C|共配C|商品C|食品C/g, "C");
    name = name.replace( /常温C|冷温C|冷蔵冷凍C|冷凍冷蔵C|冷蔵C|冷凍C|ドライC/g, "C");
    name = name.replace( /RDC|FDC|SDC|DC|SC/g, "C");
    name = name.replace( /オ茶ノ|茶ノ|C&C/g, "");

    return name;
};

module.exports =jaKousei;
