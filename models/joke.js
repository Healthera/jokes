'use strict';

module.exports = (sequelize, DataTypes) => {
  const Joke = sequelize.define(
    'joke',
    {
      joke: DataTypes.TEXT
    },
    {
      timestamps: false
    }
  );

  return Joke;
};
