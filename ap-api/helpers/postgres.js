const { Pool } = require("pg");
const config = require("../config.json");

module.exports = class Postgres {
  constructor(opt) {
    const conInfo = config.postgresConnection;
    
    this.pool = new Pool({
      user: conInfo.user,
      host: conInfo.host,
      database: conInfo.database,
      password: conInfo.password,
      port: conInfo.port
    });
  }

  // INSERT RECORD AND RETURN ID OF NEW RECORD
  insert(sql,values, callback) {
    this.pool.query(sql, values, (err, res) => {
      console.log(err ? { result: err.stack } : { result: "OK" });
    });
  }

  // INSERT RECORD AND RETURN ID OF NEW RECORD
  insertWithReturnId(sql,values, callback) {
    this.pool.query(sql,values, (err, res) => {
      const id = res.rows[0].id;
      callback(id);
    });
  }

  // RETURN FIRST RECORD
  selectFirst(sql, callback) {
    this.pool.query(sql, (err, res) => {
      if (res === undefined) {
        callback({ error: "Query returned ZERO records." });
        return;
      }

      const row = res.rows[0];
      callback(row);
    });
  }

  // RETURN FIRST RECORD USING VALUES
  selectFirstWithValues(sql,values, callback) {
    this.pool.query(sql, values, (err, res) => {
      if (res === undefined) {
        callback({ error: "Query returned ZERO records." });
        return;
      }

      const row = res.rows[0];
      callback(row);
    });
  }

  // RETURN MULTIPLE RECORDS
  selectAll(sql, callback) {
    this.pool.query(sql, (err, res) => {
      if (res === undefined) {
        callback({ error: "Query returned ZERO records." });
        return;
      }

      callback(res.rows);
    });
  }

  // RETURN MULTIPLE RECORDS
  selectAllWithValues(sql, values, callback) {
    this.pool.query(sql, values, (err, res) => {
      if (res === undefined) {
        callback({ error: "Query returned ZERO records." });
        return;
      }

      callback(res.rows);
    });
  }

  // RETURN MULTIPLE RECORDS
  async selectAllWithValuesWait(sql, values, callback) {
    const client = await this.pool.connect();
    try {
      //await client.query("BEGIN");
      try {
        const res = await client.query(sql, values);
        return res.rows;

        //callback(res.rows);
      } catch (err) {
        //await client.query('ROLLBACK')
        throw err;
      }
    } finally {
      client.release();
    }

  }
};
