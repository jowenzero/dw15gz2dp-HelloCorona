import React, { useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetailArticle } from "../_actions/article";
import { getUsers } from "../_actions/user";

import '../styles/article.css';

import Login from '../components/login';

const Property = (props) => {
    const users = useSelector(state => state.user.multiData);
    const articles = useSelector(state => state.article.singleData);
    const loading = useSelector(state => state.article.loading);
    const error = useSelector(state => state.article.error);
    const dispatch = useDispatch();

    const [isUserGet, setIsUserGet] = React.useState(false);

    const userGet = () => {
        setIsUserGet(true);
    };


    const initFetch = useCallback(() => {
        const { match } = props;
        let {id} = match.params;
        dispatch(getDetailArticle(id));
    }, [dispatch]);
    
    useEffect(() => {
        initFetch();
    }, [initFetch]);

    function formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    if (!loading && !error && articles && !isUserGet)
    {
        dispatch(getUsers(articles.userId));
        userGet();
    }

    return (
        <div>
            <Login/>
            <br/><br/>
            { localStorage.getItem("userListAs") === "Doctor" &&
                <Redirect to="/"/>
            }


            { (!loading && !error && articles && isUserGet) &&
                <div className="article-area">
                    <p className="article-name">{articles.title}</p>
                    <p className="article-light">{formatDate(articles.createdAt)}</p>
                    <p className="article-light">Author: {users.fullName}</p>
                    <Container fluid className="article-box">
                        <img src={ process.env.PUBLIC_URL + "../images/ArticlePic.png" } alt="" className="article-pic"></img>
                        <br/><br/><br/><br/><br/><br/><br/>
                        <p className="article-desc-text">{articles.description}</p>
                        <br/><br/><br/><br/><br/>
                        <p className="article-desc-text">{articles.description}</p>
                        <br/><br/><br/><br/><br/>
                        <p className="article-desc-text">{articles.description}</p>
                        <br/><br/><br/><br/><br/>
                        <p className="article-desc-text">{articles.description}</p>
                    </Container>
                    <br/><br/><br/><br/><br/>
                </div>
            }
        </div>
    )
}

export default Property;