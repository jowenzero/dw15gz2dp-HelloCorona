import { GET_REPLY } from "../constants/action-types";
import { API, setAuthToken } from "../config/api";

export const getReply = (id) => {
    return {
        type: GET_REPLY,
        async payload() {
            try {
                const token = localStorage.getItem('userToken');
                setAuthToken(token);
                const replies = await API.get(`/user/reply/${id}`);
                return replies.data;
            } catch (error) {
                console.log(error);
            }
        },
    };
};