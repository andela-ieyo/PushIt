'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkoutType = sequelize.define('WorkoutType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notEmpty:{
          msg: 'name field cannot be empty'
        }
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        WorkoutType.hasOne(models.Workouts, {
          foreignKey: 'type',
          sourceKey: 'name'
        })
      }
    }
  });
  return WorkoutType;
};
