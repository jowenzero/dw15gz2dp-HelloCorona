import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { API, setAuthToken } from "../config/api";
import { Redirect } from 'react-router-dom';

import '../styles/reservation.css';

import Login from '../components/login';

const AddProperty = () => {
    const [reserve, setReserve] = React.useState({});
    const [reserveFail, setReserveFail] = React.useState(false);
    const [reverseOK, setReserveOK] = React.useState(false);

    const showReserveFail = () => {
        setReserveFail(true);
    };
    const hideReserveFail = () => {
        setReserveFail(false);
    };
    const showReserveOK = () => {
        setReserveOK(true);
    };

    const handleChange = (event) => {
        const { data } = reserve;
        setReserve({
            data: { ...data, [event.target.name]: event.target.value },
        });
    };

    const addHouse = async (event) => {
        try {
            event.preventDefault();
            const token = localStorage.getItem('userToken');
            setAuthToken(token);
            const user = await API.get("/user");
            const auth = user.data.data;

            const { data } = reserve;

            await API.post("/consultation", {
                fullName: data.fullName,
                phone: data.phone,
                bornDate: data.bornDate,
                age: data.age,
                height: data.height,
                weight: data.weight,
                gender: data.gender,
                subject: data.subject,
                liveConsult: data.liveConsult,
                description: data.description,
                userId: auth.id
            });
            setReserve({});
            hideReserveFail();
            showReserveOK();
        } catch (error) {
            if (error.code === "ECONNABORTED") {
                console.log("Network Error!");
            } else {
                const { data, status } = error.response;
                console.log(data.message, status);
            }
            showReserveFail();
        }
    };

    return (
        <div>
            <Login/>

            { reverseOK &&
                <Redirect to="/consultation"/>
            }

            <div className="reserve-bg">
                <h3 className="reserve-title">Reservation Consultation</h3>
                <Container fluid className="reserve-area">
                    { reserveFail === true &&
                        <p style={{ color: 'red' }}>Failed to reserve consultation!</p>
                    }

                    <Form onSubmit={addHouse} id="reserve-form">
                        <Form.Group controlId="reserveFullName">
                            <Form.Label className="reserve-bold-text">Full Name</Form.Label>
                            <Form.Control type="text" required
                                name="fullName"
                                value={reserve.fullName && reserve.fullName}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="reservePhone">
                            <Form.Label className="reserve-bold-text">Phone</Form.Label>
                            <Form.Control type="tel" required
                                name="phone" 
                                value={ reserve.phone && reserve.phone }  
                                pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}" 
                                placeholder="Ex. 0812-3456-7890" 
                                onChange={handleChange} 
                            />
                        </Form.Group>

                        <Row>
                            <Col xs={6}>
                                <Form.Group controlId="reserveBornDate">
                                    <Form.Label className="reserve-bold-text">Born Date</Form.Label>
                                    <Form.Control type="date" required
                                        name="bornDate"
                                        value={reserve.bornDate && reserve.bornDate}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <Form.Group controlId="reserveAge">
                                    <Form.Label className="reserve-bold-text">Age</Form.Label>
                                    <Form.Control type="number" required
                                        name="age"
                                        value={reserve.age && reserve.age}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <Form.Group controlId="reserveHeight">
                                    <Form.Label className="reserve-bold-text">Height</Form.Label>
                                    <Form.Control type="number" required
                                        name="height"
                                        value={reserve.height && reserve.height}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <Form.Group controlId="reserveWeight">
                                    <Form.Label className="reserve-bold-text">Weight</Form.Label>
                                    <Form.Control type="number" required
                                        name="weight"
                                        value={reserve.weight && reserve.weight}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="reserveGender">
                            <Form.Label className="reserve-bold-text">Gender</Form.Label>
                            <Form.Control as="select" required
                                name="gender"
                                value={reserve.gender && reserve.gender}
                                onChange={handleChange}
                            >
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="reserveSubject">
                            <Form.Label className="reserve-bold-text">Subject</Form.Label>
                            <Form.Control type="text" required
                                name="subject"
                                value={reserve.subject && reserve.subject}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="reserveLiveConsult">
                            <Form.Label className="reserve-bold-text">Live Consultation Date</Form.Label>
                            <Form.Control type="date" required
                                name="liveConsult"
                                value={reserve.liveConsult && reserve.liveConsult}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="reserveDescription">
                            <Form.Label className="reserve-bold-text">Description</Form.Label>
                            <Form.Control as="textarea" rows="3" required
                                name="description"
                                value={reserve.description && reserve.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        
                        <br/>
                        <Button variant="danger" type="submit" block>
                            Save
                        </Button>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default AddProperty;