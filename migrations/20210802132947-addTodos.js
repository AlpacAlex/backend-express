'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  
    await queryInterface.addColumn(
      'Todos', // table name
      'userId', // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    );

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  
    await queryInterface.removeColumn('Todos', 'userId');

  }
};
