import React from 'react';
import { Container } from 'react-bootstrap';
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
        <Container fluid>
            <img src={JumbotronPic} alt=""></img>
            <img src={ConsultButton} className="consult-button" onClick={showButtonPress} alt="" ></img>

            { isButtonPress &&
                <Redirect to="/reservation"/>
            }
        </Container>
    );
}

export default Jumbotron;