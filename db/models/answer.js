'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answer_body: DataTypes.STRING,
    user_id: DataTypes.STRING,
    question_id: DataTypes.STRING
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.Question, { foreignKey: "question_id" });
    Answer.belongsTo(models.User, {foreignKey: "user_id"});
  };
  return Answer;
};