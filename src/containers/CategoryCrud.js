import React, { useState, useRef, useEffect, useMemo } from "react";

import Pagination from "./Pagination";
import { usePostContext } from "../redux";
import axios from "axios";
import { mainAPI } from "../config";
import { AddFromWorkspace } from ".";

let PageSize = 3;

export default function Crud() {
  const { categories: categotyAPIData } = usePostContext();
  const [categories, setCategories] = useState(categotyAPIData);
  const [modal, setModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // const createRef = useRef(function () {
  //   let response = { _id: Math.random(), name: "" };
  // });
  // const removeRef = useRef(function () {});

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return categories.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  function deleteCate(e, id) {
    e.preventDefault();
    console.log(id);
    // HandleDelete(id);
  }
  function HandleDelete(_id) {
    return axios.delete(mainAPI.CLOUD_API_MANAGER, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        view: `category/${_id}`,
      },
    });
    // .then((res) => {
    //   setNewRecord(res.data.response);
    // })
    // .catch((error) => console.log(error.message));
  }

  return (
    <div>
      <h1>Category Crud</h1>
      <button className="btn-rounded-green" onClick={() => setModal(!modal)}>
        Create New Category
      </button>
      {modal && (
        <div
        // style={{ height: "0px" }}
        >
          <ModalAddFormCategory
            data={categories}
            setModal={setModal}
            modal={modal}
          />
        </div>
      )}

      <button className="btn-rounded-green" onClick={() => setModal(!modal)}>
        Create New Category
      </button>
      {modal && (
        <div
        // style={{ height: "0px" }}
        >
          <AddFromWorkspace setModal={setModal} modal={modal} />
        </div>
      )}
      {/* <AnimateComponent Class="btn-rounded-green" name="Create New Category">
          <ModalAddFormCategory />
        </AnimateComponent> */}
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
              <SearchCategory
                categories={categories}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                setFilteredResults={setFilteredResults}
                currentTableData={categories}
                filteredResults={filteredResults}
              />
            </tr>
          </thead>
          <tbody>
            {searchInput !== ""
              ? filteredResults.map((category, index) => (
                  <CategoryData
                    data={category}
                    index={index}
                    deleteCate={deleteCate}
                  />
                ))
              : currentTableData.map((category, index) => (
                  <CategoryData
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
    </div>
  );
}

function ModalAddFormCategory({ setModal, modal }) {
  const [categoryAdd, setCategoryAdd] = useState({
    name: "",
  });
  const [newRecord, setNewRecord] = useState(null);

  const searchFunction = useRef(setCategoryAdd);
  useEffect(() => {
    searchFunction.current = setCategoryAdd;
  }, [setCategoryAdd]);
  useEffect(() => {
    console.log(newRecord);
  }, [newRecord]);

  async function HandleNameInput(e) {
    setCategoryAdd({ ...categoryAdd, [e.target.name]: e.target.value });
  }
  // console.log(categoryAdd, "input");

  async function onSubmit(e) {
    e.preventDefault();

    //ramdon ID
    // var newId = "xxxx-4xx-yxx-xxx".replace(/[xy]/g, function (c) {
    //   var r = (Math.random() * 16) | 0,
    //     v = c === "x" ? r : (r & 0x3) | 0x8;
    //   return v.toString(16);
    // });
    // const data = {
    //   _id: newId,
    //   name: categoryAdd.name,
    // };
    // console.log(data, "Submit");
    // Instead of using the real-time response
    // Using static response data
    // let res = { data: { response: { _id: Math.random() + 1, name: "" } } };
    // setNewRecord(res.data.response);
    CreateCategory();
  }
  function CreateCategory() {
    return axios
      .post(mainAPI.CLOUD_API_MANAGER, categoryAdd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "category",
        },
      })
      .then((res) => {
        console.log(res);
        setNewRecord(res.data.response);
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
              name="name"
              onChange={HandleNameInput}
              value={categoryAdd.name}
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
    <tr key={data._id}>
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
    <>
      <input
        className="search-textbox"
        type="text"
        value={searchInput}
        placeholder="Search..."
        onChange={inputHandler}
      />
    </>
  );
}
