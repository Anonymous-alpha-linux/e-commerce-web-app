import React, { useState, useRef, useEffect } from "react";

import Pagination from "./Pagination";
import { usePostContext } from "../redux";
import axios from "axios";
import { mainAPI } from "../config";

export default function AccountCrud() {
  const [API] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_MANAGER, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_MANAGER, mainAPI.CLOUD_HOST];
  let PageSize = 8;
  const { accounts } = usePostContext();
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
        Create New Category
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
              <th scope="col" style={{ textAlign: "center", width: "40%" }}>
                ID
              </th>
              <th scope="col" style={{ textAlign: "center", width: "40%" }}>
                Title
              </th>
              <th>
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
  const [accAdd, setaccAdd] = useState({
    // categoryName: "",
  });
  const [API] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_MANAGER, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_MANAGER, mainAPI.CLOUD_HOST];
  //   const { getNewCategory } = usePostContext();
  //   const getNewCategoryRef = useRef(getNewCategory);
  //   useEffect(() => {
  //     getNewCategoryRef.current = getNewCategory;
  //   }, [getNewCategory]);

  async function HandleNameInput(e) {
    setaccAdd({ ...accAdd, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    // CreateAccount();
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
            <label className="question-label">Category Name</label>
            <input
              className="row-input"
              type="text"
              name="categoryName"
              onChange={HandleNameInput}
              value={accAdd.categoryName}
            />
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
      </form>
    </div>
  );
}
function AccountData({ data, deleteCate, index }) {
  return (
    <tr key={index}>
      <td style={{ textAlign: "center", width: "40%" }}>
        {index + 1}
        {/* {parseInt(data._id, 8)} */}
        {/* {data._id} */}
      </td>
      <td style={{ textAlign: "center", width: "40%" }}>{data.name}</td>
      <td
        style={{
          textAlign: "center",
          whiteSpace: "nowrap",
          width: "120px",
        }}
      >
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
          // item.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
          item.name.toLowerCase().includes(searchInput.toLowerCase())
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
