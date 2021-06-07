'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question_like = sequelize.define('Question_like', {
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    question_votes: DataTypes.BOOLEAN
  }, {});
  Question_like.associate = function(models) {

    Question_like.belongsTo(models.Question, {foreignKey: "question_id"});
  };
  return Question_like;
};