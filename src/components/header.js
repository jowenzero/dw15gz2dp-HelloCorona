import React from 'react';
import { Container, Navbar, Nav, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API } from "../config/api";

import '../styles/header.css';

import Logo from '../icons/Logo.svg'

const Header = () => {
    const [isSignInOpen, setIsSignInOpen] = React.useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);
    const [loginFail, setLoginFail] = React.useState(false);

    const [userSignIn, setUserSignIn] = React.useState(null);
    const [passSignIn, setPassSignIn] = React.useState(null);
    const [user, setUser] = React.useState({});

    if (localStorage.getItem('userToken') === null) {
        localStorage.setItem('userLogin', 'false');
        localStorage.setItem('userListAs', 'Patient');
    }
    const showSignIn = () => {
        setIsSignInOpen(true);
    };
    const hideSignIn = () => {
        setUserSignIn(null);
        setPassSignIn(null);
        setIsSignInOpen(false);
    };
    const showSignUp = () => {
        setIsSignUpOpen(true);
    };
    const hideSignUp = () => {
        setUser({});
        setIsSignUpOpen(false);
    };
    const showLoginFail = () => {
        setLoginFail(true);
    };
    const hideLoginFail = () => {
        setLoginFail(false);
    };

    const handleUserSignInChange = (event) => {
        setUserSignIn(event.target.value);
    };
    const handlePassSignInChange = (event) => {
        setPassSignIn(event.target.value);
    };
    const handleUserChange = (event) => {
        const { data } = user;
        setUser({
            data: { ...data, [event.target.name]: event.target.value },
        });
    };

    const signIn = async (event) => {
        try {
            event.preventDefault();
            const user = await API.post("/signin", {
                username: userSignIn,
                password: passSignIn
            });
            const { data } = user.data;

            if (data.listId === 1)
                localStorage.setItem('userListAs', 'Patient');
            else if (data.listId === 2)
                localStorage.setItem('userListAs', 'Doctor');

            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userLogin', 'true');
            hideLoginFail();
            window.location.reload(true);
        } catch (error) {
            if (error.code === "ECONNABORTED") {
                console.log("Network Error!");
            } else {
                const { data, status } = error.response;
                console.log(data.message, status);
            }
            localStorage.setItem('userLogin', 'false');
            showLoginFail();
        }
    };

    const signUp = async (event) => {
        try {
            event.preventDefault();
            const { data } = user;
            let listNum = 1;
            if (data.listAs === "Patient")
                listNum = 1;
            else if (data.listAs === "Doctor")
                listNum = 2;

            let gender = "Male";
            if (data.gender === "Female")
                gender = "Female";

            const newUser = await API.post("/signup", {
                fullName: data.fullName,
                username: data.username,
                email: data.email,
                password: data.password,
                listId: listNum,
                gender: gender,
                phone: data.phone,
                address: data.address
            });
            const newData = newUser.data.data;

            if (listNum === 1)
                localStorage.setItem('userListAs', 'Patient');
            else if (listNum === 2)
                localStorage.setItem('userListAs', 'Owner');

            localStorage.setItem('userToken', newData.token);
            localStorage.setItem('userLogin', 'true');
            setUser({});
            window.location.reload(true);
        } catch (error) {
            if (error.code === "ECONNABORTED") {
                console.log("Network Error!");
            } else {
                const { data, status } = error.response;
                console.log(data.message, status);
            }
            localStorage.setItem('userLogin', 'false');
        }
    };

    return (
        <Container fluid className="padding">
            <Navbar bg="white" className="justify-content-between" fixed="top">
                <Navbar.Brand><Link to="/"><img src={Logo} alt=""></img></Link></Navbar.Brand>
                
                <Nav>
                    <Button variant="outline-danger" size="lg" className="home-sign-in" onClick={showSignIn}>Sign In</Button>
                    <Button variant="danger" size="lg" onClick={showSignUp}>Sign Up</Button>
                </Nav>
            </Navbar>



            

            <Modal show={isSignInOpen} onHide={() => {
                        hideSignIn();
                        hideLoginFail();
                    }}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={signIn}>
                        <Form.Group controlId="signInUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" required
                                value={userSignIn} 
                                onChange={handleUserSignInChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="signInPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required
                                value={passSignIn} 
                                onChange={handlePassSignInChange} 
                            />
                        </Form.Group>

                        { loginFail === true &&
                            <p style={{ color: 'red' }}>Login Failed!</p>
                        }
                        { loginFail === false &&
                            <br/>
                        }
                        
                        <Button variant="danger" type="submit" block>
                            Sign In
                        </Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <p onClick={() => {
                        hideSignIn();
                        showSignUp();
                    }}>Don't have an account? <b>Click Here!</b></p>
                </Modal.Footer>
            </Modal>





            <Modal show={isSignUpOpen} onHide={hideSignUp}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={signUp}>
                        <Form.Group controlId="signUpFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" required
                                name="fullName" 
                                value={ user.fullName && user.fullName } 
                                onChange={handleUserChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="signUpUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" required
                                name="username" 
                                value={ user.username && user.username } 
                                onChange={handleUserChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="signUpEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required
                                name="email" 
                                value={ user.email && user.email } 
                                onChange={handleUserChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="signUpPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required
                                name="password" 
                                value={ user.password && user.password } 
                                onChange={handleUserChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="signUpListAs">
                            <Form.Label>List As</Form.Label>
                            <Form.Control as="select" required
                                name="listAs" 
                                value={ user.listAs } 
                                onChange={handleUserChange}
                            >
                                <option>Patient</option>
                                <option>Doctor</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="signUpGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" required
                                name="gender" 
                                value={ user.gender } 
                                onChange={handleUserChange}
                            >
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="signUpPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="tel" required
                                name="phone" 
                                value={ user.phone && user.phone }  
                                pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}" 
                                placeholder="Ex. 0812-3456-7890" 
                                onChange={handleUserChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="signUpAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control  as="textarea" required
                                name="address"
                                rows="3" 
                                value={ user.address && user.address } 
                                onChange={handleUserChange} 
                            />
                        </Form.Group>
                        <br/>
                        
                        <Button variant="danger" type="submit" block>
                            Sign Up
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Header;