import React, { useState, useEffect } from "react";
import "../containers/styles/_crub.scss";
import { AnimateComponent } from "../hooks";

let Category = [
  {
    id: 1,
    Title: "Business",
  },
  {
    id: 2,
    Title: "Art",
  },
  {
    id: 3,
    Title: "IT",
  },
  {
    id: 4,
    Title: "English",
  },
];

function Crud() {
  const [categories, setCategories] = useState(Category);
  const [modal, setModal] = useState(false);

  function deleteUser() {}
  function onSubmit(data) {
    return createCetegory(data);
  }
  function createCetegory(data) {
    return Category.create(data);
  }

  const ModalAddFormCategory = () => {
    return (
      <div className="c-modal__container">
        <form onSubmit={onSubmit}>
          <div className="form-container">
            <div className="question-container">
              <label className="question-label">Category Name</label>
              <input className="row-input" name="name" type="text" />
            </div>
          </div>
          <div className="form-container">
            <div className="question-container">
              <button type="submit" className="submit_category">
                Add
              </button>
              <button
                className="btn-trans-Cancel"
                onClick={() => setModal(!modal)}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };
  const CrudCategory = () => {
    return (
      <div>
        <h1>Category Crud</h1>
        <button className="btn-rounded-green" onClick={() => setModal(!modal)}>
          Create New Category
        </button>
        {modal && (
          <div
            style={{
              height: "0px",
              // transition: "all 2s ease",
            }}
          >
            <ModalAddFormCategory />
          </div>
        )}
        {/* <AnimateComponent Class="btn-rounded-green" name="Create New Category">
          <ModalAddFormCategory />
        </AnimateComponent> */}
        <div
          style={{
            marginTop: "25%",
          }}
        >
          <table className="table table-style">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.map((category) => (
                  <tr key={category.id}>
                    <td style={{ textAlign: "center", width: "40%" }}>
                      {category.id}
                    </td>
                    <td style={{ textAlign: "center", width: "40%" }}>
                      {category.Title}
                    </td>
                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                      <button
                        onClick={() => deleteUser()}
                        className="btn-red"
                        disabled={category.isDeleting}
                      >
                        {category.isDeleting ? (
                          <span></span>
                        ) : (
                          <span>Delete</span>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              {categories && !categories.length && (
                <tr>
                  <td>
                    <div>No Coategry to Display</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div>
      <CrudCategory />
    </div>
  );
}

export default Crud;
