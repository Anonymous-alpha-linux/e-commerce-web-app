import React, { useState, useRef, useEffect } from "react";

import Pagination from "./Pagination";
import { useAdminContext } from "../redux";
import axios from "axios";
import { mainAPI } from "../config";
import { Icon } from "../components";
import { FaDownload } from "react-icons/fa";

export default function AttachmentCrub() {
  return <></>;
}

const ProfilePoster = ({ pic }) => {
  return (
    <label className="custom-file-upload fas">
      <div className="img-wrap">
        <img src={pic} />
      </div>
    </label>
  );
};
