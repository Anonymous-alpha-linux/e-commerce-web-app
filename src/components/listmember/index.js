import React from 'react'

export default function ListMemberComponent({ children, ...restProp }) {
    return (
        <div className="list" {...restProp}>
            {children}
        </div>
    )
}

ListMemberComponent.SearchForm = function ({ children, ...restProp }) {
    return (
        <div className="list__searchForm" {...restProp}>
            {children}
        </div>
    )
} 
ListMemberComponent.Form = function({children,...restProp}){
    return(
        <div className='list__form' {...restProp}>
            {children}
        </div>
    )
}