import { Router } from 'express';
import { create } from '../controllers/workoutController';


const workoutRouter = Router();

workoutRouter.post('/', create);

export default workoutRouter;
