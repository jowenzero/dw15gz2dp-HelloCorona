import React from 'react';
import { Container, Row, Col, DropdownButton } from 'react-bootstrap';
import { AiOutlineUser, AiOutlineMail, AiOutlineUnorderedList, AiOutlinePhone } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { IoIosTransgender } from "react-icons/io";
import { useSelector } from "react-redux";
import { API, setAuthToken } from "../config/api";

import '../styles/profile.css';

import Login from '../components/login';

const Profile = () => {
    const data = useSelector(state => state.user.data);
    const loading = useSelector(state => state.user.loading);
    const error = useSelector(state => state.user.error);
    const listAs = localStorage.getItem('userListAs');

    const [file, setFile] = React.useState(null);

    const onChange = (event) => {
        setFile(event.target.files[0]);
    }

    const onFileUpload = async (event) => {
        try {
            event.preventDefault();
            const token = localStorage.getItem('userToken');
            setAuthToken(token);
            const formData = new FormData();
            formData.append('file', file);

            await API.post("/user/upload", formData, {

            })
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
        <div>
            <Login/>
            { (!loading && !error && data) && 
                <div className="profile-bg">
                    <br/><br/>
                    <Container fluid className="profile-area">
                        <br/>
                        <h3 className="profile-info">Personal Info</h3>
                        <Row>
                            <Col xs={1}>
                                <br/>
                                <AiOutlineUser className="profile-icons"/>
                                <AiOutlineMail className="profile-icons"/>
                                <AiOutlineUnorderedList className="profile-icons"/>
                                <IoIosTransgender className="profile-icons"/>
                                <AiOutlinePhone className="profile-icons"/>
                                <GoLocation className="profile-icons"/>
                            </Col>
                            <Col xs={6}>
                                <br/>
                                <p className="profile-name">{ data.fullName }</p>
                                <p className="profile-desc">Full Name</p>
                                <p className="profile-name">{ data.email }</p>
                                <p className="profile-desc">Email</p>
                                <p className="profile-name">{ listAs }</p>
                                <p className="profile-desc">Status</p>
                                <p className="profile-name">{ data.gender }</p>
                                <p className="profile-desc">Gender</p>
                                <p className="profile-name">{ data.phone }</p>
                                <p className="profile-desc">Mobile Phone</p>
                                <p className="profile-name">{ data.address }</p>
                                <p className="profile-desc">Address</p>
                            </Col>
                            <Col xs={4}>
                                <img src={ process.env.PUBLIC_URL + `../images/Profile${listAs}.png` } alt=""></img>
                                <br/><br/>
                                <DropdownButton variant="danger" id="dropdown-basic-button" title="Change Photo Profile">
                                    <form onSubmit={onFileUpload}>
                                        <input type="file" name="file" onChange={onChange}/>
                                        <button type="submit">Upload</button>
                                    </form>
                                </DropdownButton>
                            </Col>
                        </Row>
                        <br/>
                    </Container>
                    <br/><br/><br/><br/><br/><br/>
                </div>
            }
        </div>
    )
}

export default Profile;