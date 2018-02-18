import axios from 'axios';
import { SAVE_USER } from '../actionConstants/userConstant';

export const saveUser = user =>
  ({ type: SAVE_USER, user });

export const getCurrentUser = () => (dispatch, getState) =>
  axios.get('/users/loggedin')
    .then((res) => {
      const { data: { user }, status } = res;
      const success = status === 200;
      if (success) {
        dispatch(saveUser(user));
      }
      return res;
    });

