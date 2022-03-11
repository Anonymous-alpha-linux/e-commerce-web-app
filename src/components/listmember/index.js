import React from 'react'

export default function ListMember({ children, ...restProp }) {
    return (
        <div className="list" {...restProp}>
            {children}
        </div>
    )
}

ListMember.SearchForm = function ({ children, ...restProp }) {
    return (
        <div className="list__searchForm" {...restProp}>
            {children}
        </div>
    )
} 
ListMember.Form = function({children,...restProp}){
    return(
        <div className='list__form' {...restProp}>
            {children}
        </div>
    )
}