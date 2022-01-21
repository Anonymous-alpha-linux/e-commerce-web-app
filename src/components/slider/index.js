import React from 'react';

export default function Slider({ children }) {
    return <div className='slider__root'>
        {children}
    </div>;
}

Slider.Children = function ({ children }) {
    return <div className="slider__children">
        {children}
    </div>
}
