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

const UploadPreview = ({ files, setFiles }) => {
  const [preview, setPreview] = useState([]);
  const fileInputRef = useRef(null);
  let image = "https://image.shutterstock.com/image-vector/file-iconvector-illustration-flat-design-260nw-1402633574.jpg";


  const validateFile = (file) => {
    const imageRegex = new RegExp("image/*");
    if (imageRegex.test(file.type))
      return "image";
    return "others";
  }
  const removeItem = (id) => {
    setFiles(files => files.filter((file, index) => index !== id));
  };


  useEffect(() => {
    files.forEach((file, index) => {
      const fileReader = new FileReader();
      if (validateFile(file) === 'image') {
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          if (index === 0) {
            setPreview([fileReader.result]);
            return;
          }
          setPreview(preview => [...preview, fileReader.result || image]);
        }
        fileReader.onabort = () => {
          alert("Failed to read file", fileReader.abort);
        }
        fileReader.onerror = () => {
          alert("Failed to read file", fileReader.error);
        }
      }
    })
  }, [files]);
  useEffect(() => {
    console.log(fileInputRef.current);
  }, [fileInputRef.current]);


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
            onChange={setFiles}
            ref={fileInputRef}
            multiple />
          <ButtonComponent onClick={() => fileInputRef.current.click()}>
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
