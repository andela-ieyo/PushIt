import models from '../models';

const { Workouts } = models;

export const create = (req, res) => {
  const { body: { type, count, repNo } } = req;
  Workouts.create({
    type,
    count: parseInt(count, 10),
    repNo: parseInt(repNo, 10),
    userId: parseInt(req.user.id, 10),
  })
    .then((workout) => {
      res.status(200).send({
        workout,
        message: 'Workout created successfully',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Server error',
        err,
      });
    });
};

export const getRecentWorkout = (req, res) => {
  const { params: { userId } } = req;
  Workouts.findAll({
    where: {
      userId: parseInt(userId, 10)
    },
    order: [['createdAt', 'DESC']],
  })
    .then((records) => {
      if (records.length === 0) {
        return res.status(200).send({ message: 'You have no workout record' });
      }
      return res.status(200).send({ recentWorkout: records[0] });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Server error',
        err,
      });
    });
};
