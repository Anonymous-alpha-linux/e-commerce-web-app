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