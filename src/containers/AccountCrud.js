import React, { useState, useRef, useEffect } from "react";

import Pagination from "./Pagination";
import { useAdminContext } from "../redux";
import axios from "axios";
import { mainAPI } from "../config";
import useValidate from "../hooks/useValidate";

export default function AccountCrud() {
  const [API] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_ADMIN, mainAPI.LOCALHOST_HOST]
      : [mainAPI.LOCALHOST_ADMIN, mainAPI.CLOUD_HOST];
  let PageSize = 8;
  const { accounts } = useAdminContext();
  const [modal, setModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataRecords, setDataRecords] = useState([]);
  // console.log("re-render crud", accounts);

  useEffect(() => {
    setDataRecords((e) => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return accounts.slice(firstPageIndex, lastPageIndex);
    });
  }, [accounts, currentPage]);

  function deleteCate(e, id) {
    e.preventDefault();
    console.log(id);
    handleDelete(id);
  }
  function handleDelete(commentId) {
    return axios
      .delete(API, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: `category`,
          commentid: commentId,
        },
      })
      .then((res) => {
        // setNewRecord(res.data.response);
        // removeCategory(commentId);
      })
      .catch((error) => console.log(error.message));
  }
  return (
    <div className="categoryCRUD__root">
      <button className="btn-rounded-green" onClick={() => setModal(!modal)}>
        Register New Account
      </button>
      {modal && (
        <div style={{ height: "0px" }}>
          <ModalAddFormAccount setModal={setModal} modal={modal} />
        </div>
      )}

      <div className="table__container">
        <table className="table table-style">
          <thead>
            <tr>
              <th scope="col" style={{ textAlign: "center", width: "5%" }}>
                ID
              </th>
              <th scope="col" style={{ textAlign: "center", width: "10%" }}>
                User Name
              </th>
              <th scope="col" style={{ textAlign: "center", width: "10%" }}>
                Email
              </th>
              <th scope="col" style={{ textAlign: "center", width: "10%" }}>
                Register date
              </th>
              <th scope="col" style={{ textAlign: "center", width: "10%" }}>
                Role
              </th>
              <th scope="col" style={{ textAlign: "center", width: "10%" }}>
                <SearchCategory
                  accounts={accounts}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  setFilteredResults={setFilteredResults}
                  currentTableData={accounts}
                  filteredResults={filteredResults}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {searchInput !== ""
              ? filteredResults.map((accounts, index) => (
                  <AccountData
                    key={index}
                    data={accounts}
                    index={index}
                    deleteCate={deleteCate}
                  />
                ))
              : dataRecords.map((accounts, index) => (
                  <AccountData
                    key={index}
                    data={accounts}
                    index={index}
                    deleteCate={deleteCate}
                  />
                ))}
            {!accounts?.length && (
              <tr>
                <td>
                  <h2>No Account</h2>
                </td>
                <td>
                  <h2>Empty data</h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={accounts.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

function ModalAddFormAccount({ setModal, modal }) {
  const { roles } = useAdminContext();
  const [accAdd, setaccAdd] = useState({
    username: "",
    email: "",
    profileImage:
      "https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300",
    password: "",
    repassword: "",
    role: roles[0]._id,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [API] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.CLOUD_API_ADMIN, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_ADMIN, mainAPI.CLOUD_HOST];

  async function HandleNameInput(e) {
    setaccAdd({ ...accAdd, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      Object.entries(accAdd).forEach(([key, value]) => {
        const validator = new useValidate(value);
        if (key === "username") validator.isEmpty();
        else if (key === "email") validator.isEmpty().isEmail();
        else if (key === "password") validator.isEmpty();
        else if (key === "repassword") validator.isEmpty();
      });
    } catch (error) {
      setError(error.message);
    }
  }
  function CreateAccount() {
    return axios
      .post(API, accAdd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "category",
        },
      })
      .then((res) => {
        // getNewCategory(res.data.response);
        setModal(false);
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <div className="c-modal__container">
      <form>
        <div className="form-container">
          <div className="question-container">
            <label className="question-label">User Name</label>
            <input
              className="row-input"
              type="text"
              name="username"
              onChange={HandleNameInput}
              value={accAdd.username}
            />
            <label className="question-label">Email</label>
            <input
              className="row-input"
              type="text"
              name="email"
              onChange={HandleNameInput}
              value={accAdd.email}
            />
            <label className="question-label">Password</label>
            <input
              className="row-input"
              type="password"
              name="password"
              onChange={HandleNameInput}
              value={accAdd.password}
            />
            <label className="question-label">Confirm Password</label>
            <input
              className="row-input"
              type="password"
              name="repassword"
              onChange={HandleNameInput}
              value={accAdd.repassword}
            />
            <label className="question-label">Select Role</label>
            <select
              className="row-input"
              type="select"
              name="role"
              onChange={HandleNameInput}
              value={accAdd.role}
            >
              {roles.map((role) => (
                <option value={role._id}>{role.roleName}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-container">
          <div className="question-container">
            <button
              type="submit"
              className="submit_category"
              onClick={onSubmit}
            >
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
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
function AccountData({ data, deleteCate, index }) {
  return (
    <tr key={index}>
      <td style={{ textAlign: "center", width: "5%" }}>{index + 1}</td>
      <td style={{ textAlign: "center", width: "10%" }}>{data.username}</td>
      <td style={{ textAlign: "center", width: "10%" }}>{data.email}</td>
      <td style={{ textAlign: "center", width: "10%" }}>
        {new Date(data.createdAt).toLocaleString("en-uk", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </td>
      <td style={{ textAlign: "center", width: "10%" }}>
        {data.role.roleName}
      </td>
      <td
        style={{
          textAlign: "center",
          whiteSpace: "nowrap",
          width: "10%",
        }}
      >
        <button onClick={(e) => {}} className="btn-blue">
          {data._id === "" ? <span></span> : <span>Detail</span>}
        </button>
        <button onClick={(e) => {}} className="btn-warning">
          {data._id === "" ? <span></span> : <span>Edit</span>}
        </button>
        <button onClick={(e) => deleteCate(e, data._id)} className="btn-red">
          {data._id === "" ? <span></span> : <span>Delete</span>}
        </button>
      </td>
    </tr>
  );
}
function SearchCategory({
  accounts,
  currentTableData,
  searchInput,
  setSearchInput,
  setFilteredResults,
}) {
  const searchFunction = useRef(setFilteredResults);
  useEffect(() => {
    searchFunction.current = setFilteredResults;
  }, [setFilteredResults]);
  async function inputHandler(e) {
    setSearchInput(e.target.value);
    HandleSearchItems();
  }
  const HandleSearchItems = () => {
    if (searchInput !== "") {
      const filteredData = currentTableData.filter((item) => {
        return (
          item.username.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.email.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.createdAt.includes(searchInput) ||
          item.role.roleName.toLowerCase().includes(searchInput.toLowerCase())
        );
      });
      searchFunction.current(filteredData);
      // console.log(filteredResults, "Filer");
    } else {
      searchFunction.current(accounts);
      // console.log(accounts, "Cate");
    }
  };

  return (
    <input
      className="search-textbox"
      type="text"
      value={searchInput}
      placeholder="Search..."
      onChange={inputHandler}
    />
  );
}
