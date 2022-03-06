import React from 'react'

const List = React.forwardRef(function ({ children, ...props }, ref) {
    return (
        <ul {...props} className={`list ${props.className}`} ref={ref}>
            {children}
        </ul>
    )
});

List.Item = function ({ children, ...props }) {
    return <li className='list__item' {...props}>{children}</li>
}

export default List;