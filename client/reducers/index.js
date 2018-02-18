import { combineReducers } from 'redux';
import user from './userReducer';
import average from './averageReducer';
import workout from './workoutReducer';

const rootReducer = combineReducers({
  user,
  average,
  workout,
});

export default rootReducer;
