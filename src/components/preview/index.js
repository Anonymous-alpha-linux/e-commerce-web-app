import React from 'react';

export default function Preview({ image, alt, children, ...restProps }) {
    return (
        <div className="preview" {...restProps}>
            {children}
        </div>
    )
}

Preview.Images = function ({ children, ...restProps }) {
    return (
        <img className="preview__image"
            src={restProps.image}
            alt={restProps.alt} >
        </img>
    )
}