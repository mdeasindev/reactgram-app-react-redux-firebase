import { LOGIN, REGISTER, LOGOUT } from '../../constants';
export const loginChange = payload => {
  return {
    type: LOGIN.CHANGE,
    payload,
  };
};
export const registerChange = payload => {
  return {
    type: REGISTER.CHANGE,
    payload,
  };
};

export const loginSuccess = payload => {
  return {
    type: LOGIN.SUCCESS,
    payload,
  };
};
export const loginFailed = error => {
  return {
    type: LOGIN.FAILED,
    error,
  };
};

export const registerSuccess = () => {
  return {
    type: REGISTER.SUCCESS,
  };
};

export const registerFailed = error => {
  return {
    type: REGISTER.FAILED,
    error,
  };
};

export const logOut = () => {
  return {
    type: LOGOUT.DONE,
  };
};
