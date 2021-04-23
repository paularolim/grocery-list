'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.List, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  );
  return User;
};
