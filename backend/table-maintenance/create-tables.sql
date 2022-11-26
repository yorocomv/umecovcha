CREATE TABLE
    australia (
        code VARCHAR(30) PRIMARY KEY,
        zip_code VARCHAR(7),
        name1 VARCHAR(30),
        name2 VARCHAR(30),
        address1 VARCHAR(30),
        address2 VARCHAR(30),
        tel VARCHAR(13),
        col8 VARCHAR(20),
        col9 VARCHAR(100),
        col10 VARCHAR(5),
        col11 CHAR(1),
        col12 VARCHAR(11)--,
        -- col13 VARCHAR(11),
        -- col14 VARCHAR(2),
        -- col15 VARCHAR(2),
        -- col16 VARCHAR(2),
        -- col17 VARCHAR(2),
        -- col18 VARCHAR(2)
    );

CREATE TABLE
    libya (
        code VARCHAR(20),
        tel VARCHAR(15),
        branch_number VARCHAR(2),
        zip_code VARCHAR(8),
        address1 VARCHAR(64),
        address2 VARCHAR(32),
        unknown_name1 VARCHAR(50),
        unknown_name2 VARCHAR(50),
        name1 VARCHAR(32),
        col10 VARCHAR(60),
        col11 VARCHAR(60),
        col12 VARCHAR(60),
        col13 VARCHAR(60),
        col14 VARCHAR(60),
        col15 VARCHAR(60),
        col16 VARCHAR(60),
        col17 VARCHAR(60),
        col18 VARCHAR(60),
        col19 VARCHAR(60),
        col20 VARCHAR(60),
        col21 VARCHAR(60),
        col22 VARCHAR(60),
        col23 VARCHAR(60),
        col24 VARCHAR(60),
        col25 VARCHAR(60),
        col26 VARCHAR(60),
        col27 VARCHAR(60),
        col28 VARCHAR(60),
        col29 VARCHAR(60),
        col30 VARCHAR(60),
        col31 VARCHAR(60),
        col32 VARCHAR(60),
        col33 VARCHAR(60),
        PRIMARY KEY(tel, branch_number)
    );

CREATE TABLE
    tanzania (
        code VARCHAR(14) PRIMARY KEY,
        name1 VARCHAR(40),
        name2 VARCHAR(40),
        zip_code VARCHAR(8),
        address1 VARCHAR(36),
        address2 VARCHAR(36),
        address3 VARCHAR(36),
        tel1 VARCHAR(6),
        tel2 VARCHAR(4),
        tel3 VARCHAR(4)
    );

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
