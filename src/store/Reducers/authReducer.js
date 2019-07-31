import { LOGIN, REGISTER, LOGOUT } from '../../constants';
import { testUser } from '../../config/testUser';

const loginInit = {
  email: testUser.email ? testUser.email : '',
  password: testUser.password ? testUser.password : '',
  error: '',
  success: '',
  submitting: false,
};
const loginReducer = (state = loginInit, action) => {
  switch (action.type) {
    case LOGIN.SUBMIT:
      return {
        ...state,
        error: '',
        submitting: true,
      };
    case LOGIN.CHANGE:
      return {
        ...state,
        ...action.payload,
      };
    case LOGIN.SUCCESS:
      return {
        ...loginInit,
        success: 'You have successfully logged in.',
      };
    case LOGIN.FAILED:
      return {
        ...state,
        submitting: false,
        success: '',
        error: action.error,
      };
    case LOGIN.OUT:
      return {
        ...loginInit,
      };
    default:
      return state;
  }
};

const registerInit = {
  email: '',
  password: '',
  name: '',
  error: '',
  success: '',
  submitting: false,
};
const registerReducer = (state = registerInit, action) => {
  switch (action.type) {
    case REGISTER.SUBMIT:
      return {
        ...state,
        error: '',
        submitting: true,
      };
    case REGISTER.CHANGE:
      return {
        ...state,
        ...action.payload,
      };
    case REGISTER.SUCCESS:
      return {
        ...registerInit,
        success: 'The account has been created successfully.',
      };
    case REGISTER.FAILED:
      return {
        ...state,
        error: action.error,
        submitting: false,
        success: '',
      };
    default:
      return state;
  }
};

const logOutInit = {
  loggingOut: false,
  success: false,
};
const logoutReducer = (state = logOutInit, action) => {
  switch (action.type) {
    case LOGOUT.DONE:
      return {
        ...logOutInit,
        loggingOut: true,
      };
    case LOGOUT.SUCCESS:
      return {
        ...state,
        loggingOut: false,
        success: true,
      };
    default:
      return state;
  }
};

export default {
  login: loginReducer,
  register: registerReducer,
  logout: logoutReducer,
};
