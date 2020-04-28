import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { API, setAuthToken } from "../config/api";

import '../styles/consult_list_action.css';

import CircleInline from '../icons/CircleInline.svg';
import CircleOutline from '../icons/CircleOutline.svg';

const TransactionAction = ({item}) => { 
    const [response, setResponse] = React.useState(null);

    const handleResponseChange = (event) => {
        setResponse(event.target.value);
    };

    function formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    const patchConsult = async (status) => {
        try {
            const token = localStorage.getItem('userToken');
            setAuthToken(token);
            await API.patch("/consultation/" + item.id, {
                status: status
            });
            await API.post("/consultation/" + item.id + "/reply", {
                response: response,
                consultationId: item.id
            });
            window.location.reload(true);
        } catch (error) {
            if (error.code === "ECONNABORTED") {
                console.log("Network Error!");
            } else {
                const { data, status } = error.response;
                console.log(data.message, status);
            }
        }
    };

    return (
        <>
            <Container fluid>
                <p/>
                <Row>
                    <Col xs={8}>
                        <h3 className="consult-list-action-title">{item.subject}</h3>
                        <br/>
                        <p className="consult-list-action-desc">{item.description}</p>
                    </Col>

                    <Col xs={1}>
                        <img src={CircleOutline} alt="" className="consult-list-action-circle-outline"></img>
                        <div className="consult-list-action-line"/>
                        <img src={CircleInline} alt="" className="consult-list-action-circle-inline"></img>
                    </Col>

                    <Col xs={3}>
                        <p className="consult-list-action-bold-text">Date of complaint</p>
                        <p className="consult-list-action-light-text">{formatDate(item.createdAt)}</p>
                        <br/>
                        <p className="consult-list-action-bold-text">Live consultation</p>
                        <p className="consult-list-action-light-text">{formatDate(item.liveConsult)}</p>
                    </Col>
                </Row>
                <br/>

                <Row>
                    <Col xs={1}><p className="consult-list-action-bold-text">No</p></Col>
                    <Col xs={3}><p className="consult-list-action-bold-text">Full Name</p></Col>
                    <Col xs={1}><p className="consult-list-action-bold-text">Gender</p></Col>
                    <Col xs={3}>
                        <Row>
                            <Col xs={2}/>
                            <Col xs={10}><p className="consult-list-action-bold-text">Phone</p></Col>
                        </Row>
                    </Col>
                    <Col xs={1}><p className="consult-list-action-bold-text">Age</p></Col>
                    <Col xs={1}><p className="consult-list-action-bold-text">Height</p></Col>
                    <Col xs={1}><p className="consult-list-action-bold-text">Weight</p></Col>
                </Row>

                <div className="consult-list-action-line-2"/>

                <Row>
                    <Col xs={1}><p className="consult-list-action-light-text2">{item.id}</p></Col>
                    <Col xs={3}><p className="consult-list-action-light-text2">{item.fullName}</p></Col>
                    <Col xs={1}><p className="consult-list-action-light-text2">{item.gender}</p></Col>
                    <Col xs={3}>
                        <Row>
                            <Col xs={2}/>
                            <Col xs={10}><p className="consult-list-action-light-text2">{item.phone}</p></Col>
                        </Row>
                    </Col>
                    <Col xs={1}><p className="consult-list-action-light-text2">{item.age}</p></Col>
                    <Col xs={1}><p className="consult-list-action-light-text2">{item.height}</p></Col>
                    <Col xs={1}><p className="consult-list-action-light-text2">{item.weight}</p></Col>
                </Row>
                <br/>
                <div className="consult-list-action-line-2"/>
                <br/>

                <Form>
                    <Form.Group controlId="consultResponse">
                        <Form.Label className="consult-list-action-title-2">Give Response</Form.Label>
                        <Form.Control as="textarea" rows="5" required value={response} onChange={handleResponseChange}/>
                    </Form.Group>
                </Form>

                { item.status === "Waiting Approve Live Consultation" &&
                    <Row>
                        <Col xs={8}/>
                        <Col xs={2}>
                            <Button variant="danger" size="lg" className="consult-list-action-small-button" onClick={() => patchConsult("Cancel")}>Cancel</Button>
                        </Col>
                        <Col xs={2}>
                            <Button variant="success" size="lg" className="consult-list-action-small-button" onClick={() => patchConsult("Waiting Live Consultation")}>Approve</Button>
                        </Col>
                    </Row>
                }

            </Container>
        </>
    )
}

export default TransactionAction;