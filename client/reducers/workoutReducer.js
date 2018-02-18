import {
  SAVE_WORKOUT_TYPES, SAVE_RECENT_WORKOUT
} from '../actionConstants/workoutConstants';
import defaultState from '../defaultState';

const workoutReducer = (state = defaultState.workout, action) => {
  switch (action.type) {
    case SAVE_WORKOUT_TYPES: {
      const { workoutTypes } = action;
      return { ...state, types: workoutTypes };
    }

    case SAVE_RECENT_WORKOUT: {
      const { recentWorkout } = action;
      return { ...state, recentWorkout };
    }

    default:
      return state;
  }
};

export default workoutReducer;
