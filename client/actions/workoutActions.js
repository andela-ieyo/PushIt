import axios from 'axios';
import {
  SAVE_RECENT_WORKOUT_AVERAGE,
  SAVE_RECENT_WORKOUT, SAVE_WORKOUT_TYPES,
} from '../actionConstants/workoutConstants';

export const loadRecentWorkoutAverage = average =>
  ({ type: SAVE_RECENT_WORKOUT_AVERAGE, average });

export const loadRecentWorkout = recentWorkout =>
  ({ type: SAVE_RECENT_WORKOUT, recentWorkout });

export const loadWorkoutTypes = workoutTypes =>
  ({ type: SAVE_WORKOUT_TYPES, workoutTypes });

export const getRecentWorkout = userId => (dispatch, getState) =>
  axios.get(`/workouts/${userId}`)
    .then((res) => {
      const { data: { recentWorkout }, status } = res;
      const success = status === 200;
      if (success) {
        dispatch(loadRecentWorkout(recentWorkout));
      }
      return res;
    });

export const createWorkout = (newWorkout, userId) => (dispatch, getState) =>
  axios.post('/workouts', newWorkout)
    .then((res) => {
      const { status } = res;
      const success = status === 200;
      if (success) {
        dispatch(getRecentWorkout(userId));
      }
      return res;
    });


export const getRecentWorkoutAverage = userId => (dispatch, getState) =>
  axios.get(`/weeklyAverages/${userId}`)
    .then((res) => {
      const { data: { average }, status } = res;
      const success = status === 200;
      if (success) {
        dispatch(loadRecentWorkoutAverage(average));
      }
      return res;
    });

export const getAllWorkoutTypes = () => (dispatch, getState) =>
  axios.get('/workoutTypes/')
    .then((res) => {
      const { data: { workoutTypes }, status } = res;
      const success = status === 200;
      if (success) {
        dispatch(loadWorkoutTypes(workoutTypes));
      }
      return res;
    });

