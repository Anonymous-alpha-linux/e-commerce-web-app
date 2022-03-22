import React, { useState, useRef, useEffect } from "react";

import Pagination from "./Pagination";
import { usePostContext, useAdminContext } from "../redux";
import axios from "axios";
import { mainAPI } from "../config";
import { Icon } from "../components";
import { FaDownload } from "react-icons/fa";
import { usePagination2 } from "../hooks";
import { SecondPagination } from ".";

export default function AttachmentCrub() {
  const [API, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_MANAGER, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_MANAGER, mainAPI.CLOUD_HOST];

  const { attachments, getAttachmentByPage } = useAdminContext();
  console.log(attachments);
  const [modal, setModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  // const [dataRecords, setDataRecords] = useState([]);

  const [currentPage, changeCurrentPage] = usePagination2(0);

  // useEffect(() => {
  // if (!attachments.loading) {
  // setDataRecords(
  //   attachments.data.find((item) => item.page === currentPage)?.records
  // );
  // }
  // }, [attachments.data]);

  function deleteAttachment(e, id) {
    e.preventDefault();
    console.log(id);
    // handleDelete(id);
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
      <div className="table__container">
        <table className="table table-style">
          <thead>
            <tr>
              <th scope="col" style={{ textAlign: "center", width: "3%" }}>
                No
              </th>
              <th scope="col" style={{ textAlign: "center", width: "15%" }}>
                File Name
              </th>
              <th scope="col" style={{ textAlign: "center", width: "5%" }}>
                Type
              </th>
              <th scope="col" style={{ textAlign: "center", width: "5%" }}>
                Size
              </th>
              <th scope="col" style={{ textAlign: "center", width: "10%" }}>
                Date
              </th>
              <th scope="col" style={{ textAlign: "center", width: "10%" }}>
                <SearchAttechment
                  Attechment={attachments.data}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  setFilteredResults={setFilteredResults}
                  currentTableData={attachments.data}
                  filteredResults={filteredResults}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {searchInput !== ""
              ? filteredResults.map((attachment, index) => (
                  <AttachmentData
                    key={index}
                    data={attachment}
                    index={index}
                    deleteAttachment={deleteAttachment}
                  />
                ))
              : attachments.data
                  .find((a) => a.page === currentPage)
                  .records.map((attachment, index) => {
                    <AttachmentData
                      key={index}
                      data={attachment}
                      index={index}
                      deleteAttachment={deleteAttachment}
                    />;
                  })}
            {!attachments.data?.length && (
              <tr>
                <td>
                  <h2>No Category</h2>
                </td>
                <td>
                  <h2>Empty</h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <SecondPagination
          page={currentPage}
          firstPage={1}
          lastPage={attachments.pages}
          onChangePage={changeCurrentPage}
          onLoadData={getAttachmentByPage}
        ></SecondPagination>

        {/* <Pagination
          className="pagination-bar"
          currentPage={attachments.currentPage}
          totalCount={attachments.documentCount.lenght}
          pageSize={attachments.count}
          onPageChange={(page) => setCurrentPage(page)}
        /> */}
        {/* {res.data.pages.map((page, index) => (
          <span onClick={() => {}}>{index + 1}</span>
        ))} */}
      </div>
    </div>
  );
}

function AttachmentData({ data, deleteAttachment, index }) {
  const [modalDownload, setModalDownload] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  return (
    <tr key={index}>
      <td style={{ textAlign: "center", width: "3%" }}>{index + 1}</td>
      <td style={{ textAlign: "center", width: "15%", marginLeft: "5%" }}>
        {/* {data.fileName} */}
      </td>
      <td style={{ textAlign: "center", width: "5%" }}>{data.fileType}</td>
      <td style={{ textAlign: "center", width: "5%" }}>{data.fileSize}</td>
      <td style={{ textAlign: "center", width: "10%" }}>
        {new Date(data.createdAt).toLocaleString("en-uk", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </td>
      <td
        style={{
          textAlign: "center",
          whiteSpace: "nowrap",
          width: "10%",
        }}
      >
        <button
          onClick={() => setModalDetail(!modalDetail)}
          className="btn-blue"
        >
          {data._id === "" ? <span></span> : <span>Detail</span>}
        </button>
        {modalDetail && (
          <div className="MadalBackDrop">
            <div className="MobalCenter">
              <DetailFlie
                setModalDetail={setModalDetail}
                modalDetail={modalDetail}
                data={data}
              />
            </div>
          </div>
        )}
        <button
          onClick={() => setModalDownload(!modalDownload)}
          className="btn-green"
        >
          {data._id === "" ? <span></span> : <span>Download</span>}
        </button>
        <button
          onClick={(e) => deleteAttachment(e, data._id)}
          className="btn-red"
        >
          {data._id === "" ? <span></span> : <span>Delete</span>}
        </button>
      </td>
    </tr>
  );
}
function SearchAttechment({
  Attechment,
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
          item.fileName.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.fileSize.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.fileType.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.createdAt.toLowerCase().includes(searchInput.toLowerCase())
        );
      });
      searchFunction.current(filteredData);
      // console.log(filteredResults, "Filer");
    } else {
      searchFunction.current(Attechment);
      // console.log(Attechment, "Cate");
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

function DetailFlie({ modalDetail, setModalDetail, data }) {
  // console.log(data);
  const pic =
    "https://cdn.lifehack.org/wp-content/uploads/2012/12/come-up-with-ideas.jpg";
  return (
    <>
      <div className="Attachment__container ">
        <div className="row" style={{ justifyContent: "right" }}>
          <button
            style={{ textAlign: "left", fontWeight: "bold" }}
            className="btn-trans-Cancel"
            onClick={() => setModalDetail(!modalDetail)}
          >
            <stong>Exit</stong>
          </button>
        </div>
        <div className="form-container">
          <div className="question-container">
            <div
              className="row"
              style={{
                textAlign: "left",
              }}
            >
              <div className="col-0">
                <ProfilePoster pic={pic} />
              </div>
              <div
                className="col-3"
                style={{
                  paddingLeft: "15px",
                  fontSize: "15px",
                }}
              >
                <strong>Name Poster: </strong>
                <br />
                <h4>Post Title </h4>
              </div>
              <div className="col-2 ">
                <strong> </strong>
                <br />
                <h5>Size</h5>
              </div>
              <div className="col-0">
                <div style={{ marginTop: "20px" }}>
                  <Icon>
                    <FaDownload
                      size={35}
                      onMouseOver={({ target }) =>
                        (target.style.color = "#33EFAB")
                      }
                      onMouseOut={({ target }) =>
                        (target.style.color = "black")
                      }
                    />
                  </Icon>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 " style={{ textAlign: "center" }}>
                <FileBoby pic={pic} dat={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const ProfilePoster = ({ pic }) => {
  return (
    <label className="custom-file-upload">
      <div className="img-wrap">
        <img src={pic} />
      </div>
    </label>
  );
};
const FileBoby = ({ pic, data }) => {
  return (
    <>
      <div className="Attachment__frame">
        <img className="Attachment__fileItem" src={pic} />
      </div>
    </>
  );
};
