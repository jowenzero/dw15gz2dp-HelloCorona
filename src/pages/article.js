import React, { useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetailArticle } from "../_actions/article";
import { getUsers } from "../_actions/user";
import Markdown from 'markdown-to-jsx';

import '../styles/article.css';

import Login from '../components/login';

const Article = (props) => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    
    useEffect(() => {
        initFetch();
    }, [initFetch]);

    function formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    let labels;

    if (!loading && !error && articles.tags) {
        labels = articles.tags.map((item, index) => (
            <div key={index} className="article-tag-rect">{item}</div>
        ))
    }

    if (!loading && !error && !isUserGet && articles.userId)
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


            { (!loading && !error && articles && users.fullName) &&
                <div className="article-area">
                    <p className="article-name">{articles.title}</p>
                    <p className="article-light">{formatDate(articles.createdAt)}</p>
                    <p className="article-light">Author:&nbsp;<span className="color-pink">{users.fullName}</span></p>
                    <Container fluid className="article-box">
                        <img src={ process.env.PUBLIC_URL + "../images/ArticlePic.png" } alt="" className="article-pic"></img>
                        <br/><br/><br/><br/><br/>
                        { articles.tags && 
                            <Container fluid className="article-tag-pos">
                                {labels}
                            </Container>
                        }
                        <br/>
                        <p className="article-desc-text">
                            <Markdown options={{ forceBlock: true }}>
                                {articles.description}
                            </Markdown>
                        </p>
                        <br/><br/><br/>
                    </Container>
                    <br/><br/><br/><br/><br/>
                </div>
            }
        </div>
    )
}

export default Article;