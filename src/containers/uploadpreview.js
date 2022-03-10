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
  // Keep track of the mounted state
  const mountedRef = useRef(false);
  const pushFile = useRef(setFiles);
  const deleteFile = useRef(eliminateFile);

  let image =
    "https://image.shutterstock.com/image-vector/file-iconvector-illustration-flat-design-260nw-1402633574.jpg";
  useEffect(() => {
    pushFile.current = setFiles;
    deleteFile.current = eliminateFile;
  }, [setFiles, eliminateFile]);

  const validateFile = (file) => {
    const imageRegex = new RegExp("image/*");
    if (imageRegex.test(file.type)) return "image";
    return "others";
  };
  const removeItem = (id) => {
    deleteFile.current(id);
    preview.filter((file, index) => index !== id);
  };
  const openFiles = () => {
    fileInputRef.current.click();
  };
  const readNewFiles = (e) => {
    return files.map((file) => {
      return readFile(file)
        .then((data) => setPreview([...preview, data]))
        .catch((error) => setError(error.message));
    });
  };
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onabort = () => {
        alert("Failed to read file", fileReader.abort);
        reject("Failed to read file", fileReader.abort);
      };
      fileReader.onerror = () => {
        alert("Failed to read file", fileReader.error);
        reject("Failed to read file", fileReader.abort);
      };
      fileReader.onload = () => {
        resolve(validateFile(file) === "image" ? fileReader.result : image);
      };
    });
  };
  const readFiles = () => {
    return files.map((file) => {
      return readFile(file);
    });
  };

  useEffect(() => {
    mountedRef.current = true;
    Promise.all(readFiles())
      .then((data) => {
        if (mountedRef.current) {
          setPreview(data);
        }
      })
      .then((s) => setLoading(false))
      .catch((error) => setError(error.message));
    return () => {
      mountedRef.current = false;
    }
  }, [files]);

  if (loading) return <Loading></Loading>;
  return (
    <ContainerComponent.Section className="form-upload__container">
      <Text.Label htmlFor="files">Upload Files:</Text.Label>
      <Text.Line
        style={{
          marginBottom: "10px",
        }}
      >
        <ContainerComponent.Pane
          onClick={openFiles}
          style={{ padding: "10px 0" }}
        >
          <Text.CenterLine>
            <Icon
              style={{
                fontSize: "30px",
              }}
            >
              <AiOutlineCloudUpload></AiOutlineCloudUpload>
            </Icon>
          </Text.CenterLine>
          <Text.CenterLine className="form-upload__input">
            <Form.Input
              type="file"
              name="files"
              id="files"
              onChange={(e) => {
                readNewFiles(e);
                pushFile.current(e);
              }}
              ref={fileInputRef}
              style={{
                display: "none",
              }}
              multiple
            />
            <ButtonComponent>
              <Text.CenterLine>Upload New File</Text.CenterLine>
            </ButtonComponent>
            <Text.CenterLine style={{ padding: "10px" }}>
              {preview.length} choose
            </Text.CenterLine>
          </Text.CenterLine>
          <Preview>
            {(!preview.length && (
              <Text.Title
                className="upload-preview__placeholder"
                style={{
                  color: "#444",
                  fontSize: "15px",
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontStyle: "italic",
                }}
              >
                Document Preview
              </Text.Title>
            )) || (
                <ContainerComponent.Flex>
                  {preview.map((file, index) => {
                    return (
                      <ContainerComponent.Item
                        className="upload-preview-item"
                        key={index}
                        style={{
                          position: "relative",
                          flexGrow: 1,
                        }}
                      >
                        <Icon
                          className="upload-review-item__icon"
                          onClick={() => removeItem(index)}
                          style={{
                            position: "position",
                            right: 0,
                            top: 0,
                            transform: "translate(10px, 10px)",
                          }}
                        >
                          <FaTimes></FaTimes>
                        </Icon>
                        <Preview.Images
                          image={file}
                          alt={"preview file"}
                        ></Preview.Images>
                      </ContainerComponent.Item>
                    );
                  })}
                </ContainerComponent.Flex>
              )}
          </Preview>
        </ContainerComponent.Pane>
      </Text.Line>
    </ContainerComponent.Section>
  );
};

export default UploadPreview;
