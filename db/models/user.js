'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    hashed_password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    const columnMapping_answer = {
      through: "Answer_likes",
      foreignKey: "user_id",
      otherKey: "user_id"
    }
    const columnMapping_question = {
      through: "Question_likes",
      foreignKey: "user_id",
      otherKey: "user_id"
    }
    User.hasMany(models.Answer_like, columnMapping_answer);
    User.hasMany(models.Question_like, columnMapping_question);
  };
  return User;
};