import React from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';

import '../styles/consult_list_item.css';

import Action from '../icons/Action.svg';
import ConsultListAction from '../components/consult_list_action';

const ConsultListItem = ({item}) => {
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);

    const showPopup = () => {
        setIsPopupOpen(true);
    };

    const hidePopup = () => {
        setIsPopupOpen(false);
    };

    function formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }
    
    return (
        <>
            <Container fluid className="consult-list-item-area">
                <Row>
                    <Col xs={2} className="consult-list-item-text">{item.id}</Col>
                    <Col xs={2} className="consult-list-item-text">{item.fullName}</Col>
                    <Col xs={2} className="consult-list-item-text">{item.subject}</Col>
                    <Col xs={2} className="consult-list-item-text">{formatDate(item.createdAt)}</Col>
                    { item.status === "Waiting Approve Live Consultation" &&
                        <Col xs={2} className="consult-list-item-status color-orange">{item.status}</Col>
                    }
                    { item.status === "Waiting Live Consultation" &&
                        <Col xs={2} className="consult-list-item-status color-green">{item.status}</Col>
                    }
                    { item.status === "Cancel" &&
                        <Col xs={2} className="consult-list-item-status color-red">{item.status}</Col>
                    }
                    <Col xs={2} className="consult-list-item-text">
                        <img src={Action} alt="" onClick={showPopup}></img>
                    </Col>
                </Row>
                <p className="consult-list-item-line"/>
            </Container>              
        
            <Modal show={isPopupOpen} onHide={hidePopup} centered>
                <Modal.Body className="action-area">
                    <br/>
                    <ConsultListAction item={item} key={item.id}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ConsultListItem;