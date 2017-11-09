'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'The firstName field cannot be empty',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'invalid email address',
        },
      },
    },
  });
  Users.associate = (models) => {
    // associations can be defined here
    Users.hasMany(models.Workouts, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      hooks: true,
    });
    Users.hasMany(models.WeeklyAverage, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return Users;
};
