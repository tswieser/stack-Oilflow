'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question_title: DataTypes.STRING,
    question_body: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Question.associate = function(models) {

    Question.hasMany(models.Answer, {foreignKey: "question_id"});
    Question.belongsTo(models.User, {foreignKey: "user_id"});
  };
  return Question;
};