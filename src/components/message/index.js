import React from 'react'

export default function Message({ children, ...restProp }) {
    return (
        <div className="mess" {...restProp}>
            {children}
        </div>
    )
}

Message.SearchForm = function ({ children, ...restProp }) {
    return (
        <div className="mess__searchForm" {...restProp}>
            {children}
        </div>
    )
} 
Message.Form = function({children,...restProp}){
    return(
        <div className='mess__form' {...restProp}>
            {children}
        </div>
    )
}
