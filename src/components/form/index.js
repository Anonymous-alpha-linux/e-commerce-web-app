import React from "react";

<<<<<<< HEAD
export default function Form({
  children,
  action,
  method,
  onSubmit,
  ...restProp
}) {
  return (
    <div className="form" {...restProp}>
      <form action={action} method={method} onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
=======
export default function Form({ children, action, method, onSubmit, ...restProp }) {
    return (
        <div className='form' {...restProp}>
            <form action={action} method={method} onSubmit={onSubmit} encType={restProp.encType}>
                {children}
            </form>
        </div>
    )
>>>>>>> a21e38ce11a718bbe729f8f482ac27b8c4e5e572
}

Form.Title = function ({ children, ...restProp }) {
  return (
    <div className="form__title" {...restProp}>
      {children}
    </div>
  );
};

Form.Container = function ({ children, ...restProp }) {
  return (
    <div className="form__container" {...restProp}>
      {children}
    </div>
  );
};

Form.Logo = function ({ image, alt, ...restProp }) {
  return (
    <div className="form__logo" {...restProp}>
      <img src={image} alt={alt} className="form__image" />
    </div>
  );
};

Form.Input = function ({ children, ...restProp }) {
  return (
    <input className="form__input" {...restProp}>
      {children}
    </input>
  );
};

Form.Link = function ({ children, ...restProp }) {
  return (
    <a href="" className="form__link" {...restProp}>
      {children}
    </a>
  );
};

Form.Button = function ({ children, ...restProp }) {
  return (
    <a className="form__button" {...restProp}>
      {children}
    </a>
  );
};
Form.Message = function ({ children, ...restProps }) {
  return (
    <p className="form__message" {...restProps}>
      {children}
    </p>
  );
};

Form.ErrorMessage = function ({ children, ...restProp }) {
  return (
    <p className="form__errorMsg" {...restProp}>
      {children}{" "}
    </p>
  );
};

Form.TextArea = function ({ children, ...restProp }) {
  return (
    <textarea cols={12} {...restProp}>
      {children}
    </textarea>
  );
};

<<<<<<< HEAD
Form.Select = function ({ dropdown, children, ...restProp }) {
  return (
    <select className="form__select" id="dropdown" {...restProp}>
      {children}
    </select>
  );
};

Form.Checkbox = function ({ children, ...restProp }) {
  return (
    <input type={"checkbox"} className="form__checkbox" {...restProp}>
      {children}
    </input>
  );
};
=======
Form.Select = function ({ children, ...restProp }) {
    return <select className="form__select" {...restProp}>{children}</select>
}

Form.Option = function ({ children, ...props }) {
    return <option {...props} className='form__option' value={props.value}>{children}</option>
}

Form.Checkbox = function ({ children, ...restProp }) {
    return (
        <input type='checkbox' className="form__checkbox" {...restProp}>
            {children}
        </input>
    )
}
>>>>>>> a21e38ce11a718bbe729f8f482ac27b8c4e5e572
