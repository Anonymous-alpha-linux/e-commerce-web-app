import React, { useState } from 'react';
import { ContainerComponent, Text, Form, Icon } from '../components';
import { PostModal } from '../containers';
import { IoLogoApple } from 'react-icons/io5'
import { useAuthorizationContext } from '../redux';
import { Link } from 'react-router-dom';

export default function PostForm() {
    // const [openModal, setOpenModal] = useState(false);
    const { user } = useAuthorizationContext();

    return <ContainerComponent.Section
        className="post-form__container"
        style={{
            padding: '10px',
            backgroundColor: "#DCE7D7"
        }}>
        <ContainerComponent.Flex style={{ alignItems: 'center' }}>
            <ContainerComponent.Item>
                <Link to={"/profile/personal"}>
                    <Icon.CircleIcon style={{ size: '15px', background: '#163d3c', color: '#fff', padding: 0, width: '55px', height: '55px' }}>
                        <Icon.Image
                            src={user.profileImage}
                            alt='avatar'></Icon.Image>
                    </Icon.CircleIcon>
                </Link>
            </ContainerComponent.Item>
            <ContainerComponent.Item style={{
                flexGrow: 1
            }}>
                <Text.Title>{user.account}</Text.Title>
                <Link to="/portal/idea">
                    <Form.Input
                        style={{ marginTop: "4px", border:"1px solid #C4C4C4"}}
                        placeholder="Hey, what is your idea?"
                    // onClick={() => setOpenModal(!openModal)}
                    >
                    </Form.Input>
                </Link>
            </ContainerComponent.Item>
        </ContainerComponent.Flex>
        {/* {openModal && <PostModal closeModal={() => setOpenModal(false)}></PostModal>} */}
    </ContainerComponent.Section>
}
