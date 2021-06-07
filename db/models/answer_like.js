'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer_like = sequelize.define('Answer_like', {
    answer_id: DataTypes.STRING,
    answer_votes: DataTypes.BOOLEAN
  }, {});
  Answer_like.associate = function(models) {
    // associations can be defined here
    Answer_like.belongsTo(models.Answer, {foreignKey: "answer_id"})
  };
  return Answer_like;
};