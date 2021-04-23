'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    static associate(models) {
      List.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  List.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.UUID,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'List',
      tableName: 'lists',
    }
  );
  return List;
};
