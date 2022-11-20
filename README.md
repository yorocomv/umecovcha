### PostgreSQL に接続

`backend\pool.js.hinagata` をコピーして `backend\pool.js` を作成し、適宜設定してください。

### バックエンド API サーバーに接続

- `backend\Register-for-the-service\svc-env.cjs.hinagata` をコピーして `backend\Register-for-the-service\svc-env.cjs` を作成し、適宜設定してください。
- `frontend\src\routes\_axios-instance.js.hinagata` をコピーして `frontend\src\routes\_axios-instance.js` を作成し、適宜設定してください。

上の２つの設定は `svc-env.cjs` と `_axios-instance.js` の `case 'production':` で合わせてください。

### 住所正規化の API に接続

`/jp/api` に[公開されているデータ](https://github.com/geolonia/japanese-addresses/tree/develop/api)を置いて
 `frontend\src\routes\_local-uri.js.hinagata` をコピーして `frontend\src\routes\_local-uri.js` を作成し、適宜設定してください。