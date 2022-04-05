import React, { useEffect, useState, useRef } from "react";
import {
  ButtonComponent,
  ContainerComponent,
  Form,
  Icon,
  MessageBox,
  Text,
} from "../components";
import { ConditionContainer, UploadForm } from ".";
import {
  useAuthorizationContext,
  useNotifyContext,
  usePostContext,
} from "../redux";
import { notifyData, socketTargets } from "../fixtures";

import { Loading } from "../pages";
import useValidate from "../hooks/useValidate";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import TagInput from "./tagsinput";
import axios from "axios";

export default function PostModal() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    content: "",
    private: false,
    condition: false,
    categories: [],
    files: [],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [openCondition, setOpenCondition] = useState(false);

  const { id } = useParams();
  const { user } = useAuthorizationContext();
  const { sendNotification } = useNotifyContext();
  const { posts, categories, getFile, postIdea, getSinglePost } =
    usePostContext();
  const privateChecked = useRef(null);
  const mountedRef = useRef(false);
  const checkedCondition = useRef(false);
  const getFileRef = useRef(getFile);
  const cancelTokenSource = axios.CancelToken.source();
  // const [staffURL, host] = process.env.REACT_APP_ENVIRONMENT === "development" ? [mainAPI.LOCALHOST_STAFF, mainAPI.LOCALHOST_HOST] : [mainAPI.CLOUD_API_STAFF, mainAPI.CLOUD_HOST];

  const isOverflowFile = (currentFileList, fileSize) => {
    const currentSize = currentFileList.reduce((prev, file) => {
      return prev + file.size / 1024;
    }, 0);
    return currentSize + fileSize > 5120;
  };
  const editHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    postIdea(
      input,
      (postId) => {
        setLoading(false);
        navigate("/");
      },
      {
        isEdit: true,
        postId: id,
      }
    );
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Validate the input
      const valContent = new useValidate(input.content);
      const check = valContent.isEmpty().input;
      if (!input.categories.length) throw new Error("Please select a category");
      if (!checkedCondition.current.checked) {
        throw new Error("Please checked our terms and condition");
      }
      // 2. Post a new idea
      postIdea(input, (postId) => {
        setLoading(false);
        sendNotification(
          notifyData.CREATE_POST,
          `/#${postId}`,
          socketTargets.WITHOUT_BROADCAST
        );
        navigate("/");
      });
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  const inputHandler = (e) => {
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
  };
  const checkedHandler = (e) => {
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.checked,
    }));
  };
  const pushInputHandler = (e) => {
    const filter = Array.from(e.target.files)
      .map((file) => {
        let size = file.size / 1024;
        if (isOverflowFile(input.files, size)) {
          alert("File size is overflow");
          setError("File size is overflow");
          return;
        }
        return file;
      })
      .filter((file) => file);

    setInput((input) => {
      return {
        ...input,
        files: [...input.files, ...filter],
      };
    });
  };
  const eliminateFile = (id) => {
    setInput((input) => ({
      ...input,
      files: input.files.filter((file, index) => id !== index),
    }));
  };

  useEffect(() => {
    mountedRef.current = true;
    setLoading(true);
    if (id) {
      // Stage 1
      Promise.resolve({
        then: function (resolve, reject) {
          try {
            getSinglePost(id, (post) => {
              resolve(post);
            });
          } catch (error) {
            reject(error.message);
          }
        },
      })
        .then((post) => {
          return Promise.all([
            post,
            ...post.attachments.map((attach) => {
              return new Promise((resolve, reject) => {
                getFileRef
                  .current(attach, (file) => {
                    resolve(file);
                  })
                  .catch((error) => reject(error));
              });
            }),
          ]);
        })
        .then((data) => {
          const [post, ...files] = data;
          const { content, hideAuthor, categories } = post;
          if (mountedRef.current) {
            setInput((input) => ({
              ...input,
              content: content,
              private: hideAuthor,
              categories: categories.map((single) => single._id),
              files: files,
            }));
            setLoading(false);
          }
        })
        .catch((error) => {
          if (mountedRef.current) {
            setLoading(false);
            setError(error.message);
          }
        });
    } else {
      setLoading(false);
    }
    return () => {
      mountedRef.current = false;
      cancelTokenSource.cancel();
    };
    }, [posts]);
    useEffect(() => {
        getFileRef.current = getFile;
    }, [getFile]);
    return (
        <ContainerComponent.Section className="postModal__container">
            <Form
                encType="multipart/form-data"
                method={"POST"}
                onSubmit={(e) => {
                    if (id) { editHandler(e); }
                    else { submitHandler(e); }
                }}
                className="postModal__form">
                <Text.Line className="postModal__header">
                    <Text.MiddleLine
                        onClick={() => {
                            // setOpenModal(modal => !modal);
                            navigate("/");
                        }}>
                        <Text.MiddleLine>
                            <Icon style={{ display: "inline" }}>
                                <FaChevronLeft></FaChevronLeft>
                            </Icon>
                        </Text.MiddleLine>
                        <Text.Middle
                            style={{
                                verticalAlign: 'middle',
                                textIndent: '12px'
                            }}
                        >
                            Back
                        </Text.Middle>
                    </Text.MiddleLine>
                    <Text.RightLine
                        style={{
                            width: "80%",
                            display: "inline-block",
                        }}
                    >
                        <Text.Title
                            style={{
                                textAlign: "right",
                            }}
                        >
                            Post Modal
                        </Text.Title>
                    </Text.RightLine>
                </Text.Line>
                <Text.Line style={{ margin: "15px 0" }}>
                    <Text.MiddleLine>
                        <Text.Label className="postModal__label">Author name:</Text.Label>
                    </Text.MiddleLine>
                    <Text.MiddleLine>
                        <Text.Bold>{!input.private ? user.account : "Anonymous"}</Text.Bold>
                    </Text.MiddleLine>
                    <Text.RightLine>
                        <ButtonComponent.Toggle
                            onText="Hide"
                            offText="Show"
                            id="private"
                            name="private"
                            value={input.private}
                            onChange={checkedHandler}
                            ref={privateChecked}
                        ></ButtonComponent.Toggle>
                    </Text.RightLine>
                </Text.Line>
                <Form.Input id="title" name="title" onChange={inputHandler} value={input.title} placeholder="Your post title" className="postModal__titleInput"></Form.Input>
                <Form.TextArea
                    id="content"
                    name="content"
                    onChange={inputHandler}
                    value={input.content}
                    style={{
                        width: "100%",
                        height: "100px",
                        borderRadius:"10px",
                        borderColor: "rgb(22, 61, 60)"
                    }}
                ></Form.TextArea>
                <Text.Label style={{ fontSize: "14px" }}>Category:</Text.Label>
                <Text.Line className="postModal__category">
                    <TagInput
                        itemList={categories}
                        formField={input.categories}
                        setFormField={setInput}
                        style= {{ minHeight: "45px"}}
                    ></TagInput>
                </Text.Line>
                <ContainerComponent.Pane
                    className="upload__input"
                    style={{
                        padding: "10px 0 0",
                    }}>
                    <UploadForm
                        files={input.files}
                        eliminateFile={eliminateFile}
                        setFiles={pushInputHandler}
                        style ={{ padding: "10px 0 0" }}
                    ></UploadForm>
                </ContainerComponent.Pane>
                <Text.Line className="postModal__conditional">
                    <Text.MiddleLine>
                        <Form.Checkbox
                            id="condition"
                            name="condition"
                            onChange={checkedHandler}
                            ref={checkedCondition}
                        ></Form.Checkbox>
                    </Text.MiddleLine>
                    <Text.MiddleLine >
                        <Text.Paragraph
                            onClick={() => setOpenCondition(true)}
                            style={{
                                color: "blue",
                                margin: "0",
                                marginLeft: "10px",
                                // fontSize: '12px'
                            }}
                        >
                            Condition and Term
                        </Text.Paragraph>
                    </Text.MiddleLine>
                </Text.Line>
        {openCondition && (
          <ConditionContainer
            closeCondition={() => setOpenCondition(false)}
          ></ConditionContainer>
        )}
        {message && <MessageBox.TextMessage>{message}</MessageBox.TextMessage>}
        {error && <MessageBox.TextMessage>{error}</MessageBox.TextMessage>}
        {/* {id && <Form.Input type='hidden'
                name="id"
                id="id"
                value={id}></Form.Input>} */}
                <Form.Input type="submit" value={id ? "Edit" : "Submit"} className="postModal__summitButton"></Form.Input>
            </Form>
            {loading && <Loading></Loading>}
        </ContainerComponent.Section>
    );
}
