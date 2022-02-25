import React from 'react';
export default function IconComponent({ children, ...restProps }) {
    return <div className='icon__root'  {...restProps}>
        {children}
    </div>;
}

IconComponent.CircleIcon = ({ children, ...props }) => {
    return <div className="icon__circleIcon" {...props}>
        {children}
    </div>
}
IconComponent.Label = ({ children, ...props }) => {
    return <p className='icon__label' {...props}>
        {children}
    </p>
}

IconComponent.Avatar = ({ children, ...props }) => {
    return <div className="icon__avatar" {...props}>
        {children}
    </div>
}

IconComponent.Image = ({ ...props }) => <img src={props.src} alt={props.alt} className="image" loading='eager'></img>