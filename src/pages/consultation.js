import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getConsultations } from "../_actions/consultation";

import '../styles/consultation.css';

import Login from '../components/login';
import ConsultationItem from '../components/consultation_item';

const Consultation = () => {
    const consultation = useSelector(state => state.consultation.data);
    const loading = useSelector(state => state.consultation.loading);
    const error = useSelector(state => state.consultation.error);
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch(getConsultations());
    }, [dispatch]);
    
    useEffect(() => {
        initFetch();
    }, [initFetch]);


    const data = consultation.map((item, index) => (
        <ConsultationItem item={item} key={index}/>
    ))

    return (
        <div>
            <Login/>
            <div>
                <h3 className="consult-title">Consultation</h3>
                <br/><br/><br/>
                { (!loading && !error)  && data }
            </div>
        </div>
    )
}

export default Consultation;