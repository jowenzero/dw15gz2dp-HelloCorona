import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Login from '../components/login';
import NotFoundPic from '../icons/NotFoundPic.png';

class not_found extends Component {
    render() {
        return (
            <div>
                <Login/>
                <br/><br/><br/><br/>
                <Container fluid>
                    <Row>
                        <Col xs={3}/>
                        <Col xs={9}> <img src={NotFoundPic} alt=""></img></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default not_found;