import React from "react";

export default function Text({ children, ...props }) {
  return <p className="text">{children}</p>;
}
Text.Title = function ({ children, ...props }) {
  return (
    <h2 className="text__title" {...props}>
      {children}
    </h2>
  );
};
Text.Subtitle = function ({ children, ...props }) {
  return (
    <h3 className="text__subtitle" {...props}>
      {children}
    </h3>
  );
};
Text.Date = function ({ children, ...props }) {
  return (
    <p className="text__date" {...props}>
      {children}
    </p>
  );
};
Text.Paragraph = function ({ children, ...props }) {
  return (
    <p className="text__paragraph" {...props}>
      {children}
    </p>
  );
};
