'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(200)
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(200)
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      hashed_password: {
        allowNull: false,
        type: Sequelize.STRING(200)
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
    return queryInterface.dropTable('Users');
  }
};