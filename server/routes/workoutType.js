import { Router } from 'express';
import { create } from '../controllers/workoutTypeController';

const typeRouter = Router();

typeRouter.post('/', create);

export default typeRouter;
