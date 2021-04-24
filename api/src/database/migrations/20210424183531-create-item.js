'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      title: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.DECIMAL,
      },
      unit: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.DECIMAL,
      },
      bought: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      listId: {
        foreignKey: true,
        type: Sequelize.UUID,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('items');
  },
};
