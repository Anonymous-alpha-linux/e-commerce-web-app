import React, { useState } from "react";
import axios from "axios";
import { mainAPI } from "../config";
import { useWorkspaceContext } from "../redux";

function AddFromWS({ setModal, modal }) {
  const [workspaceAdd, setWorkspaceAdd] = useState({
    workTitle: "",
    manager: null,
    eventTime: Date.now(),
    expireTime: Date.now(),
  });

  const [API, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_MANAGER, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_MANAGER, mainAPI.CLOUD_HOST];
  const { createWorkspace } = useWorkspaceContext();

  async function HandleWSInput(e) {
    setWorkspaceAdd({ ...workspaceAdd, [e.target.name]: e.target.value });
  }
  async function onSubmit(e) {
    e.preventDefault();
    CreateWorkspace();
  }
  function CreateWorkspace() {
    return axios
      .post(API, workspaceAdd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "workspace",
        },
      })
      .then((res) => {
        createWorkspace(res.data.response);
        setModal(false);
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <div className="c-modal__container">
      <form onSubmit={onSubmit}>
        <div className="form-container">
          <div className="question-container">
            <label className="question-label">Workspace Title</label>
            <input
              className="row-input"
              type="text"
              name="workTitle"
              onChange={HandleWSInput}
              value={workspaceAdd.workTitle}
            />
          </div>
          <div className="question-container">
            <label className="question-label">Close Event(comment, etc.)</label>
            <input
              className="row-input"
              type="date"
              name="eventTime"
              onChange={HandleWSInput}
              value={workspaceAdd.eventTime}
            />
          </div>

          <div className="question-container">
            <label className="question-label">Closure Date</label>
            <input
              className="row-input"
              type="date"
              name="expireTime"
              onChange={HandleWSInput}
              value={workspaceAdd.expireTime}
            />
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
