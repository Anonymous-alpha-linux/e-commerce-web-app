import React, { useEffect, useState } from 'react';
import { ButtonComponent, ContainerComponent, Form, Icon, MessageBox, Text } from '../components';
import ConditionContainer from './condition';
import { useAuthorizationContext } from '../redux';
import { mainAPI } from '../config';
import UploadForm from './uploadpreview';

import axios from 'axios';
import { FaChevronLeft } from "react-icons/fa";

export default function PostModal({ setOpenModal }) {
    const [input, setInput] = useState({
        content: '',
        private: false,
        condition: false
    })
    const [files, setFiles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [rerender, setRerender] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [openCondition, setOpenCondition] = React.useState(false);
    const { user } = useAuthorizationContext();

    const staffURL = mainAPI.LOCALHOST_STAFF;

    const validateFile = (file) => {
        const imageRegex = new RegExp("image/*");
        if (imageRegex.test(file.type))
            return "image";
        return "others";
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const headers = {
            'Content-Type': 'multipart/form-data'
        };
        files.reduce((p, c) => ([...p, c.file]), []).forEach(file => {
            console.log(file);
            formData.append("files", file);
        })
        Object.keys(input).forEach(key => {
            formData.append(key, input[key]);
            console.log(key, input[key]);
        })
        console.log(formData);
        // axios.post(`${apiConfig.UPLOAD_API}`, formData, {
        //     headers: headers
        // })
        //     .then(res => {
        //         setMessage(res.data.message)
        //         setTimeout(() => {
        //             setMessage('');
        //         }, 3000);
        //     })
        //     .catch(err => setError(err.message));
    }
    const inputHandler = (e) => {
        setInput(input => ({
            ...input,
            [e.target.name]: e.target.value,
        }))
    }
    const checkedHandler = (e) => {
        setInput(input => ({
            ...input,
            [e.target.name]: e.target.checked,
        }))
    }

    useEffect(() => {
        const categoryURL = `${staffURL}?view=category`;
        axios.get(categoryURL, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }
        }).then(res => setCategories(res.data.category))
            .catch(error => setError(error.message));
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setError('');
        }, 3000)
        setTimeout(() => {
            setMessage('');
        }, 3000)
        setFiles(files => {
            files.forEach((file, index) => {
                const fileReader = new FileReader();
                if (validateFile(file.file) === 'image') {

                    fileReader.readAsDataURL(file.file);
                    fileReader.onload = () => {

                        const updateFileObject = Object.assign({}, {
                            ...file,
                            image: fileReader.result
                        });
                        files.splice(index, 1, updateFileObject);
                        setRerender(rerender => !rerender);
                    }
                    fileReader.onabort = () => {
                        alert("Failed to read file", fileReader.abort);
                    }
                    fileReader.onerror = () => {
                        alert("Failed to read file", fileReader.error);
                    }
                }
            })
            return files;
        })
    }, [files]);

    useEffect(() => {
        console.log(input);
    }, [input]);



    return <ContainerComponent.Section className="postModal__container" style={{
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
    }}>
        <Form encType='multipart/form-data'
            onSubmit={submitHandler}
            style={{
                borderRadius: '20px',
                background: '#fff',
            }}>
            <Text.Line onClick={() => setOpenModal(modal => !modal)}>
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
            </Text.Line>
            <Text.Title style={{
                textAlign: 'right'
            }}>Post Modal</Text.Title>
            <Text.Label>Author name: <Text.MiddleLine>
                <Text.Bold>{user.account}</Text.Bold>
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
            <ContainerComponent.Flex style={{ justifyContent: 'space-between' }}>
                <Text.MiddleLine>
                    <Text.Middle>
                        <Form.Checkbox name='private'
                            id='private'
                            onChange={checkedHandler}
                        ></Form.Checkbox>
                    </Text.Middle>
                    <Text.MiddleLine>
                        <Text.Subtitle>
                            Private Post
                        </Text.Subtitle>
                    </Text.MiddleLine>
                </Text.MiddleLine>
                <Text.MiddleLine style={{
                    textAlign: 'right'
                }}>
                    <Form.Select
                        id="category"
                        name="category"
                        onChange={inputHandler}>
                        {
                            categories.map((category, index) =>
                                <Form.Option key={index + 1}
                                    value={category._id}>
                                    {category.name}
                                </Form.Option>
                            )
                        }
                    </Form.Select>
                </Text.MiddleLine>
            </ContainerComponent.Flex>
            <ContainerComponent.Pane className="upload__input" style={{
                padding: '10px 0'
            }}>
                <UploadForm files={files} setFiles={setFiles}></UploadForm>
            </ContainerComponent.Pane>
            <Text.Line>
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
