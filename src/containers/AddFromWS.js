import React from "react";

function AddFromWS({ onSubmit, setModal, modal }) {
  return (
    <div className="c-modal__container">
      <form onSubmit={onSubmit}>
        <div className="form-container">
          <div className="question-container">
            <label className="question-label">Workspace Title</label>
            <input className="row-input" type="text" />
          </div>
          <div className="question-container">
            <label className="question-label">Closure Date</label>
            <input className="row-input" type="date" />
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
}

export default AddFromWS;
