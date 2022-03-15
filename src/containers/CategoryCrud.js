import React, { useState, useRef, useEffect, useMemo } from "react";

import Pagination from "./Pagination";
import { usePostContext, useWorkspaceContext } from "../redux";
import axios from "axios";
import { mainAPI } from "../config";
import { AddFromWorkspace } from ".";

export default function Crud() {
  const [API, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_MANAGER, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_MANAGER, mainAPI.CLOUD_HOST];
  let PageSize = 8;
  const { categories, removeCategory } = usePostContext();
  const [modal, setModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

<<<<<<< HEAD
=======
  // const createRef = useRef(function () {
  //   let response = { _id: Math.random(), name: "" };
  // });
  // const removeRef = useRef(function () {});

>>>>>>> c176be26a1d87167f63f4c10fffc944f887c88bf
  //Testing WS
  const { workspaces } = useWorkspaceContext();
  console.log(workspaces, "WS");

  const [modalWS, setModalWS] = useState(false);

  const [dataRecords, setDataRecords] = useState([]);
  // console.log("re-render crud", categories);

  useEffect(() => {
    setDataRecords((e) => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return categories.slice(firstPageIndex, lastPageIndex);
    });
  }, [categories, currentPage]);

  function deleteCate(e, id) {
    e.preventDefault();
    console.log(id);
    HandleDelete(id);
  }
  function HandleDelete(commentId) {
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
        removeCategory(commentId);
      })
      .catch((error) => console.log(error.message));
  }
  return (
    <div>
      <h1>Category Crud</h1>
      <button className="btn-rounded-green" onClick={() => setModal(!modal)}>
        Create New Category
      </button>
      {modal && (
        <div style={{ height: "0px" }}>
          <ModalAddFormCategory setModal={setModal} modal={modal} />
        </div>
      )}

      {/* test add workspace */}
      <button
        className="btn-rounded-green"
        onClick={() => setModalWS(!modalWS)}
      >
        Add WS
      </button>
      {modalWS && (
        <div style={{ hight: "0px" }}>
          <AddFromWorkspace setModal={setModalWS} modal={modalWS} />
        </div>
      )}
      <div
        style={{
          marginTop: "100px",
        }}
      >
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
                  categories={categories}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  setFilteredResults={setFilteredResults}
                  currentTableData={categories}
                  filteredResults={filteredResults}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {searchInput !== ""
              ? filteredResults.map((category, index) => (
                  <CategoryData
                    key={index}
                    data={category}
                    index={index}
                    deleteCate={deleteCate}
                  />
                ))
              : dataRecords.map((category, index) => (
                  <CategoryData
                    key={index}
                    data={category}
                    index={index}
                    deleteCate={deleteCate}
                  />
                ))}
            {categories && !categories.length && (
              <tr>
                <td>
                  <h2>No Coategry</h2>
                </td>
                <td>
                  <h2>Empty</h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {searchInput === "" && (
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={categories.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
      <div className="c-modal__container">
        {workspaces &&
          workspaces.map((ws, index) => (
            <div key={index}>
              <h6>{index + 1}</h6>
              <h4>ID: {ws._id}</h4>
              <h4>Title {ws.workTitle}</h4>
              <p>EX: {ws.expireTime}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

function ModalAddFormCategory({ setModal, modal }) {
  const [categoryAdd, setCategoryAdd] = useState({
    categoryName: "",
  });
  const [API, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_MANAGER, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_MANAGER, mainAPI.CLOUD_HOST];
  const { getNewCategory } = usePostContext();
  const getNewCategoryRef = useRef(getNewCategory);
  useEffect(() => {
    getNewCategoryRef.current = getNewCategory;
  }, [getNewCategory]);

  async function HandleNameInput(e) {
    setCategoryAdd({ ...categoryAdd, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    CreateCategory();
  }
  function CreateCategory() {
    return axios
      .post(API, categoryAdd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "category",
        },
      })
      .then((res) => {
        getNewCategory(res.data.response);
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
              value={categoryAdd.categoryName}
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

function CategoryData({ data, deleteCate, index }) {
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
  categories,
  currentTableData,
  searchInput,
  setSearchInput,
  filteredResults,
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
      searchFunction.current(categories);
      // console.log(categories, "Cate");
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
