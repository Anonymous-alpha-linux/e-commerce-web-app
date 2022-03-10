import React from 'react';
export default function IconComponent({ children, ...restProps }) {
    return <div className='icon__root'  {...restProps}>
        {children}
    </div>;
}

IconComponent.CircleIcon = ({ children, ...props }) => {
    return <div {...props} className={`icon__circleIcon ${props.className}`}>
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
IconComponent.Badge = ({ children, ...props }) => <span className="icon__badge" {...props}>{children}</span>
IconComponent.Image = ({ ...props }) => <img src={props.src} alt={props.alt} className="icon__image" loading='eager'></img>