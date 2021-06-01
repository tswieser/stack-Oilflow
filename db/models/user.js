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
      otherKey: "answer_id"
    }
    const columnMapping_question = {
      through: "Question_likes",
      foreignKey: "user_id",
      otherKey: "question_id"
    }
    User.belongsToMany(models.Answer, columnMapping_answer);
    User.belongsToMany(models.Question, columnMapping_question);
  };
  return User;
};