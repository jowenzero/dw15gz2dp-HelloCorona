import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import JumbotronPic from '../icons/Jumbotron.svg';
import ConsultButton from '../icons/ConsultButton.svg';

import '../styles/jumbotron.css';

const Jumbotron = () => {
    const [isButtonPress, setButtonPress] = React.useState(false);
    const showButtonPress = () => {
        setButtonPress(true);
    };

    return (
        <Container fluid className="jumbotron-area">
            <img src={JumbotronPic} alt=""></img>
            <Row>
                <Col>
                <img src={ConsultButton} className="consult-button" onClick={showButtonPress} alt="" ></img>
                </Col>
            </Row>

            { isButtonPress &&
                <Redirect to="/reservation"/>
            }
        </Container>
    );
}

export default Jumbotron;