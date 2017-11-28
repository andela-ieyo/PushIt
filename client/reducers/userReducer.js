import defaultState from '../defaultState';
import { SAVE_USER } from '../actionConstants/userConstant';

const userReducer = (state = defaultState.loggedInUser, action) => {
  switch (action.type) {
    case SAVE_USER: {
      const { user } = action;
      return { ...state, ...user };
    }

    default:
      return state;
  }
};

export default userReducer;

