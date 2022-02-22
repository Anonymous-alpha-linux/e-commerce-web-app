import React, { useEffect, useState, useRef } from 'react';
import { ButtonComponent, ContainerComponent, Form, Icon, MessageBox, Text } from '../components';
import ConditionContainer from './condition';
import { useAuthorizationContext, usePostContext } from '../redux';
import { mainAPI } from '../config';
import UploadForm from './uploadpreview';
import { Loading } from '../pages';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import TagInput from './tagsinput';

export default function PostModal({ setOpenModal }) {
    const [input, setInput] = useState({
        content: '',
        private: false,
        condition: false,
        categories: [],
        files: [],
    })
    const [loading, setLoading] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [openCondition, setOpenCondition] = useState(false);
    const privateChecked = useRef(null);
    const navigate = useNavigate();
    const { user, getSocket } = useAuthorizationContext();
    const { categories } = usePostContext();

    const { NODE_ENV } = process.env;
    const staffURL = NODE_ENV === 'development' ? mainAPI.LOCALHOST_STAFF : mainAPI.CLOUD_API_STAFF;


    const isOverflowFile = (currentFileList, fileSize) => {
        const currentSize = currentFileList.reduce((prev, file) => {
            return prev + file.size / 1024;
        }, 0);

        return currentSize + fileSize > 50000;
    };
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        input.files.reduce((p, c) => ([...p, c.file]), []).forEach(file => {
            formData.append("files", file);
        });
        Object.keys(input).forEach(key => {
            if (Array.isArray(input[key])) {
                input[key].forEach(item => {
                    formData.append(key, item);
                })
                return;
            }
            formData.append(key, JSON.stringify(input[key]));
        })
        setLoading(true);

        return axios.post(staffURL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.accessToken}`
            },
            params: {
                view: 'post'
            }
        })
            .then(res => {
                getSocket().emit("notify post", {
                    postId: res.data.postId,
                    postURL: `/post/${res.data.postId}`
                })
                navigate('/');
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
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
        try {
            const filter = Array.from(e.target.files).map(file => {
                console.log(file.size);
                let size = file.size / 1024;
                if (isOverflowFile(input.files, size)) {
                    alert("File size is overflow");
                    setError("File size is overflow");
                    return;
                }
                return file;
            }).filter(file => file);
            console.log(filter);
            setInput(input => {
                return {
                    ...input,
                    files: [...input.files, ...filter]
                };
            });
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        console.log(input);
    }, [input]);

    if (loading) return <Loading style={{
        position: 'fixed',
        top: '50px',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: 10000,
        padding: '10px',
        background: '#fff',
        overflowY: 'scroll',
        paddingBottom: '50px'
    }}
    ></Loading>

    return <ContainerComponent.Section className="postModal__container">
        <Form encType='multipart/form-data'
            method={'POST'}
            onSubmit={submitHandler}
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
                        verticalAlign: 'text-top'
                    }}>
                        Back
                    </Text.Middle>
                </Text.MiddleLine>

                <Text.RightLine style={{
                    width: '80%',
                    display: 'inline-block'
                }}>
                    <Text.Title style={{
                        textAlign: 'right',
                    }}>Post Modal</Text.Title>
                </Text.RightLine>

            </Text.Line>
            <Text.Label className="postModal__label">Author name:
                <Text.MiddleLine>
                    <Text.Bold>{user.account}</Text.Bold>
                </Text.MiddleLine>
                <Text.MiddleLine style={{ marginLeft: '40px' }}>
                    <ButtonComponent.Toggle onText="Hide"
                        offText="Show"
                        id="private"
                        name="private"
                        onClick={checkedHandler}
                        ref={privateChecked}></ButtonComponent.Toggle>
                </Text.MiddleLine>
            </Text.Label>
            <Form.TextArea
                id='content'
                name='content'
                onChange={inputHandler}
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
            <ContainerComponent.Pane className="upload__input" style={{
                padding: '10px 0'
            }}>
                <UploadForm files={input.files}
                    setFiles={pushInputHandler}></UploadForm>
            </ContainerComponent.Pane>
            <Text.Line className="postModal__conditional">
                <Text.MiddleLine>
                    <Form.Checkbox id='condition'
                        name='condition'
                        onChange={checkedHandler}
                    ></Form.Checkbox>
                </Text.MiddleLine>
                <Text.MiddleLine>
                    <Text.Paragraph
                        onClick={() => setOpenCondition(true)}
                        style={{
                            color: 'blue',
                            margin: '0'
                        }}
                    >Condition and Term</Text.Paragraph>
                </Text.MiddleLine>
            </Text.Line>
            {openCondition && <ConditionContainer closeCondition={() => setOpenCondition(false)}></ConditionContainer>}
            {message && <MessageBox.TextMessage>
                {message}
            </MessageBox.TextMessage>}
            {error && <MessageBox.TextMessage>
                {error}
            </MessageBox.TextMessage>}
            <Form.Input type='submit' value={'Submit'}></Form.Input>
        </Form>
    </ContainerComponent.Section>
}
