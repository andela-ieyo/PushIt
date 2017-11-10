'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkoutType = sequelize.define('WorkoutType', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'name field cannot be empty',
        },
      },
    },
  });
  WorkoutType.associate = (models) => {
    // associations can be defined here
    WorkoutType.hasOne(models.Workouts, {
      foreignKey: 'type',
      source: 'name',
    });
  };
  return WorkoutType;
};
