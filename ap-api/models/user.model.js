module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user",
    {
      schema: 'anchor_point',
      tableName: 'users'}, 
    {
      uid: {field: 'uid', type: Sequelize.UUID, primaryKey: true},
      email: {field: 'email',type: Sequelize.STRING, validate:{isEmail:true,msg: "Must be email address"} },
      last_seen: {field: 'last_seen',type: Sequelize.DATE},
      created_timestamp: {field: 'created_timestamp',type: Sequelize.DATE},
      createdby_user_uid: {field: 'createdby_user_uid',type: Sequelize.UUID},
      modified_timestamp: {field: 'modified_timestamp',type: Sequelize.DATE},
      modifiedby_user_uid: {field: 'modifiedby_user_uid',type: Sequelize.UUID},
      active: {field: 'active',type: Sequelize.BOOLEAN},
      super_user: {field: 'super_user',type: Sequelize.BOOLEAN},
      email_notice: {field: 'email_notice',type: Sequelize.BOOLEAN},
      current_token: {field: 'current_token',type: Sequelize.STRING},
      token_expiration: {field: 'token_expiration',type: Sequelize.DATE},
      archived: {field: 'archived',type: Sequelize.BOOLEAN}
    });
  
    return User;
  };