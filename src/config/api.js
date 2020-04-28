import axios from "axios";

// set config defaults while creating instance
export const API = axios.create({
    baseURL: "http://dw15gz2dp-hallo-corona.herokuapp.com/api/v1",
});

// alter config after instance is set
export const setAuthToken = (token) => {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

