module.exports = (sequelize, DataTypes) => {
  const WeeklyAverage = sequelize.define('WeeklyAverage', {
    average: {
      type: DataTypes.JSON,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
    },
  });
  WeeklyAverage.associate = (models) => {
    // associations can be defined here
    WeeklyAverage.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };
  return WeeklyAverage;
};
