const jaconv = require('jaconv');

const jaKousei = (orgName) => {
    let name = orgName;

    /* https://blog.foresta.me/posts/replace-hyphen-for-js */
    name = name.replace( /[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━]/g, "");

    name = jaconv.toKatakana(name);
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
    name = name.replace( /支店/g, "店");
    name = name.replace( /センタ/g, "C");
    name = name.replace( /流通C|物流C|配送C|商品C|食品C/g, "C");
    name = name.replace( /常温C|冷温C|冷蔵冷凍C|冷凍冷蔵C|冷蔵C|冷凍C/g, "C");
    name = name.replace( /RDC|FDC|SDC|DC/g, "C");

    return name;
};

module.exports =jaKousei;
