import React from "react";

export default function Form({
  children,
  action,
  method,
  onSubmit,
  ...restProp
}) {
  return (
    <div className="form" {...restProp}>
      <form
        action={action}
        method={method}
        onSubmit={onSubmit}
        encType={restProp.encType}
      >
        {children}
      </form>
    </div>
  );
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

Form.Input = React.forwardRef(function ({ children, ...restProp }, ref) {
  return (
    <input className="form__input" ref={ref} {...restProp}>
      {children}
    </input>
  );
});

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
    </textarea>
  );
};

Form.Select = function ({ children, ...restProp }) {
  return (
    <select className="form__select" {...restProp}>
      {children}
    </select>
  );
};

Form.Option = function ({ children, ...props }) {
  return (
    <option {...props} className="form__option" value={props.value}>
      {children}
    </option>
  );
};

Form.Checkbox = React.forwardRef(function ({ children, ...restProp }, ref) {
  return (
    <input type={'checkbox'} className="form__checkbox" ref={ref} {...restProp}>
      {children}
    </input>
  )
})

Form.FrameAvatar = function ({ children, ...restProp }) {
  return (
    <div className='form__frameAvatar' {...restProp}>
      {children}
    </div>
  )
}
