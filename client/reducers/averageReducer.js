import { SAVE_RECENT_WORKOUT_AVERAGE } from '../actionConstants/workoutConstants';
import defaultState from '../defaultState';

const averageReducer = (state = defaultState.recentWorkoutAverage, action) => {
  switch (action.type) {
    case SAVE_RECENT_WORKOUT_AVERAGE: {
      const { average } = action;
      return { ...state, recentWorkoutAverage: average };
    }

    default:
      return state;
  }
};

export default averageReducer;
