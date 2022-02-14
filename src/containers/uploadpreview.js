import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Text} from '../components';
// import apiConfig from '../config/api.json';

const UploadForm = React.forwardRef(({ children, props }, ref) => {
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

    return <>
        <Form encType='multipart/form-data' onSubmit={submitHandler}>
            <Text htmlFor='files'>Upload Files:</Text>
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
            <div className="upload-preview">
                {!files.length ?
                    <span className="upload-preview__placeholder">
                        Document Preview
                    </span> :
                    <ol>
                        {
                            files.map((file, index) => {
                                return <li className='upload-preview-item' key={index}>
                                    <img src={file.image}></img>
                                </li>
                            })
                        }
                    </ol>}
            </div>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
            <Form.Input type='submit' value={'Submit'}></Form.Input>
        </Form>
    </>
});

export default UploadForm;
