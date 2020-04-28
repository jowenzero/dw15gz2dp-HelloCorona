import { GET_USER, GET_USERS } from "../constants/action-types";
import { API, setAuthToken } from "../config/api";

export const getUser = () => {
  return {
    type: GET_USER,
    async payload() {
      try {
        const token = localStorage.getItem('userToken');
        setAuthToken(token);
        const user = await API.get("/user");
        return user.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const getUsers = () => {
  return {
    type: GET_USERS,
    async payload() {
      try {
        const users = await API.get("/users");
        return users.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};