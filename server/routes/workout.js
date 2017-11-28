import { Router } from 'express';
import { create, getRecentWorkout } from '../controllers/workoutController';
import validateUserId from '../middlewares/validateUserId';


const workoutRouter = Router();

workoutRouter.post('/', create);
workoutRouter.get('/:userId', validateUserId, getRecentWorkout);

export default workoutRouter;
