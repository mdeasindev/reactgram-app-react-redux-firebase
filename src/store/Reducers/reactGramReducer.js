import { REACTGRAM } from '../../constants';

const initState = {
  form: false,
  formData: {
    image: '',
    filesize: '',
    error: '',
    caption: '',
    file: '',
  },
  is_sharing: false,
  share_failed: null,
  share_success: null,
};

const reactGramReducer = (state = initState, action) => {
  switch (action.type) {
    case REACTGRAM.ENABLEFORM:
      return {
        ...state,
        form: true,
      };
    case REACTGRAM.DISABLEFORM:
      return {
        ...state,
        form: false,
      };
    case REACTGRAM.CHANGEFORM:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    case REACTGRAM.EMPTYFIELDS:
      return {
        ...state,
        formData: {
          ...state.formData,
          error: 'Please fill up all fields.',
        },
      };
    case REACTGRAM.SHARE:
      return {
        ...state,
        is_sharing: true,
      };
    case REACTGRAM.SUCCESS:
      return {
        ...initState,
      };
    case REACTGRAM.FAILED:
      return {
        ...state,
        share_failed: true,
      };
    default:
      return state;
  }
};

export default reactGramReducer;
