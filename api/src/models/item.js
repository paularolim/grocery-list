'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.List, { foreignKey: 'listId', onDelete: 'CASCADE' });
    }
  }
  Item.init(
    {
      title: DataTypes.STRING,
      quantity: DataTypes.DECIMAL,
      unit: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      listId: DataTypes.UUID,
      bought: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Item',
      tableName: 'items',
      timestamps: false,
    }
  );
  return Item;
};
