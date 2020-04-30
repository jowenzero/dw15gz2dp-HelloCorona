import { GET_REPLY } from "../constants/action-types";

const initialState = {
  data: [],
  loading: true,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_REPLY}_PENDING`:
      return {
        ...state,
        replyLoading: true,
      };
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