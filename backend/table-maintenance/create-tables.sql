CREATE TABLE
    invoices (
        id SMALLSERIAL PRIMARY KEY,
        name VARCHAR(32) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
    );

CREATE TABLE
    customers (
        id SERIAL PRIMARY KEY,
        -- 取り込み元の中に必須ではないものがある
        tel VARCHAR(15) NOT NULL DEFAULT '',
        zip_code VARCHAR(8) NOT NULL,
        address1 VARCHAR(32) NOT NULL,
        address2 VARCHAR(32) NOT NULL DEFAULT '',
        address3 VARCHAR(32) NOT NULL DEFAULT '',
        name1 VARCHAR(30) NOT NULL,
        name2 VARCHAR(30) NOT NULL DEFAULT '',
        alias VARCHAR(30) NOT NULL DEFAULT '',
        searched_name VARCHAR(90) NOT NULL,
        address_sha1 CHAR(40) NOT NULL,
        sha1_same_val SMALLINT NOT NULL DEFAULT 0,
        nja_pref VARCHAR(4) NOT NULL,
        nja_city VARCHAR(12) NOT NULL,
        nja_town VARCHAR(16) NOT NULL DEFAULT '',
        nja_addr VARCHAR(32) NOT NULL DEFAULT '',
        nja_lat VARCHAR(16),
        nja_lng VARCHAR(16),
        -- 0: 都道府県も判別できなかった
        nja_level SMALLINT NOT NULL DEFAULT 0,
        notes SMALLINT NOT NULL DEFAULT 0,
        times INTEGER NOT NULL DEFAULT 0,
        -- 外部キー
        invoice_id SMALLINT NOT NULL DEFAULT 1,
        created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
        UNIQUE(address_sha1, sha1_same_val),
        FOREIGN KEY(invoice_id) REFERENCES invoices(id)
    );
