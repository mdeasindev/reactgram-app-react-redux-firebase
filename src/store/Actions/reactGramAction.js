import { REACTGRAM } from '../../constants';

export const changeForm = payload => {
  return {
    type: REACTGRAM.CHANGEFORM,
    payload,
  };
};

export const shareSuccess = payload => {
  return {
    type: REACTGRAM.SUCCESS,
    payload,
  };
};

export const shareError = payload => {
  return {
    type: REACTGRAM.ERROR,
    payload,
  };
};
