import React from 'react';

import '../styles/content_item.css';

const ContentItem = ({item}) => {
    const rand = (item.id % 8) + 1;

    return (
        <div className="content-item">
            <img src={ process.env.PUBLIC_URL + `../images/Thumbnail${rand}.png` } alt="" className="content-image"></img>
            <p className="content-info-1">{item.title}</p>
            <p className="content-info-2">{item.description}</p>
        </div>
    )
}

export default ContentItem;