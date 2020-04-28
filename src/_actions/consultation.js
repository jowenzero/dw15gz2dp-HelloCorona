import { GET_CONSULTATIONS, GET_CONSULTATION, GET_REPLY } from "../constants/action-types";
import { API, setAuthToken } from "../config/api";

export const getConsultations = () => {
    return {
        type: GET_CONSULTATIONS,
        async payload() {
            try {
                const token = localStorage.getItem('userToken');
                setAuthToken(token);
                const consultations = await API.get("/user/consultation");
                return consultations.data;
            } catch (error) {
                console.log(error);
            }
        },
    };
};

export const getConsultation = () => {
    return {
        type: GET_CONSULTATION,
        async payload() {
            try {
                const token = localStorage.getItem('userToken');
                setAuthToken(token);
                const consultations = await API.get("/consultations");
                return consultations.data;
            } catch (error) {
                console.log(error);
            }
        },
    };
};

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