import { Router } from 'express';
import { create, getAllTypes } from '../controllers/workoutTypeController';

const typeRouter = Router();

typeRouter.post('/', create);
typeRouter.get('/', getAllTypes);

export default typeRouter;
