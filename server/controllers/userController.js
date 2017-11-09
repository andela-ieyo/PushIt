import model from '../models';

const { Users } = model;

export const getAllUsers = (req, res) => {
  let dbQuery = {};
  if (req.query.name) {
    dbQuery = {
      where: {
        name: {
          $iLike: `%${req.query.name}%`,
        },
      },
    };
  }

  return Users.findAll(dbQuery)
    .then(users => res.status(200).send({ users }))
    .catch(err =>
      res.status(500).send({
        message: 'Server error',
        err,
      }),
    );
};

export const getUser = (req, res) => {
  res.status(200).send({ user: req.user });
};
