import { Router } from 'express';
import { getAllUsers, getUser } from '../controllers/userController';
import model from '../models';

const { Users } = model;

const userRouter = Router();

userRouter.param('id', (req, res, next, id) => {
  Users.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User does not exist',
        });
      }
      req.user = user;
      return next();
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Server error',
        err,
      });
    });
});

userRouter.get('/', getAllUsers);
userRouter.get('/loggedin', getUser);

export default userRouter;
