import React, { useState, useRef, useEffect, useMemo } from "react";
import "../containers/styles/_crub.scss";
// import { AnimateComponent } from "../hooks";
import Pagination from "./Pagination";
import { usePostContext } from "../redux";
import axios from "axios";

let Category = [
  {
    id: 1,
    name: "Business",
  },
  {
    id: 2,
    name: "Art",
  },
  {
    id: 3,
    name: "IT",
  },
  {
    id: 4,
    name: "English",
  },
  {
    id: 5,
    name: "Game",
  },
  {
    id: 6,
    name: "Guu",
  },
  {
    id: 7,
    name: "Team",
  },
  {
    id: 8,
    name: "Idol",
  },
  {
    id: 9,
    name: "Reading",
  },
  {
    id: 10,
    name: "Photo",
  },
];

let PageSize = 5;

function ModalAddFormCategory({ setModal, modal }) {
  const [categoryAdd, setCategoryAdd] = useState({
    name: "",
  });

  const searchFunction = useRef(setCategoryAdd);
  useEffect(() => {
    searchFunction.current = setCategoryAdd;
  }, [setCategoryAdd]);

  async function HandleNameInput(e) {
    setCategoryAdd({ ...categoryAdd, [e.target.name]: e.target.value });
  }
  console.log(categoryAdd, "input");

  function onSubmit(e) {
    e.preventDefault();
    //ramdon ID
    var newId = "xxxx-4xx-yxx-xxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

    const data = {
      id: newId,
      name: categoryAdd.name,
    };
    console.log(data, "Submit");

    axios({
      method: "post",
      url: "",
      data: data,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error, "Get Error"));
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

function CategoryData({ data, deleteCate }) {
  return (
    <tr key={data.id}>
      <td style={{ textAlign: "center", width: "40%" }}>
        {parseInt(data.id, 16)}
      </td>
      <td style={{ textAlign: "center", width: "40%" }}>{data.name}</td>
      <td
        style={{
          textAlign: "center",
          whiteSpace: "nowrap",
          width: "120px",
        }}
      >
        <button onClick={() => deleteCate()} className="btn-red">
          {data.isDeleting ? <span></span> : <span>Delete</span>}
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
    await setSearchInput(e.target.value);
    HandleSearchItems();
  }
  const HandleSearchItems = () => {
    if (searchInput !== "") {
      const filteredData = currentTableData.filter((item) => {
        return (
          item.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
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

function Crud() {
  const [categories, setCategories] = useState(Category);
  // const state = usePostContext();
  // console.log(state);
  const [modal, setModal] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return Category.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  useEffect(() => {
    const fetchCategory = async () => {
      const { data } = await axios.get(``);

      setCategories(data);
    };

    fetchCategory();
  }, []);

  function deleteCate() {
    axios({
      method: "delete",
      url: "",
      data: categories.id,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error, "Get Error"));
  }

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
          }}
        >
          <ModalAddFormCategory
            data={categories}
            setModal={setModal}
            modal={modal}
          />
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
                currentTableData={currentTableData}
                filteredResults={filteredResults}
              />
            </tr>
          </thead>
          <tbody>
            {searchInput !== ""
              ? filteredResults.map((category) => (
                  <CategoryData data={category} deleteCate={deleteCate} />
                ))
              : currentTableData.map((category) => (
                  <CategoryData data={category} deleteCate={deleteCate} />
                ))}
            {categories && !categories.length && (
              <tr>
                <td>
                  <div>Coategry Emty</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {searchInput === "" && (
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={Category.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
}

export default Crud;
