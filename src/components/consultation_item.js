import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getReply } from "../_actions/consultation";

import '../styles/consultation.css';


const ConsultationItem = ({item}) => {
    const replies = useSelector(state => state.consultation.replyData);
    const loading = useSelector(state => state.consultation.replyLoading);
    const error = useSelector(state => state.consultation.error);
    const dispatch = useDispatch();

    const [isUserGet, setIsUserGet] = React.useState(false);

    const userGet = () => {
        setIsUserGet(true);
    };

    function formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    if (loading && !isUserGet) {
        dispatch(getReply(item.id));
        userGet();
    }
    
    return (
        <>
            { (!loading && !error) && replies &&
                <Container fluid className="consult-area">
                    <Row>
                        <Col xs={2}>
                            <img src={ process.env.PUBLIC_URL + `../images/ProfPicPatient.png` } className="consult-prof-pic" alt=""></img>
                        </Col>
                        <Col xs={8}>
                            <br/>
                            <h3 className="consult-bold-text text-pos-1">{item.subject}</h3>
                            <p className="consult-light-text text-pos-2">{formatDate(item.createdAt)}</p>
                            <p className="consult-light-text text-pos-3">Keluhan: {item.description}</p>
                        </Col>
                        <Col xs={2}>
                            <br/>
                            <h3 className="consult-light-bold-text">{formatDate(item.liveConsult)}</h3>
                        </Col>
                    </Row>
                    <div className="consult-line"/>
                    { !replies &&
                        <Row>
                            <Col xs={4}/>   
                            <Col xs={8}>
                                <br/><br/>
                                <h3 className="consult-wait-text">Waiting For Reply</h3>
                            </Col>
                        </Row>
                    }
                    { replies &&
                        <Row>
                            <Col xs={1}/>   
                            <Col xs={1}>
                                <img src={ process.env.PUBLIC_URL + `../images/ProfPicDoctor.png` } className="consult-prof-pic" alt=""></img>
                            </Col>
                            <Col xs={8}>
                                <br/><br/>
                                <p className="consult-light-text text-pos-doc">{replies[0].response}</p>
                            </Col>
                        </Row>
                    }
                </Container>
            }
            <br/><br/>
        </>
    )
}

export default ConsultationItem;