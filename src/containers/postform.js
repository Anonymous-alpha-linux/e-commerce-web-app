import React, { useState } from 'react';
import { ContainerComponent, Text, Form, Icon } from '../components';
import { PostModal } from '../containers';
import { IoLogoApple } from 'react-icons/io5'

export default function PostForm() {
    const [openModal, setOpenModal] = useState(false);
    return <ContainerComponent.Section
        className="post-form__container"
        style={{
            padding: '10px',
            backgroundColor: "#EEF5EB"
        }}>
        <ContainerComponent.Flex style={{ alignItems: 'center' }}>
            <ContainerComponent.Item>
                <Icon.CircleIcon style={{ size: '15px', background: '#163d3c', color: '#fff' }}>
                    <IoLogoApple></IoLogoApple>
                </Icon.CircleIcon>
            </ContainerComponent.Item>
            <ContainerComponent.Item style={{
                flexGrow: 1
            }}>
                <Text.Title>Staff Name</Text.Title>
                <Form.Input placeholder="Post your idea" onClick={() => setOpenModal(!openModal)}></Form.Input>
            </ContainerComponent.Item>
        </ContainerComponent.Flex>
        {openModal && <PostModal setOpenModal={setOpenModal}></PostModal>}
    </ContainerComponent.Section>
}
