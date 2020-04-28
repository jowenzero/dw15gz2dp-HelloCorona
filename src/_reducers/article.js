import { GET_ARTICLES, GET_DETAIL_ARTICLE } from "../constants/action-types";

const initialState = {
  data: [],
  singleData: [],
  loading: true,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ARTICLES}_PENDING`:
    case `${GET_DETAIL_ARTICLE}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_ARTICLES}_FULFILLED`:
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
    case `${GET_DETAIL_ARTICLE}_FULFILLED`:
      if (action.payload) {
        return {
          ...state,
          singleData: action.payload.data,
          loading: false,
        };
      }
      else {
        return {
          ...state,
          loading: false,
        };
      }
    case `${GET_ARTICLES}_REJECTED`:
    case `${GET_DETAIL_ARTICLE}_REJECTED`:
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