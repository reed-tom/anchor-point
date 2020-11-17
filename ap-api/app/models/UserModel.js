
const DataTypes = require("sequelize");

const UserSchema = {
    id: {field: 'id', type: DataTypes.INTEGER, primaryKey: true, autoIncrement : true },
    email: {field: 'email', type: DataTypes.STRING},
    last_seen: {field: 'last_seen', type: DataTypes.DATE},
    active: {field: 'active', type: DataTypes.BOOLEAN},
    super_user: {field: 'super_user', type: DataTypes.BOOLEAN},
    email_notice: {field: 'email_notice', type: DataTypes.BOOLEAN},
    name: {field: 'username',type: DataTypes.STRING},
    token: {field: 'token',type: DataTypes.STRING},
    refresh_token: {field: 'refresh_token',type: DataTypes.STRING},
    groups: {field: 'groups',type: DataTypes.STRING},
    archived: {field: 'archived', type: DataTypes.BOOLEAN}
  };
const UserSchemaOption = {
    schema: 'app',
    tableName: 'users'
  }

const UserModel = (db) => db.define("user", UserSchema, UserSchemaOption);

module.exports = UserModel;