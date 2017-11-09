import _ from 'lodash';
import Cron from 'cron';
import bunyan from 'bunyan';
import moment from 'moment';
import models from '../models';

const { CronJob } = Cron;
const { WeeklyAverage, Workouts } = models;
const log = bunyan.createLogger({ name: 'pushIt' });

const job = new CronJob({
  cronTime: '00 37 15 * * 0',
  onTick: () => {
    const today = new Date();
    const monInMilliSec = new Date().setDate(today.getDate() - 20);
    const monDate = new Date(monInMilliSec);
    const fromDate = moment(monDate).format('YYYY-MM-DD HH:mm:ss');
    const to = moment(today).format('YYYY-MM-DD HH:mm:ss');
    Workouts.findAll({
      where: {
        createdAt: {
          $between: [fromDate, to],
        },
      },
      attributes: ['userId', [models.sequelize.fn('AVG', models.sequelize.col('count')), 'Average'], 'type'],
      group: ['userId', 'type'],
      order: [[models.sequelize.fn('AVG', models.sequelize.col('count')), 'DESC']],
    })
      .then((results) => {
        const workouts = results.map(result => result.toJSON());
        const weekData = [];

        workouts.forEach((workout) => {
          const oldEntry = weekData.find(item =>
            parseInt(item.userId, 10) === parseInt(workout.userId, 10));
          if (oldEntry) {
            oldEntry.average[workout.type] = _.round(parseFloat(workout.Average));
          } else {
            weekData.push({
              userId: workout.userId,
              average: { [workout.type]: _.round(parseFloat(workout.Average)) },
            });
          }
        });
        if (weekData.length) {
          return WeeklyAverage.bulkCreate(weekData)
            .then(() => WeeklyAverage.findAll())
            .then((averages) => {
              averages.forEach((average, index) => log.info(average.toJSON(), index));
            });
        }
        return log.info('Weekly average stored successfully');
      })
      .catch((err) => {
        log.info(err, 'error');
        throw new Error(err);
      });
  },
  start: false, /* Start the job right now */
  timeZone: 'Africa/Lagos', /* Time zone of this job. */
});

export default job;
