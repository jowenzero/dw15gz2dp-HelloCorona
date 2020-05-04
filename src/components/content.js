import React, { useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../_actions/article";

import '../styles/content.css';

import ContentItem from '../components/content_item';

const Content = () => {
    const article = useSelector(state => state.article.data);
    const loading = useSelector(state => state.article.loading);
    const error = useSelector(state => state.article.error);
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch(getArticles());
    }, [dispatch]);
    
    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const data = article.map((item, index) => (
        <Link to={`/article/${item.id}`} style={{ textDecoration: 'none', color: 'black' }} key={index}>
            <ContentItem item={item} key={index}/>
        </Link>
    ))

    return (
        <Container fluid className="content-bg">
            <h3 className="title">&nbsp;Artikel Hari Ini</h3>
            { data.length <= 0 &&
                <>
                    <br/>
                    <h3 className="title">- N&nbsp;O&nbsp;&nbsp;&nbsp;D&nbsp;A&nbsp;T&nbsp;A -</h3>
                </>
            }
            <div className="flex-container">
                { (!loading && !error) && data }
            </div>
        </Container>
    );
}

export default Content;