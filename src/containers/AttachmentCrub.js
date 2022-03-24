import React, { useState, useRef, useEffect } from "react";

import Pagination from "./Pagination";
import { useAdminContext } from "../redux";
import axios from "axios";
import { mainAPI } from "../config";
import { Icon, Text } from "../components";
import { Loader } from "../containers";
import { FaDownload } from "react-icons/fa";
import { useModal, usePagination2 } from "../hooks";
import { SecondPagination } from ".";
import Modal from "./modal";
export default function AttachmentCrub() {
  const [API, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_MANAGER, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_MANAGER, mainAPI.CLOUD_HOST];

  const { attachments, getAttachmentByPage, deleteSingleAttachment } = useAdminContext();
  const getAttachmentByPageRef = useRef(getAttachmentByPage);
  const [searchInput, setSearchInput] = useState("");

  const [filteredResults, setFilteredResults] = useState([]);
  const [dataRecords, setDataRecords] = useState([]);

  const [currentPage, changeCurrentPage] = usePagination2(0);
  useEffect(() => {
    if (!attachments.loading) {
      // setDataRecords(attachments.data.find((item) => item.page === currentPage).records);
      setDataRecords(attachments.data);
    }
  }, [attachments.data]);
  useEffect(() => {

  }, [currentPage]);

  useEffect(() => {
    getAttachmentByPageRef.current = getAttachmentByPage;
  }, [getAttachmentByPage]);

  function deleteAttachment(attachmentId) {
    deleteSingleAttachment(attachmentId, currentPage);
  }
  return (
    <div className="categoryCRUD__root">
      <div className="table__container" style={{ overflowX: 'scroll' }}>
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
                  attachment={attachments.data}
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
            {attachments.loading ? (<tr>
              <td colSpan={6}>
                <Text.Line style={{ position: 'relative' }}>
                  <Loader></Loader>
                </Text.Line>
              </td>
            </tr>) : !attachments.data?.length && (
              <tr>
                <td>
                  <h2>No Category</h2>
                </td>
                <td>
                  <h2>Empty</h2>
                </td>
              </tr>
            ) || searchInput !== ""
              ? filteredResults.map((attachment, index) => {
                return (
                  <AttachmentData
                    key={index}
                    data={attachment}
                    index={index}
                    deleteAttachment={deleteAttachment}
                  />
                )
              })
              : dataRecords.slice(currentPage * attachments.count, (currentPage + 1) * attachments.count).map((attachment, index) => {
                return <AttachmentData
                  key={index}
                  data={attachment}
                  index={index}
                  deleteAttachment={deleteAttachment}
                />;
              })}
          </tbody>
        </table>
      </div>
      <SecondPagination
        page={currentPage}
        firstPage={1}
        lastPage={attachments.pages}
        onChangePage={changeCurrentPage}
        onLoadData={getAttachmentByPageRef.current}
      ></SecondPagination>
      {/* <SecondPagination page={currentPage} pages={attachments.pages} changePage={changeCurrentPage}></SecondPagination> */}
    </div>
  );
}
function AttachmentData({ data, deleteAttachment, index }) {
  const [showModalDetail, toggleModalDetail] = useModal();
  const { downloadSingleAttachment } = useAdminContext();

  return (
    <tr key={index}>
      <td style={{ textAlign: "center", width: "3%" }}>{index + 1}</td>
      <td style={{ textAlign: "center", width: "15%", marginLeft: "5%" }}>
        {data.fileName}
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
          onClick={() => toggleModalDetail()}
          className="btn-blue"
        >
          {data._id === "" ? <span></span> : <span>Detail</span>}
        </button>
        <button
          onClick={() => { downloadSingleAttachment(data._id) }}
          className="btn-green"
        >
          {data._id === "" ? <span></span> : <span>Download</span>}
        </button>
        <button
          onClick={() => deleteAttachment(data._id)}
          className="btn-red"
        >
          {data._id === "" ? <span></span> : <span>Delete</span>}
        </button>
      </td>
      <Modal isShowing={showModalDetail} toggle={toggleModalDetail}>
        <DetailFile
          setModalDetail={toggleModalDetail}
          data={data}
        />
      </Modal>
    </tr>

  );
}
function SearchAttachment({
  attachment,
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
    } else {
      searchFunction.current(attachment);
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
function DetailFile({ setModalDetail, data }) {
  const pic =
    "https://cdn.lifehack.org/wp-content/uploads/2012/12/come-up-with-ideas.jpg";
  return (
    <>
      <div className="Attachment__container ">
        <div className="row" style={{ justifyContent: "right" }}>
          <button
            style={{ textAlign: "left", fontWeight: "bold" }}
            className="btn-trans-Cancel"
            onClick={() => setModalDetail()}
          >
            <strong>Exit</strong>
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
                <h4>Post Title:</h4>
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
function ProfilePoster({ pic }) {
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
