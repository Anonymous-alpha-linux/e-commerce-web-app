import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { ContainerComponent, Form, List, Preview, Text, Icon } from '../components';
// import apiConfig from '../config/api.json';

const UploadPreview = React.forwardRef(({ children, props }, ref) => {
    const [files, setFiles] = useState([]);
    const [rerender, setRerender] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const validateFile = (file) => {
        const imageRegex = new RegExp("image/*");
        if (imageRegex.test(file.type))
            return "image";
        return "others";
    }
    const isOverflowFile = (currentFileList, fileSize) => {
        const currentSize = currentFileList.reduce((prev, curr) => {

            return prev + curr.file.size / 1024;
        }, 0);

        return currentSize + fileSize > 50000;
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
    const removeItem = (id) => {
        setFiles(files => files.filter((file, index) => index !== id));
    }
    useEffect(() => {
        setTimeout(() => {
            setError('');
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

    return <ContainerComponent.Section className="form-upload__container">
        <Text.Label htmlFor='files'>Upload Files:</Text.Label>
        <Text.Line style={{
            marginBottom: '10px'
        }}>
            <Text.MiddleLine>
                <Icon
                    style={{
                        fontSize: '30px'
                    }}>
                    <AiOutlineCloudUpload></AiOutlineCloudUpload>
                </Icon>
            </Text.MiddleLine>
            <Text.MiddleLine>
                <Form.Input type='file'
                    name="files"
                    id='files'
                    onChange={(e) => {
                        setFiles(files => {
                            let image = 'https://image.shutterstock.com/image-vector/file-iconvector-illustration-flat-design-260nw-1402633574.jpg';
                            const newFiles = [...files];
                            try {
                                Array.from(e.target.files).forEach(file => {
                                    let size = file.size / 1024;
                                    if (isOverflowFile(files, size)) {
                                        alert("File size is overflow");
                                        throw new Error("File size is overflow");
                                    }
                                    newFiles.push({
                                        file,
                                        image,
                                        size
                                    })
                                });
                            } catch (error) {
                                setError(error.message);
                            }

                            return newFiles;
                        });
                    }}
                    ref={ref} multiple />
            </Text.MiddleLine>
            <Preview>
                {!files.length ?
                    <Text.Title className="upload-preview__placeholder" style={{
                        color: '#444',
                        fontSize: '15px',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        fontStyle: 'italic'
                    }}>
                        Document Preview
                    </Text.Title> :
                    <ContainerComponent.Flex>
                        {
                            files.map((file, index) => {
                                return <ContainerComponent.Item className='upload-preview-item' key={index} style={{
                                    position: 'relative',
                                    flexGrow: 1
                                }}>
                                    <Icon style={{
                                        position: 'position',
                                        right: 0,
                                        top: 0
                                    }}
                                        onClick={() => removeItem(index)}>
                                        <FaTimes></FaTimes>
                                    </Icon>
                                    <Preview.Images image={file.image} alt={"preview file"}></Preview.Images>
                                </ContainerComponent.Item>
                            })
                        }
                    </ContainerComponent.Flex>}
            </Preview>
        </Text.Line>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
    </ContainerComponent.Section>
});

export default UploadPreview;
