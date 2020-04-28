import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { API, setAuthToken } from "../config/api";
import { Redirect } from 'react-router-dom';

import '../styles/reservation.css';

import Login from '../components/login';

const AddArticle = () => {
    const [article, setArticle] = React.useState({});
    const [articleFail, setArticleFail] = React.useState(false);
    const [articleOK, setArticleOK] = React.useState(false);

    const showArticleFail = () => {
        setArticleFail(true);
    };
    const hideArticleFail = () => {
        setArticleFail(false);
    };
    const showArticleOK = () => {
        setArticleOK(true);
    };

    const handleChange = (event) => {
        const { data } = article;
        setArticle({
            data: { ...data, [event.target.name]: event.target.value },
        });
    };

    const addArticle = async (event) => {
        try {
            event.preventDefault();
            const token = localStorage.getItem('userToken');
            setAuthToken(token);
            const user = await API.get("/user");
            const auth = user.data.data;
            let currDate = new Date();
            currDate.setHours(7,0,0,0);

            const { data } = article;

            await API.post("/articles", {
                title: data.title,
                description: data.description,
                userId: auth.id,
                createdAt: currDate
            });
            setArticle({});
            hideArticleFail();
            showArticleOK();
        } catch (error) {
            if (error.code === "ECONNABORTED") {
                console.log("Network Error!");
            } else {
                const { data, status } = error.response;
                console.log(data.message, status);
            }
            showArticleFail();
        }
    };

    return (
        <div>
            <Login/>

            { articleOK &&
                <Redirect to="/"/>
            }

            <div className="reserve-bg">
                <h3 className="reserve-title">Add Article</h3>
                <Container fluid className="reserve-area">
                    { articleFail === true &&
                        <p style={{ color: 'red' }}>Failed to add article!</p>
                    }

                    <Form onSubmit={addArticle} id="article-form">
                        <Form.Group controlId="articleFullName">
                            <Form.Label className="reserve-bold-text">Title</Form.Label>
                            <Form.Control type="text" required
                                name="title"
                                value={article.title && article.title}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="articleDescription">
                            <Form.Label className="reserve-bold-text">Description</Form.Label>
                            <Form.Control as="textarea" rows="10" required
                                name="description"
                                value={article.description && article.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        
                        <br/>
                        <Button variant="danger" type="submit" block>
                            Post
                        </Button>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default AddArticle;