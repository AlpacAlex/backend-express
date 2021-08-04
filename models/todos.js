'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todos.init({
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    done: DataTypes.BOOLEAN,
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Todos',
  });
  return Todos;
};