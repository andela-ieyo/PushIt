import moment from 'moment';
import models from '../models';

const { WeeklyAverage } = models;

export const getRecentAverage = (req, res) => {
  const query = {
    where: {
      userId: req.user.id,
    },
    order: [['createdAt', 'DESC']],
  };

  WeeklyAverage.findAll(query)
    .then((averages) => {
      res.status(200).send({ average: averages[0] });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Server error',
        err,
      });
    });
};

export const getAverages = (req, res) => {
  const { from: startDate, to: endDate } = req.query;
  const query = {
    where: { userId: req.user.id },
    order: [['createdAt', 'DESC']],
  };

  let start;
  if (startDate) {
    start = moment(startDate).format('YYYY-MM-DD HH:mm:ss');
    query.where.createdAt = start;
  }
  if (startDate && endDate) {
    const end = moment(endDate).format('YYYY-MM-DD HH:mm:ss');
    query.where.createdAt = { $between: [start, end] };
  }
  WeeklyAverage.findAll(query)
    .then((averages) => {
      res.status(200).send({
        averages,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Server error',
        err,
      });
    });
};
