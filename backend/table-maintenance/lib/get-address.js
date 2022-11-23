/* https://qiita.com/103ma2/items/9ed7e4a1323b8d06fa59 */

export function getAddress( orgAddress ) {
    let address = orgAddress;

    /* https://blog.foresta.me/posts/replace-hyphen-for-js */
    address = address.replace( /[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━]/g, "-" );

    address = address.replace( /〒/g, "" );
    address = address.trim();
    address = address.replace( /^[0-9０-９]{3}-?[0-9０-９]{4}/g, "" );
    address = address.replace( /\(.*?\)/g, "" );
    address = address.replace( /（.*?）/g, "" );
    address = address.replace( /[0-9０-９]+[階|F].*?/g, "" );

    const allNumber = `([0-9０-９]+|[一二三四五六七八九十百千]+)`;
    const ary = address.match( new RegExp( `${allNumber}+(${allNumber}|(番町|丁目|丁|番地|番|号|-|の))*(${allNumber}|(丁目|丁|番地|番|号))`, "g" ) );
    if ( ary !== null ) {
        let addressLike = "";
        const len = ary.length;
        for ( let i = 0; i < len; i++ ) {
            const address = ary[ i ];
            if ( address.length >= addressLike.length ) {
                addressLike = address;
            }
        }
        const index = address.lastIndexOf( addressLike );
        address = address.substring( 0, index + addressLike.length );
    }

    address = address.replace( /\s/gi, "" );
    return address;
}
