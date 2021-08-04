'use strict';
const {Model} = require('sequelize');
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    login: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(value) {
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        this.setDataValue('password', value);
      }
    }
  }, {
    sequelize,
    modelName: 'users',
  });

  users.beforeCreate( async (users) => {
    const salt = await bcrypt.genSalt(9227);
    const hashpass = await bcrypt.hash(users.password, salt);
    users.password = hashpass;
  });

  return users;
};