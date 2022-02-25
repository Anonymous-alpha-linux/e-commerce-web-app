import React, { useState, useEffect, useRef } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";

import {
  ContainerComponent,
  Form,
  Preview,
  Text,
  Icon,
  ButtonComponent,
} from "../components";
import { Loading } from "../pages";

const UploadPreview = ({ files, setFiles, eliminateFile, setError }) => {
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  let image = "https://image.shutterstock.com/image-vector/file-iconvector-illustration-flat-design-260nw-1402633574.jpg";

  const validateFile = (file) => {
    const imageRegex = new RegExp("image/*");
    if (imageRegex.test(file.type))
      return "image";
    return "others";
  }
  const removeItem = (id) => {
    eliminateFile(id);
    preview.filter((file, index) => index !== id);
  };
  const openFiles = () => {
    fileInputRef.current.click();
  }
  const readNewFiles = (e) => {
    console.log(e.target.files);
    return Array.from(e.target.files).map(file => {
      return readFile(file).then(data => setPreview([...preview, data])).catch(error => setError(error.message));
    });
  }
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onabort = () => {
        alert("Failed to read file", fileReader.abort);
        reject("Failed to read file", fileReader.abort);
      }
      fileReader.onerror = () => {
        alert("Failed to read file", fileReader.error);
        reject("Failed to read file", fileReader.abort);
      }
      fileReader.onload = () => {
        resolve(validateFile(file) === 'image' ? fileReader.result : image);
      }
    });
  }
  const readFiles = () => {
    return files.map(file => {
      return readFile(file);
    });
  }

  useEffect(() => {
    Promise.all(readFiles())
      .then(data => {
        setPreview(data);
      })
      .then(s => setLoading(false))
      .catch(error => setError(error.message));
  }, [files]);

  if (loading) return <Loading></Loading>
  return (
    <ContainerComponent.Section className="form-upload__container">
      <Text.Label htmlFor="files">Upload Files:</Text.Label>
      <Text.Line
        style={{
          marginBottom: "10px",
        }}>
        <Text.MiddleLine>
          <Icon style={{
            fontSize: "30px",
          }}>
            <AiOutlineCloudUpload></AiOutlineCloudUpload>
          </Icon>
        </Text.MiddleLine>
        <Text.MiddleLine className="form-upload__input">
          <Form.Input type="file"
            name="files"
            id="files"
            onChange={(e) => {
              readNewFiles(e);
              setFiles(e);
            }}
            ref={fileInputRef}
            style={{
              display: 'none'
            }}
            multiple />
          <ButtonComponent onClick={openFiles}>
            Upload New File
          </ButtonComponent>
          <Text.MiddleLine>
            {preview.length} choose
          </Text.MiddleLine>
        </Text.MiddleLine>
        <Preview>
          {!preview.length &&
            (<Text.Title className="upload-preview__placeholder"
              style={{
                color: "#444",
                fontSize: "15px",
                textAlign: "center",
                textTransform: "uppercase",
                fontStyle: "italic",
              }}>
              Document Preview
            </Text.Title>) ||
            (<ContainerComponent.Flex>
              {preview.map((file, index) => {
                return <ContainerComponent.Item className="upload-preview-item"
                  key={index}
                  style={{
                    position: "relative",
                    flexGrow: 1,
                  }}>
                  <Icon className="upload-review-item__icon" onClick={() => removeItem(index)}
                    style={{
                      position: "position",
                      right: 0,
                      top: 0,
                      transform: 'translate(10px, 10px)',
                    }}>
                    <FaTimes></FaTimes>
                  </Icon>
                  <Preview.Images image={file}
                    alt={"preview file"}
                  ></Preview.Images>
                </ContainerComponent.Item>
              })}
            </ContainerComponent.Flex>)}
        </Preview>
      </Text.Line>
    </ContainerComponent.Section>
  );
};

export default UploadPreview;
