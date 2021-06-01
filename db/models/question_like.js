'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question_like = sequelize.define('Question_like', {
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    question_votes: DataTypes.BOOLEAN
  }, {});
  Question_like.associate = function(models) {
    // associations can be defined here
  };
  return Question_like;
};