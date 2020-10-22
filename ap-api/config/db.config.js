module.exports = {
    HOST: "localhost",
    PORT: 5432,
    USER: "postgres",
    PASSWORD: "test",
    DB: "anchor_point",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };