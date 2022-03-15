import React, { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";
import { mainAPI } from "../config";

function AddFromWS({ setModal, modal }) {
  const [workspaceAdd, setWorkspaceAdd] = useState({
    workTitle: "",
    manager: {},
    members: [],
    eventTime: new Date(),
    expireTime: Date(),
  });

  const [newRecord, setNewRecord] = useState(null);

  const WKSFunction = useRef(workspaceAdd);

  useEffect(() => {
    WKSFunction.current = workspaceAdd;
  }, [setWorkspaceAdd]);
  useEffect(() => {
    console.log(newRecord);
  }, [newRecord]);

  async function HandleWSInput(e) {
    setWorkspaceAdd({ ...workspaceAdd, [e.target.name]: e.target.value });
  }

  console.log(workspaceAdd.workTitle, "input");
  console.log(workspaceAdd.expireTime, "input");

  async function onSubmit(e) {
    e.preventDefault();
    const data = {
      workTitle: workspaceAdd.workTitle,
      expireTime: workspaceAdd.expireTime,
    };
    console.log(data.workTitle);
    console.log(data.expireTime);
    // CreateWorkspace();
  }
  function CreateWorkspace() {
    return axios
      .post(mainAPI.CLOUD_API_MANAGER, workspaceAdd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "workspaces",
        },
      })
      .then((res) => {
        setNewRecord(res.data.response);
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
