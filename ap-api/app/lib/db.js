const Sequelize = require("sequelize");
const TodoModel = require("../models/TodoModel.js");
const UserModel = require("../models/UserModel.js");


const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT
    }
  );
  
  const db = {};
    
  db.sequelize = sequelize;
  db.Todo = TodoModel(db.sequelize);
  db.User = UserModel(db.sequelize);

  db.initializeDatabase = async (callback) => {
    try {
        await db.sequelize.sync()
        console.log('Database sync successfully.');
        callback();
    } catch (error) {
        console.error('Unable to sync database:', error);
    };
  }

  db.test_connection = async (callback) => {
    try {
        await db.sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        callback();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    };
};
module.exports = db;