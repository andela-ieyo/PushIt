'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workouts = sequelize.define('Workouts', {
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Must be an integer',
        },
      },
    },
    repNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Must be an integer',
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
    },
    type: {
      type: DataTypes.STRING,
      references: {
        model: 'WorkoutType',
        key: 'name',
        as: 'type',
      },
    },
  });
  Workouts.associate = (models) => {
    // associations can be defined here
    Workouts.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };
  return Workouts;
};
