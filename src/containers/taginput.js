import { useState, useEffect, useRef } from "react";

/**
 * `TagsInput`
 * @async
 * @param {array} filter - is the collection of the dropdown values for reference
 * @param {array | string | object} formField - the passing value from form required
 * @param {callback} setFormField - is the callback receive parameters containing the value you want to send out to the Component
 */

export default function TagsInput({ filter, formField = [], setFormField }) {
  const [text, setText] = useState("");
  const [active, setActive] = useState(false);
  const filtered = useRef([...filter]);
  const inputDiv = useRef(null);

  useEffect(() => {
    inputDiv.current.focus();
  }, []);

  const handleDelete = (id) => {
    setFormField(formField.filter((tag, index) => index !== id));
  };

  const handleFilter = (value) => {
    filtered.current = filter.filter((data) =>
      data.toUpperCase().includes(value.toUpperCase())
    );
    setText(value);
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      // check if input is contained from filter array
      if (!formField.includes(text))
        setFormField((prev) => {
          return [...prev, text];
        });
      handleFilter("");
      e.target.focus();
    }
  };

  return (
    <div
      className="tags_container"
      style={{
        width: `inherit`,
        margin: `50px auto`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `flex-start`,
        flexWrap: `wrap`,
      }}
    >
      {formField.length &&
        formField.map((tag, index) => {
          return (
            <div
              key={index}
              className="tags"
              style={{
                display: `inline-block`,
                padding: `5px`,
                background: `#2e3f59`,
                color: `white`,
                margin: `2px`,
                borderRadius: `5px`,
                fontSize: `16px`,
                textAlign: `center`,
                verticalAlign: `middle`,
                whiteSpace: `nowrap`,
              }}
            >
              {tag}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
                style={{
                  width: `inherit`,
                  height: `inherit`,
                  marginLeft: `10px`,
                  color: `#2e8eff`,
                  fontSize: `16px`,
                  cursor: `pointer`,
                }}
                onClick={() => handleDelete(index)}
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
          );
        })}
      <div className="search_box">
        <input
          ref={inputDiv}
          placeholder="input your tags"
          value={text}
          onChange={(e) => {
            handleFilter(e.target.value);
            setActive(true);
          }}
          onKeyDown={handleInput}
        ></input>
        <button
          onClick={() => {
            handleFilter("");
            setActive((prev) => !prev);
          }}
        ></button>
        {active ? (
          <div className="style_dropdown">
            {filtered.current.map((target, index) => (
              <div
                key={index}
                className="style_dropdown_content"
                onClick={(e) => {
                  handleFilter(e.target.innerText);
                  inputDiv.current.focus();
                }}
              >
                {target}
              </div>
            ))}
          </div>
        ) : undefined}
      </div>
    </div>
  );
}
