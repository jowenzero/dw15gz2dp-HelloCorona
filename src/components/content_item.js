import React from 'react';

import '../styles/content_item.css';

const ContentItem = ({item}) => {
    const rand = (item.id % 8) + 1;

    return (
        <div className="content-item">
            <img src={ process.env.PUBLIC_URL + `../images/Thumbnail${rand}.png` } alt="" className="content-image"></img>
            <p className="content-info-1">{item.title}</p>
            <p className="content-info-2">Lorem Ipsum is simply dummy text of the printing
and typesetting industry. Lorem Ipsum has been the industry's
standard dummy text ever since the 1500s, when an unknown
printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
    )
}

export default ContentItem;