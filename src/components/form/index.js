import React from 'react';

export default function Form({ children, action, method, onSubmit, ...restProp }) {
    return (
        <div className='form' {...restProp}>
            <form action={action} method={method} onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    )
}

Form.Title = function ({ children, ...restProp }) {
    return (
        <div className="form__title" {...restProp}>
            {children}
        </div>
    )
}

Form.Container = function ({ children, ...restProp }) {
    return (
        <div className="form__container" {...restProp}>
            {children}
        </div>
    )
}

Form.Logo = function ({ image, alt, ...restProp }) {
    return (
        <div className="form__logo" {...restProp}>
            <img src={image} alt={alt} className='form__image' />
        </div>
    )
}

Form.Input = function ({ children, ...restProp }) {
    return (
        <input className="form__input" {...restProp}>
            {children}
        </input>
    )
}

Form.Link = function ({ children, ...restProp }) {
    return (
        <a href="" className="form__link" {...restProp}>
            {children}
        </a>
    )
}

Form.Button = function ({ children, ...restProp }) {
    return (
        <a className="form__button" {...restProp}>
            {children}
        </a>
    )
}

Form.Textarea = function ({ children, ...restProp }) {
    return (
        <textarea className="form__textarea" {...restProp}>
            {children}
        </textarea>
    )
}

