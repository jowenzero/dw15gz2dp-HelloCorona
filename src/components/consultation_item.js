import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { API, setAuthToken } from "../config/api";
import Markdown from 'markdown-to-jsx';

import '../styles/consultation.css';

const ConsultationItem = ({item}) => {
    const [data, setData] = useState(null);
    const [length, setLength] = React.useState(0);

    const handleLengthChange = (value) => {
        setLength(value);
    };

    function formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('userToken');
            setAuthToken(token);
            const replies = await API.get(`/user/reply/${item.id}`);
            const { data } = replies.data;
            setData(data);
            console.log(data);
            handleLengthChange(data.length);
        } catch (error) {
            if (error.code === "ECONNABORTED" || !data) {
                console.log("Network Error!");
            } else {
                const { data, status } = error.response;
                console.log(data.message, status);
            }
            handleLengthChange(0);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <>
            { item &&
                <Container fluid className="consult-area">
                    <Row>
                        <Col xs={2}>
                            <img src={ process.env.PUBLIC_URL + `../images/ProfPicPatient.png` } className="consult-prof-pic" alt=""></img>
                        </Col>
                        <Col xs={8}>
                            <br/>
                            <h3 className="consult-bold-text text-pos-1">{item.subject}</h3>
                            <p className="consult-light-text text-pos-2">{formatDate(item.createdAt)}</p>
                            <p className="consult-light-text text-pos-3"><b>Complaint:</b> {item.description}</p>
                        </Col>
                        <Col xs={2}>
                            <br/>
                            <h3 className="consult-light-bold-text">{formatDate(item.liveConsult)}</h3>
                        </Col>
                    </Row>
                    <div className="consult-line"/>
                    { length <= 0 &&
                        <Row>
                            <Col xs={4}/>   
                            <Col xs={8}>
                                <br/><br/>
                                <h3 className="consult-wait-text">Waiting For Reply</h3>
                                <br/><br/>
                            </Col>
                        </Row>
                    }
                    { length > 0 &&
                        <Row>
                            <Col xs={1}/>   
                            <Col xs={1}>
                                <img src={ process.env.PUBLIC_URL + `../images/ProfPicDoctor.png` } className="consult-prof-pic" alt=""></img>
                            </Col>
                            <Col xs={8}>
                                <br/>
                                { item.status === "Waiting Live Consultation" &&
                                    <p className="consult-light-text text-pos-doc-1 color-green"><b>{item.status}</b></p>
                                }
                                { item.status === "Cancel" &&
                                    <p className="consult-light-text text-pos-doc-1 color-red"><b>{item.status}</b></p>
                                }
                                <p className="consult-light-text text-pos-doc-2">
                                    <Markdown options={{ forceBlock: true }}>
                                        {data[0].response}
                                    </Markdown>
                                </p>
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