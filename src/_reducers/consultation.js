import { GET_CONSULTATIONS, GET_REPLY } from "../constants/action-types";

const initialState = {
  data: [],
  replyData: [],
  loading: true,
  replyLoading: true,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_CONSULTATIONS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_REPLY}_PENDING`:
      return {
        ...state,
        replyLoading: true,
      };
    case `${GET_CONSULTATIONS}_FULFILLED`:
      if (action.payload) {
        return {
          ...state,
          data: action.payload.data,
          loading: false,
        };
      }
      else {
        return {
          ...state,
          loading: false,
        };
      }
    case `${GET_REPLY}_FULFILLED`:
      if (action.payload) {
        return {
          ...state,
          replyData: action.payload.data,
          replyLoading: false,
        };
      }
      else {
        return {
          ...state,
          replyLoading: false,
        };
      }
    case `${GET_CONSULTATIONS}_REJECTED`:
    case `${GET_REPLY}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;