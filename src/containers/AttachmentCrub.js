import React, { useState, useRef, useEffect } from "react";

import Pagination from "./Pagination";
import { usePostContext, useAdminContext } from "../redux";
import axios from "axios";
import { mainAPI } from "../config";
import { Icon, Loader } from "../components";
import { FaDownload } from "react-icons/fa";
import { usePagination2 } from "../hooks";
import { SecondPagination } from ".";

export default function AttachmentCrub() {
  const [API, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_MANAGER, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_MANAGER, mainAPI.CLOUD_HOST];

  const { attachments, getAttachmentByPage } = useAdminContext();
  const getAttachmentByPageRef = useRef(getAttachmentByPage);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [attachRecord, setAttachRecord] = useState();
  const [dataRecords, setDataRecords] = useState([]);

  const [currentPage, changeCurrentPage] = usePagination2(0);

  // console.log(attachRecord);
  useEffect(() => {
    if (!attachments.loading) {
      setDataRecords(
        attachments.data.find((item) => item.page === currentPage).records
      );
      setAttachRecord(
        attachments.data.find((item) => item.page === currentPage).records
      );
    }
  }, [attachments.data, currentPage, attachRecord]);

  useEffect(() => {
    getAttachmentByPageRef.current = getAttachmentByPage;
  }, [getAttachmentByPage]);

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
                <SearchAttachment
                  Attechment={attachRecord}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  setFilteredResults={setFilteredResults}
                  currentTableData={attachRecord}
                  filteredResults={filteredResults}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {searchInput !== ""
              ? filteredResults.map((attachment, index) => {
                  console.log(attachment);
                  return (
                    <AttachmentData
                      key={index}
                      data={attachment}
                      index={index}
                      deleteAttachment={deleteAttachment}
                    />
                  );
                })
              : dataRecords.map((attachment, index) => {
                  return (
                    <AttachmentData
                      key={index}
                      data={attachment}
                      index={index}
                      deleteAttachment={deleteAttachment}
                    />
                  );
                })}
            {attachments.loading && <Loader></Loader>}
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
          onLoadData={getAttachmentByPageRef.current}
        ></SecondPagination>
      </div>
    </div>
  );
}
function AttachmentData({ data, deleteAttachment, index }) {
  const [modalDetail, setModalDetail] = useState(false);
  const { downloadAttachmentQAM } = useAdminContext();

  function bytesToSize(bytes, seperator = "") {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "n/a";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes}${seperator}${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)}${seperator}${sizes[i]}`;
  }

  async function downloadFile(e, attachmentId) {
    e.preventDefault();
    console.log(attachmentId);
    downloadAttachmentQAM(attachmentId);
  }
  return (
    <tr key={index}>
      <td style={{ textAlign: "center", width: "3%" }}>{index + 1}</td>
      <td style={{ textAlign: "center", width: "15%", marginLeft: "5%" }}>
        {data.fileName.slice(75, data.fileName.length)}
      </td>
      <td style={{ textAlign: "center", width: "5%" }}>{data.fileType}</td>
      <td style={{ textAlign: "center", width: "5%" }}>
        {bytesToSize(data.fileSize)}
      </td>
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
                downloadFile={downloadFile}
                bytesToSize={bytesToSize}
              />
            </div>
          </div>
        )}
        <button
          onClick={(e) => downloadFile(e, data._id)}
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
function SearchAttachment({
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
          item.fileName
            .slice(75, item.fileName.length)
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
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
function DetailFlie({
  modalDetail,
  setModalDetail,
  data,
  downloadFile,
  bytesToSize,
}) {
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
                fontWeight: "bolder",
              }}
            >
              <div className="col-2" style={{ marginRight: "50px" }}>
                <ProfilePoster pic={pic} />
              </div>
              <div className="col-2" style={{ marginRight: "30px" }}>
                {data.fileName.substring(18, 30)}
                <br />
                {data.fileType}
              </div>
              <div className="col-2 " style={{ marginRight: "30px" }}>
                {bytesToSize(data.fileSize)}
              </div>
              <div className="col-2">
                <div style={{ marginTop: "20px", marginLeft: "10px" }}>
                  <Icon>
                    <FaDownload
                      size={45}
                      onMouseOver={({ target }) =>
                        (target.style.color = "#33EFAB")
                      }
                      onMouseOut={({ target }) =>
                        (target.style.color = "black")
                      }
                      onClick={(e) => downloadFile(e, data._id)}
                    />
                  </Icon>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 " style={{ textAlign: "center" }}>
                <FileBoby data={data} />
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
const FileBoby = ({ data }) => {
  const imageRegex = new RegExp("image/*");

  if (imageRegex.test(data.fileType))
    return (
      <div className="Attachment__frame">
        <img className="Attachment__fileItem" src={data.online_url} />
      </div>
    );
  return (
    <>
      <div className="Attachment__frame">
        <div>document</div>
      </div>
    </>
  );
};
