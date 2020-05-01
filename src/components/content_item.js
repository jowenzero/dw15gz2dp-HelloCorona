import React from 'react';
import { Container } from 'react-bootstrap';
import Markdown from 'markdown-to-jsx';

import '../styles/content_item.css';

const ContentItem = ({item}) => {
    const rand = (item.id % 8) + 1;

    const labels = item.tags.map((item, index) => (
        <div key={index} className="content-tag-rect">{item}</div>
    ))

    return (
        <div className="content-item">
            <img src={ process.env.PUBLIC_URL + `../images/Thumbnail${rand}.png` } alt="" className="content-image"></img>
            <p className="content-info-1">{item.title}</p>
            <p className="content-info-2">
                <Markdown options={{ forceBlock: true }}>
                    {item.description}
                </Markdown>
            </p>
            <Container fluid className="content-tag-pos">
                {labels}
            </Container>
        </div>
    )
}

export default ContentItem;