import React from 'react'

function Responsive({ children, ...props }) {
    return (
        <div className='responsive__hook'>
            {children}
        </div>
    )
}

export default Responsive;
