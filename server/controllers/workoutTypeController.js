import model from '../models/index';

const { WorkoutType } = model;

export const create = (req, res) => {
  WorkoutType.create({
    name: req.body.type,
  })
    .then((workoutType) => {
      res.status(200).send({
        workoutType,
        message: 'WorkoutType created successfully'
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Server error',
        err,
      });
    });
};

export const getAllTypes = (req, res) => {
  WorkoutType.findAll(
    {
      attributes: ['id', 'name']
    }
  )
    .then((workoutTypes) => {
      res.status(200).send({
        workoutTypes,
        message: 'WorkoutType created successfully'
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Server error',
        err,
      });
    });
};
