import React, { useState, useRef, useEffect } from "react";

import Pagination from "./Pagination";
import { useAdminContext } from "../redux";
import { mainAPI } from "../config";
import useValidate from "../hooks/useValidate";
import { Icon, Text } from "../components";
import { Loader } from '../containers';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { roles, toastTypes } from "../fixtures";
import { Toast } from ".";
import { useModal } from "../hooks";
import Modal from "./modal";

export default function AccountCrud() {
  const [API] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_ADMIN, mainAPI.LOCALHOST_HOST]
      : [mainAPI.LOCALHOST_ADMIN, mainAPI.CLOUD_HOST];
  let PageSize = 8;
  const { accounts: { data, loading } } = useAdminContext();
  // console.log(accounts);
  const [modal, setModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataRecords, setDataRecords] = useState([]);

  useEffect(() => {
    setDataRecords((e) => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return data.slice(firstPageIndex, lastPageIndex);
    });
  }, [data, currentPage]);
  return (
    <div className="categoryCRUD__root">
      <button className="btn-rounded-green" onClick={() => setModal(!modal)}>
        Register New Account
      </button>
      {modal && (
        <div className="MadalBackDrop">
          <div className="MobalCenter">
            <ModalAddFormAccount setModal={setModal} modal={modal} />
          </div>
        </div>
      )}

      <div className="table__container" style={{ overflowX: 'scroll', boxShadow: '-1px 1px #000,-1px 1px #000', padding: '10px 0' }}>
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
                <SearchAccount
                  accounts={data}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  setFilteredResults={setFilteredResults}
                  currentTableData={data}
                  filteredResults={filteredResults}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (<tr>
              <td colSpan={6}>
                <Text.Line style={{ position: 'relative' }}>
                  <Loader></Loader>
                </Text.Line>
              </td>
            </tr>) : searchInput !== ""
              ? filteredResults.map((accounts, index) => (
                <AccountData key={index} data={accounts} index={index} />
              ))
              : dataRecords.map((accounts, index) => (
                <AccountData key={index} data={accounts} index={index} />
              ))}
            {!data?.length && (
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
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

function AccFromEdit({ modalEdit, setModalEdit, data }) {
  const {
    roles: ROLES,
    editUsername,
    editEmail,
    editPassword,
    editRole,
  } = useAdminContext();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    username: data.username,
    email: data.email,
    password: data.password,
    newpassword: "",
    role: data.role._id,
  });
  // const [API] =
  //   process.env.REACT_APP_ENVIRONMENT === "development"
  // ? [mainAPI.CLOUD_API_ADMIN, mainAPI.LOCALHOST_HOST]
  //     : [mainAPI.CLOUD_API_ADMIN, mainAPI.CLOUD_HOST];
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };
  const [confirmShown, setConfirmShown] = useState(false);
  const toggleConfirm = (e) => {
    e.preventDefault();
    setConfirmShown(!confirmShown);
  };

  const IconTaggle = ({ Action, Condition }) => {
    return (
      <>
        <Icon style={{ marginTop: "4.5rem" }} onClick={Action}>
          {!Condition ? (
            <AiFillEyeInvisible size={20} />
          ) : (
            <AiFillEye size={20} />
          )}
        </Icon>
      </>
    );
  };

  async function handleNameInput(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function onSubmitName(e) {
    e.preventDefault();
    editUsername(input.username, data._id, ({ message, error }) => {
      if (error) setError(error);
      else setMessage(message);
    });
  }
  async function onSubmitEmail(e) {
    e.preventDefault();
    editEmail(input.email, data._id, ({ message, error }) => {
      if (error) setError(error);
      else setMessage(message);
    });
  }
  async function onSubmitRole(e) {
    e.preventDefault();
    editRole(input.role, data._id, ({ message, error }) => {
      if (error) setError(error);
      else setMessage(message);
    });
  }

  async function onSubmitPassword(e) {
    e.preventDefault();
    try {
      if (input.password !== input["newpassword"])
        throw new Error("Your confirm password is incorrectly");
      editPassword(input.password, data._id);
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(!error), 3000);
    }
  }
  return (
    <>
      <div className="c-modal__containerAccount">
        <div className="form-container">
          <div className="question-container">
            <div className="row" style={{ textAlign: "left" }}>
              <div className="col-1">
                <form>
                  <h4 className="question-label">User Name</h4>
                  <input
                    style={{ width: "100%", maxWidth: "160px" }}
                    className="row-input"
                    type="text"
                    name="username"
                    placeholder="New user name"
                    onChange={handleNameInput}
                    value={input.username}
                  />
                  <button
                    type="submit"
                    className="submit_edit"
                    onClick={onSubmitName}
                  >
                    Edit name
                  </button>
                </form>
              </div>
              <div className="col-1">
                <form>
                  <h4 className="question-label">Email</h4>
                  <input
                    className="row-input"
                    style={{ width: "100%", maxWidth: "140px" }}
                    type="text"
                    placeholder="New Email"
                    name="email"
                    onChange={handleNameInput}
                    value={input.email}
                  />
                  <button
                    type="submit"
                    className="submit_edit"
                    onClick={onSubmitEmail}
                  >
                    Edit email
                  </button>
                </form>
              </div>
            </div>
            <form>
              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-2">
                  <label className="question-label">New Password</label>
                  <input
                    className="row-input"
                    type={!passwordShown ? "password" : "text"}
                    placeholder="new Password"
                    name="password"
                    onChange={handleNameInput}
                    value={input.password}
                    autoComplete="new-password"
                  />
                  <button
                    style={{
                      width: "100px",
                    }}
                    type="submit"
                    className="submit_edit"
                    onClick={onSubmitPassword}
                  >
                    Edit pass
                  </button>
                </div>
                <div className="col-iconPass">
                  <IconTaggle
                    Action={togglePassword}
                    Condition={passwordShown}
                  />
                </div>
                <div className="col-2">
                  <label className="question-label">Confirm</label>
                  <input
                    className="row-input"
                    type={!confirmShown ? "password" : "text"}
                    placeholder="New Pass Again"
                    name="newpassword"
                    onChange={handleNameInput}
                    value={input.newpassword}
                  />
                </div>
                <div className="col-iconPass">
                  <IconTaggle Action={toggleConfirm} Condition={confirmShown} />
                </div>
              </div>
              {error && (
                <p
                  style={{
                    color: "red",
                    fontWeight: "900",
                  }}
                >
                  {error}
                </p>
              )}
            </form>
            <form>
              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-1">
                  <label className="question-label">Select Role</label>
                  <select
                    style={{ width: "100%", maxWidth: "200px" }}
                    className="row-input"
                    type="select"
                    name="role"
                    onChange={handleNameInput}
                    defaultValue={input.role}
                  >
                    {ROLES.filter(
                      (role) => ![roles.ADMIN].includes(role.roleName)
                    ).map((role) => (
                      <option key={role._id} value={role._id}>
                        {role.roleName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-2">
                  <button
                    style={{
                      width: "100px",
                      marginTop: "60px",
                    }}
                    type="submit"
                    className="submit_edit"
                    onClick={onSubmitRole}
                  >
                    Edit role
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row" style={{ justifyContent: "right" }}>
          <button
            style={{ textAlign: "left", fontWeight: "bold" }}
            className="btn-trans-Cancel"
            onClick={() => setModalEdit(!modalEdit)}
          >
            <stong>Exit</stong>
          </button>
        </div>
      </div>
      {(error || message) && (
        <Toast
          error={error}
          message={message}
          setError={setError}
          setMessage={setMessage}
          timeout={3000}
        ></Toast>
      )}
    </>
  );
}

function ModalAddFormAccount({ setModal, modal }) {
  const { roles, createNewAccount } = useAdminContext();

  const [accAdd, setaccAdd] = useState({
    username: "",
    email: "",
    profileImage:
      "https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300",
    password: "",
    repassword: "",
    role: roles[0]._id,
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };
  const [confirmShown, setConfirmShown] = useState(false);
  const toggleConfirm = (e) => {
    e.preventDefault();
    setConfirmShown(!confirmShown);
  };

  const IconTaggle = ({ Action, Condition }) => {
    return (
      <>
        <Icon style={{ marginTop: "4.5rem" }} onClick={Action}>
          {!Condition ? (
            <AiFillEyeInvisible size={20} />
          ) : (
            <AiFillEye size={20} />
          )}
        </Icon>
      </>
    );
  };

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function handleNameInput(e) {
    setaccAdd({ ...accAdd, [e.target.name]: e.target.value }, [setaccAdd]);
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
      if (accAdd.role == null) throw new Error("Select Assign Role");
      if (accAdd.password !== accAdd.repassword)
        throw new Error("Your confirm password is incorrectly");
    } catch (error) {
      setError(error.message);
    }
    createAccount();
    setModal(!modal);
  }
  function createAccount() {
    return createNewAccount(
      accAdd.username,
      accAdd.email,
      accAdd.password,
      accAdd.role
    );
  }

  return (
    <>
      <div className="c-modal__containerAccount">
        <form>
          <div className="form-container">
            <div className="question-container">
              <div className="row">
                <div className="col-2">
                  <label className="question-label">User Name</label>
                  <input
                    className="row-input"
                    type="text"
                    name="username"
                    placeholder="New user name"
                    onChange={handleNameInput}
                    value={accAdd.username}
                  />
                </div>
                <div className="col-2">
                  <label className="question-label">Email</label>
                  <input
                    className="row-input"
                    type="text"
                    placeholder="New Email"
                    name="email"
                    onChange={handleNameInput}
                    value={accAdd.email}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <label className="question-label">Password</label>
                  <input
                    className="row-input"
                    type={!passwordShown ? "password" : "text"}
                    placeholder="Password"
                    name="password"
                    onChange={handleNameInput}
                    value={accAdd.password}
                    autocomplete="new-password"
                  />
                </div>
                <div className="col-iconPass">
                  <IconTaggle
                    Action={togglePassword}
                    Condition={passwordShown}
                  />
                </div>
                <div className="col-2">
                  <label className="question-label">Confirm</label>
                  <input
                    className="row-input"
                    type={!confirmShown ? "password" : "text"}
                    placeholder="Pass Again"
                    name="repassword"
                    onChange={handleNameInput}
                    value={accAdd.repassword}
                  />
                </div>
                <div className="col-iconPass">
                  <IconTaggle Action={toggleConfirm} Condition={confirmShown} />
                </div>
              </div>
              <div className="row">
                <div className="col-1">
                  <label className="question-label">Select Role</label>
                  <select
                    style={{ width: "100%", maxWidth: "200px" }}
                    className="row-input"
                    type="select"
                    name="role"
                    onChange={handleNameInput}
                    value={accAdd.role}
                  >
                    <option value={roles._id}>Empty</option>
                    {roles.map(
                      (role) =>
                        role.roleName !== "admin" && (
                          <option key={role._id} value={role._id}>
                            {role.roleName}
                          </option>
                        )
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="form-container">
            <div className="question-container">
              <button
                type="submit"
                className="submit_Register "
                onClick={onSubmit}
              >
                Register
              </button>
              <button
                className="btn-trans-Cancel"
                onClick={() => setModal(!modal)}
              >
                Close
              </button>
            </div>
          </div>
          {error && (
            <p
              style={{
                color: "red",
                fontWeight: "900",
              }}
            >
              {error}
            </p>
          )}
        </form>
      </div>
      {(error || message) && (
        <Toast
          error={error}
          message={message}
          setError={setError}
          setMessage={setMessage}
          timeout={3000}
        ></Toast>
      )}
    </>
  );
}
function AccountData({ data, index }) {
  const [modalEdit, setModalEdit] = useState(false);
  const [block, setBlockacc] = useState(false);
  const [showModalDetail, toggleModalDetail] = useModal(false);

  function blockAccount(e, id) {
    e.preventDefault();
    console.log(id);
    // setBlockacc(!block);
  }
  return (
    <tr key={index}>
      <td style={{ textAlign: "center", width: "5%" }}>{index + 1}</td>
      <td style={{ textAlign: "center", width: "10%", marginLeft: "5%" }}>
        {data.username}
      </td>
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
        <button
          onClick={toggleModalDetail}
          className="btn-blue"
        >
          {data._id === "" ? <span></span> : <span>Detail</span>}
        </button>

        <Modal isShowing={showModalDetail} toggle={toggleModalDetail}>
          <DetailAcc
            setModalDetail={toggleModalDetail}
            data={data}
          />
        </Modal>

        <button
          onClick={() => setModalEdit(!modalEdit)}
          className="btn-warning"
        >
          {data._id === "" ? <span></span> : <span>Edit</span>}
        </button>
        {modalEdit && (
          <div className="MadalBackDrop">
            <div className="MobalCenter">
              <AccFromEdit
                setModalEdit={setModalEdit}
                modalEdit={modalEdit}
                data={data}
              />
            </div>
          </div>
        )}
        <button
          onClick={(e) => blockAccount(e, data._id)}
          className={block ? "btn-gray" : "btn-red"}
        >
          {block ? <span>Unblock</span> : <span>Block</span>}
        </button>
      </td>
    </tr>
  );
}
function SearchAccount({
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

function DetailAcc({ setModalDetail, data }) {
  // console.log(data);
  const pic =
    "https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300";
  return (
    <div className="c-modal__containerAccount">
      <form>
        <div className="form-container">
          <div className="question-container">
            <ProfilePoster pic={pic} />
            <div
              className="row"
              style={{
                textAlign: "left",
              }}
            >
              <div className="col-2">
                <strong
                  style={{
                    color: "#40916C",
                    fontSize: "18px",
                  }}
                >
                  Name:{" "}
                </strong>
                {data.username}
              </div>
              <div className="col-2">
                <strong
                  style={{
                    color: "#40916C",
                    fontSize: "18px",
                  }}
                >
                  Job:{" "}
                </strong>
                {data.role.roleName}
              </div>
            </div>
            <div className="row">
              <div className="col-1">
                <strong
                  style={{
                    color: "#40916C",
                    fontSize: "18px",
                  }}
                >
                  Email:{" "}
                </strong>
                {data.email}
              </div>
            </div>
            <div className="row">
              <div className="col-1">
                <strong
                  style={{
                    color: "#40916C",
                    fontSize: "15px",
                  }}
                >
                  Register Date:{" "}
                </strong>
                {new Date(data.createdAt).toLocaleString("en-uk", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="form-container">
          <div className="question-container">
            <button
              className="btn-trans-Cancel"
              onClick={() => setModalDetail()}
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
const ProfilePoster = ({ pic }) => {
  return (
    <label className="custom-file-upload">
      <div className="img-Account">
        <img src={pic} />
      </div>
    </label>
  );
};
