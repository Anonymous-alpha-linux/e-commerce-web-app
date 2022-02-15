import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { ContainerComponent, Form, List, Preview, Text, Icon } from '../components';
// import apiConfig from '../config/api.json';

const UploadPreview = React.forwardRef(({ files =[], setFiles }, ref) => {
    const isOverflowFile = (currentFileList, fileSize) => {
        const currentSize = currentFileList.reduce((prev, curr) => {

            return prev + curr.file.size / 1024;
        }, 0);

        return currentSize + fileSize > 50000;
    }
    const removeItem = (files, id) => {
        setFiles(files => files.filter((file, index) => index !== id));
    }
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
                                throw new Error(error.message);
                            }

                            return newFiles;
                        });
                    }}
                    ref={ref}
                    multiple />
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
                                        onClick={() => removeItem(files, index)}>
                                        <FaTimes></FaTimes>
                                    </Icon>
                                    <Preview.Images image={file.image} alt={"preview file"}></Preview.Images>
                                </ContainerComponent.Item>
                            })
                        }
                    </ContainerComponent.Flex>}
            </Preview>
        </Text.Line>
    </ContainerComponent.Section>
});

export default UploadPreview;
