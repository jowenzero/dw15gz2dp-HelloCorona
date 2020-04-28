import React, { useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getConsultation } from "../_actions/consultation";

import '../styles/consult_list.css';
import '../styles/consult_list_item.css';

import ConsultListItem from '../components/consult_list_item';

const ConsultList = () => {
    const consultations = useSelector(state => state.consultation.data);
    const loading = useSelector(state => state.consultation.loading);
    const error = useSelector(state => state.consultation.error);
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch(getConsultation());
    }, [dispatch]);
    
    useEffect(() => {
        initFetch();
    }, [initFetch]);
    
    const data = consultations.map((item, index) => (
        <ConsultListItem item={item} key={index}/>
    ))

    return (
        <div>
            <div className="consult-list-bg">
                <h3 className="consult-list-title">Reservation Data</h3>
                <div className="consult-list-area">
                    <Container fluid className="consult-list-item-area">
                        <Row>
                            <Col xs={2} className="consult-list-text">No</Col>
                            <Col xs={2} className="consult-list-text">Users</Col>
                            <Col xs={2} className="consult-list-text">Subject</Col>
                            <Col xs={2} className="consult-list-text">Date of complaint</Col>
                            <Col xs={2} className="consult-list-text">Status</Col>
                            <Col xs={2} className="consult-list-text">Action</Col>
                        </Row>
                        <p className="consult-list-item-line"/>
                    </Container>
                    { (!loading && !error) 
                        && data }
                </div>
            </div>
        </div>
    )
}

export default ConsultList;