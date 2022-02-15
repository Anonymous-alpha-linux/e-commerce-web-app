import { useState, useEffect } from "react";

export default function TagsInput({ filter, forParent }) {
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    forParent(tags);
  }, [tags]);

  let inputDiv;

  const handleDelete = (index) => {
    setTags(tags.filter((tag) => tag !== tags[index]));
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      if (!tags.includes(text))
        setTags((prev) => {
          return [...prev, text];
        });
      setText("");
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
      {tags.map((tag, index) => {
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
          ref={(e) => {
            if (e !== null) inputDiv = e;
          }}
          placeholder="input your tags"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => handleInput(e)}
        ></input>
        <div className="dropdown">
          {filter.map((target, index) => {
            if (text === "") return undefined;
            return target.toUpperCase().includes(text.toUpperCase()) ? (
              <div
                key={index}
                className={style.target}
                onClick={(e) =>
                  setText(() => {
                    inputDiv.focus();
                    return e.target.innerText;
                  })
                }
              >
                {target}
              </div>
            ) : undefined;
          })}
        </div>
      </div>
    </div>
  );
}
