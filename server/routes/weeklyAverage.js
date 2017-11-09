import { Router } from 'express';
import { getAverages, getRecentAverage } from '../controllers/weeklyAverageController';
import validateUserId from '../middlewares/validateUserId';


const averageRouter = Router();

averageRouter.get('/:userId', validateUserId, getRecentAverage);
averageRouter.get('/:userId?', validateUserId, getAverages);

export default averageRouter;
