const  DataTypes = require("sequelize");

const TodoSchema = {
    id: {field: 'id', type: DataTypes.INTEGER, primaryKey: true, autoIncrement : true },
    description: {field: 'description',type: DataTypes.STRING},
    userid: {field: 'user_id', type: DataTypes.INTEGER },
};
const TodoSchemaOption = {
    schema: 'app',
    tableName: 'todo'
  }

//const TodoModel = {TodoSchema, TodoSchemaOption};
const TodoModel = (db) => db.define('todo', TodoSchema, TodoSchemaOption);

module.exports = TodoModel;