'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      answer_body: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      user_id: {
        allowNull: false,
        references: { model: "Users" },
        type: Sequelize.INTEGER
      },
      question_id: {
        allowNull: false,
        references: { model: "Questions" },
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Answers');
  }
};
