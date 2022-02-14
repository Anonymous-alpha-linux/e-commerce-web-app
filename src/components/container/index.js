import React from 'react';
// import { Container, Item, Pane, Inner, Grid, Flex, Link, MiddleInner, BackDrop, Hero } from './styles'

// 1. define the default component
export default function ContainerComponent({ children, ...restProps }) {
    return (
        <div className='container__root' {...restProps}>
            {children}
        </div>
    )
}

ContainerComponent.Absolute = function ({ children, ...restProps }) {
    return <div className='container__absolute'>
        {children}
    </div>
}
ContainerComponent.Flex = function ({ children, ...restProps }) {
    return <div className='container__flex' {...restProps}>
        {children}
    </div>
}

ContainerComponent.Grid = function ({ children, columns = 3, ...restProps }) {
    return <div className='container__grid' {...restProps}>
        {children}
    </div>
}

ContainerComponent.GridThreeColumns = function ({ children, ...props }) {
    return <div className="container__gridThreeColumns" {...props}>
        {children}
    </div>
}

ContainerComponent.BackDrop = function ({ children, ...restProps }) {
    return <div className="container__backdrop" {...restProps}>
        {children}
    </div>
}

ContainerComponent.Item = function ({ children, width = '100%', padding = '10px', ...restProps }) {
    return <div className="container__item" width={width} padding={padding} {...restProps}>
        {children}
    </div>
}

ContainerComponent.Pane = function ({ children, ...restProps }) {
    return <div className="container__pane" {...restProps}>
        {children}
    </div>
}

ContainerComponent.Inner = function ({ children, ...restProps }) {
    return <div className="container__inner" {...restProps}>
        {children}
    </div>
}

ContainerComponent.MiddleInner = function ({ children, ...restProps }) {
    return <div className="container__middleInner" {...restProps}>{children}</div>
}

ContainerComponent.Link = function ({ children, ...restProps }) {
    return <a className="container__link" href={restProps.path}>{children}</a>
}

ContainerComponent.Section = function ({ children, ...restProps }) {
    return <div className="container__section" {...restProps}>{children}</div>
}
ContainerComponent.Hero = React.forwardRef(function ({ children, ...restProps }, ref) {
    return <div className="container__hero" ref={ref} {...restProps}>
        {children}
    </div>
})
