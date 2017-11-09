import models from '../models';

const { Workouts } = models;

export const create = (req, res) => {
  const { type, count, repNo } = req.body;
  Workouts.create({
    type,
    count,
    repNo,
    userId: req.user.id,
  })
    .then((workout) => {
      res.status(200).send({
        workout,
        message: 'WorkoutType created successfully ',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Server error',
        err,
      });
    });
};

export default create;
