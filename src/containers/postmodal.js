import React, { useEffect, useState, useRef } from 'react';
import { ButtonComponent, ContainerComponent, Form, Icon, MessageBox, Text } from '../components';
import { ConditionContainer, UploadForm } from '.';
// import ConditionContainer from './condition';
// import UploadForm from './uploadpreview';
import { useAuthorizationContext, usePostContext } from '../redux';
import { mainAPI } from '../config';

import { Loading } from '../pages';
import { useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import TagInput from './tagsinput';

export default function PostModal({
    // setOpenModal
}) {
    const [input, setInput] = useState({
        content: '',
        private: false,
        condition: false,
        categories: [],
        files: [],
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [openCondition, setOpenCondition] = useState(false);

    const privateChecked = useRef(null);
    const checkedCondition = useRef();
    const navigate = useNavigate();
    const { id } = useParams();
    const { user, getSocket } = useAuthorizationContext();
    const { posts, categories, postLoading, categoryLoading,
        getFile, postIdea, setShowUpdate } = usePostContext();

    const { REACT_APP_ENVIRONMENT } = process.env;
    const [staffURL, host] = REACT_APP_ENVIRONMENT === 'development' ? [mainAPI.LOCALHOST_STAFF, mainAPI.LOCALHOST_HOST] : [mainAPI.CLOUD_API_STAFF, mainAPI.CLOUD_HOST];

    const isOverflowFile = (currentFileList, fileSize) => {
        const currentSize = currentFileList.reduce((prev, file) => {
            return prev + file.size / 1024;
        }, 0);

        return currentSize + fileSize > 50000;
    };
    const editHandler = (e) => {
        e.preventDefault();
        postIdea(input, res => {
            // console.log(res);
            navigate('/');
        }, {
            isEdit: true,
            id: id,
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if (checkedCondition.current.checked) {
            postIdea(input, res => {
                // console.log(res);
                setShowUpdate(o => !o);
                navigate('/');
            })
        }
        else {
            setError('Please checked our terms and condition');
        }
        // const formData = new FormData();
        // input.files.reduce((p, c) => ([...p, c.file]), []).forEach(file => {
        //     formData.append("files", file);
        // });
        // Object.keys(input).forEach(key => {
        //     if (Array.isArray(input[key])) {
        //         input[key].forEach(item => {
        //             formData.append(key, item);
        //         })
        //         return;
        //     }
        //     formData.append(key, JSON.stringify(input[key]));
        // })
        // return axios.post(staffURL, formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'Authorization': `Bearer ${user.accessToken}`
        //     },
        //     params: {
        //         view: 'post'
        //     }
        // }).then(res => {
        //     // getSocket().emit("notify post", {
        //     //     postId: res.data.postId,
        //     //     postURL: `/post/${res.data.postId}`
        //     // });
        //     navigate('/');
        // }).catch(err => setError(err.message));
    };
    const inputHandler = (e) => {
        setInput(input => ({
            ...input,
            [e.target.name]: e.target.value,
        }));
    };
    const checkedHandler = (e) => {
        setInput(input => ({
            ...input,
            [e.target.name]: e.target.checked,
        }))
    };
    const pushInputHandler = (e) => {
        const filter = Array.from(e.target.files).map(file => {
            let size = file.size / 1024;
            if (isOverflowFile(input.files, size)) {
                alert("File size is overflow");
                setError("File size is overflow");
                return;
            }
            return file;
        }).filter(file => file);

        setInput(input => {
            return {
                ...input,
                files: [...input.files, ...filter]
            };
        });
    };
    const eliminateFile = (id) => {
        setInput(input => ({
            ...input,
            files: input.files.filter((file, index) => id !== index)
        }));
    }

    useEffect(() => {
        if (id && posts.length) {
            const { attachment, category, content, hideAuthor } = posts.find(post => post._id === id);

            attachment.forEach(attach => {
                getFile(attach, file => {
                    setInput({
                        ...input,
                        content: content,
                        private: hideAuthor,
                        categories: category.map(single => single._id),
                        files: [...input.files, file]
                    });
                }).then(f => {
                    setLoading(false);
                });
            });
        }
        else
            setLoading(false);
    }, [posts]);

    // console.log(postLoading, categoryLoading, loading, id);
    if (postLoading || categoryLoading || loading) return <Loading></Loading>

    return <>
        <ContainerComponent.Section className="postModal__container">
            <Form encType='multipart/form-data'
                method={'POST'}
                onSubmit={(e) => {
                    if (id)
                        editHandler(e);
                    else
                        submitHandler(e)
                }}
                className="postModal__form">
                <Text.Line className="postModal__header">
                    <Text.MiddleLine onClick={() => {
                        // setOpenModal(modal => !modal);
                        navigate('/');
                    }}>
                        <Text.MiddleLine>
                            <Icon style={{ display: 'inline' }}>
                                <FaChevronLeft></FaChevronLeft>
                            </Icon>
                        </Text.MiddleLine>
                        <Text.Middle style={{
                            verticalAlign: 'text-top',
                            textIndent: '10px'
                        }}>
                            Back
                        </Text.Middle>
                    </Text.MiddleLine>
                    <Text.RightLine
                        style={{
                            width: '80%',
                            display: 'inline-block'
                        }}>
                        <Text.Title style={{
                            textAlign: 'right',
                        }}>Post Modal</Text.Title>
                    </Text.RightLine>

                </Text.Line>
                <Text.Line style={{ margin: '15px 0' }}>
                    <Text.MiddleLine>
                        <Text.Label className="postModal__label">
                            Author name:
                        </Text.Label>
                    </Text.MiddleLine>
                    <Text.MiddleLine>
                        <Text.Bold>{!input.private ? user.account : 'Anonymous'}</Text.Bold>
                    </Text.MiddleLine>
                    <Text.RightLine>
                        <ButtonComponent.Toggle
                            onText="Hide"
                            offText="Show"
                            id="private"
                            name="private"
                            value={input.private}
                            onChange={checkedHandler}
                            ref={privateChecked}></ButtonComponent.Toggle>
                    </Text.RightLine>
                </Text.Line>
                <Form.TextArea
                    id='content'
                    name='content'
                    onChange={inputHandler}
                    value={input.content}
                    style={{
                        width: '100%',
                        height: '100px'
                    }}
                ></Form.TextArea>
                <Text.Line className="postModal__category">
                    <TagInput itemList={categories}
                        formField={input.categories}
                        setFormField={setInput}></TagInput>
                </Text.Line>
                <ContainerComponent.Pane className="upload__input"
                    style={{
                        padding: '10px 0'
                    }}>
                    <UploadForm files={input.files}
                        eliminateFile={eliminateFile}
                        setFiles={pushInputHandler}>
                    </UploadForm>
                </ContainerComponent.Pane>
                <Text.Line className="postModal__conditional">
                    <Text.MiddleLine>
                        <Form.Checkbox id='condition'
                            name='condition'
                            onChange={checkedHandler}
                            ref={checkedCondition}
                        ></Form.Checkbox>
                    </Text.MiddleLine>
                    <Text.MiddleLine>
                        <Text.Paragraph
                            onClick={() => setOpenCondition(true)}
                            style={{
                                color: 'blue',
                                margin: '0'
                            }}>Condition and Term</Text.Paragraph>
                    </Text.MiddleLine>
                </Text.Line>
                {message && <MessageBox.TextMessage>
                    {message}
                </MessageBox.TextMessage>}
                {error && <MessageBox.TextMessage>
                    {error}
                </MessageBox.TextMessage>}
                {/* {id && <Form.Input type='hidden'
                name="id"
                id="id"
                value={id}></Form.Input>} */}
                <Form.Input type='submit' value={id ? 'Edit' : 'Submit'}></Form.Input>
            </Form>
        </ContainerComponent.Section>
        {openCondition && <ConditionContainer closeCondition={() => setOpenCondition(false)}></ConditionContainer>}
    </>
}
