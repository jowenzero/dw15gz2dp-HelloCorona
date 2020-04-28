import React, { useEffect, useCallback } from 'react';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiOutlineUser, AiFillMail, AiOutlineLogout } from "react-icons/ai";
import { RiArticleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { getUser } from "../_actions/user";

import '../styles/header.css';

import Logo from '../icons/Logo.svg'

const HeaderLogin = ({role}) => {
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch(getUser());
    }, [dispatch]);
    
    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const logOut = () => {
        const data = 'false';
        const status = 'Patient';
        const token = null;
        localStorage.setItem('userLogin', data);
        localStorage.setItem('userListAs', status);
        localStorage.setItem('userToken', token);
        window.location.reload(true);
    };

    return (
        <Container fluid className="padding">
            <Navbar bg="white" className="justify-content-between" fixed="top">
                <Navbar.Brand><Link to="/"><img src={Logo} alt=""></img></Link></Navbar.Brand>
                
                <Nav>
                    <Dropdown alignRight>
                        <Dropdown.Toggle variant="white" id="dropdown-basic" className="home-transparent">
                            <img src={ process.env.PUBLIC_URL + `../images/ProfPic${role}.png` } width="60" height="60" alt=""></img>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/profile"><AiOutlineUser className="home-icons"/>Profile</Dropdown.Item>
                            { role === "Patient" &&
                                <Dropdown.Item as={Link} to="/consultation"><AiFillMail className="home-icons"/>Consultation</Dropdown.Item>
                            }
                            { role === "Doctor" &&
                                <Dropdown.Item as={Link} to="/add-article"><RiArticleLine className="home-icons"/>Add Article</Dropdown.Item>
                            }
                            <Dropdown.Divider/>
                            <Dropdown.Item onClick={ logOut } href="/"><AiOutlineLogout className="home-icons"/>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar>
        </Container>
    );
}

export default HeaderLogin;