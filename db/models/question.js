'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question_title: DataTypes.STRING,
    question_body: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Question.associate = function(models) {
    const columnMapping = {
      through: "Question_like",
      otherKey: "user_id",
      foreignKey: "question_id"
    }

    Question.hasMany(models.Answer, {foreignKey: "question_id"});
    Question.belongsToMany(models.User, columnMapping);
    Question.hasMany(models.Question_like, {foreignKey: "question_id"});
  };
  return Question;
};