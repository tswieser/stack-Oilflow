'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [{
      user_name: 'demo',
      email: 'demo@aa.io',
      first_name: 'demo',
      last_name: 'demo',
      hashed_password: 'demo'
    }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('User', null, {});

  }
};
