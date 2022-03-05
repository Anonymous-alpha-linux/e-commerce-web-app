import React, { useEffect, useState } from 'react';
import { ContainerComponent, Icon, ButtonComponent, Form, Text } from '../components';
import { useAuthorizationContext, useWorkspaceContext } from '../redux';
import { mainAPI } from '../config';
import { Link, useLocation } from 'react-router-dom';

export default function Personal({ personalInfo }) {
    const { user } = useAuthorizationContext();
    const { workspace } = useWorkspaceContext();
    const [postAPI, host] = process.env.REACT_APP_ENVIRONMENT === 'development' ? [mainAPI.LOCALHOST_STAFF, mainAPI.LOCALHOST_HOST] : [mainAPI.CLOUD_API_STAFF, mainAPI.CLOUD_HOST];
    const [isEdit, setIsEdit] = useState(false);
    const [input, setInput] = useState({
        introduction: '',
        gender: 'male',
        birth: '',
        email: '',
        department: ''
    });
    const location = useLocation();

    const inputHandler = (e) => {
        setInput({
            [e.target.name]: e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();
    }

    return <ContainerComponent
        style={{
            padding: '10px'
        }}>
        <ContainerComponent.Inner>
            <ContainerComponent.Pane style={{
                position: 'relative',
            }}>
                <Text.CenterLine style={{ position: 'relative', zIndex: 1, height: '27.5px' }}>
                    <Icon.CircleIcon style={{
                        display: 'inline-block',
                        overflow: 'hidden',
                        width: '57px',
                        height: '57px',
                        zIndex: 1
                    }}>
                        <Icon.Image src={`${user.profileImage}`} alt={`Avatar`} style={{
                            objectFit: 'fill',
                        }}></Icon.Image>
                    </Icon.CircleIcon>
                    <Text.CenterLine style={{
                        paddingTop: '10px'
                    }}>
                        <Text.Title>{user.account}</Text.Title>
                        <Text.Subtitle style={{
                            textTransform: 'capitalize',
                            opacity: 0.5,
                            fontWeight: 500
                        }}>{user.role}</Text.Subtitle>
                    </Text.CenterLine>
                </Text.CenterLine>
                <Text.Line style={{
                    width: '100%',
                    height: '141px',
                    borderRadius: '10px',
                    boxShadow: '1px 1px 5px 2px black',
                    position: 'relative',
                    bottom: 0,
                    background: '#fff',
                    border: '1px solid #163d3c',
                }}></Text.Line>
            </ContainerComponent.Pane>
            <ContainerComponent.Pane style={{
                padding: '10px 0 0 0'
            }}>
                <ContainerComponent.GridThreeColumns>
                    <ContainerComponent.Item>
                        <ButtonComponent>
                            <Text.Center>
                                Information
                            </Text.Center>
                        </ButtonComponent>
                    </ContainerComponent.Item>
                    <ContainerComponent.Item>
                        <Link to="/history" state={{ from: location }}>
                            <ButtonComponent>
                                <Text.Center>
                                    My Post
                                </Text.Center>
                            </ButtonComponent>
                        </Link>
                    </ContainerComponent.Item>
                    <ContainerComponent.Item>
                        <Link to="/workspace" state={{ from: location }}>
                            <ButtonComponent>
                                <Text.Center>
                                    Workspace
                                </Text.Center>
                            </ButtonComponent>
                        </Link>
                    </ContainerComponent.Item>
                </ContainerComponent.GridThreeColumns>
            </ContainerComponent.Pane>
            <Form onSubmit={submitHandler}
                style={{ maxWidth: 'unset' }}>
                <ContainerComponent.Pane style={{
                    padding: '20px 0'
                }}>
                    <Text.Title style={{
                        lineHeight: '2px',
                        textIndent: '10px',
                        transform: 'translateY(20px)',
                    }}>Profile</Text.Title>
                    <Form.TextArea placeholder="Some your introduction"
                        rows={15}
                        name={'introduction'}
                        onChange={inputHandler}
                        style={{
                            width: '100%',
                            borderRadius: '20px',
                            padding: '30px 0 0 10px'
                        }}
                        value={input.introduction}></Form.TextArea>
                    <Text.MiddleLine style={{
                        lineHeight: 0,
                        textIndent: '5px',
                        transform: 'translateY(25px)',
                        fontWeight: 800
                    }}>
                        <Text.Label>
                            Gender
                        </Text.Label>
                    </Text.MiddleLine>
                    <Form.Select placeholder="Post your information"
                        style={{
                            textAlign: 'right',
                            width: '100%',
                            height: '35px'
                        }}
                        onChange={inputHandler}
                        name={'gender'}
                        value={input.gender}>
                        <Form.Option value={'male'}>Male</Form.Option>
                        <Form.Option value={'female'}>Female</Form.Option>
                    </Form.Select>

                    <Text.MiddleLine style={{
                        lineHeight: 0,
                        textIndent: '5px',
                        transform: 'translateY(25px)',
                        fontWeight: 800
                    }}>
                        <Text.Label>
                            Day of Birth
                        </Text.Label>
                    </Text.MiddleLine>
                    <Form.Input
                        type="date"
                        onChange={inputHandler}
                        name='birth'
                        value={input.birth}
                        style={{
                            textAlign: 'right',
                        }}></Form.Input>
                    <Text.MiddleLine style={{
                        lineHeight: 0,
                        textIndent: '5px',
                        transform: 'translateY(25px)',
                        fontWeight: 800
                    }}>
                        <Text.Label>
                            Email
                        </Text.Label>
                    </Text.MiddleLine>
                    <Form.Input style={{
                        textAlign: 'right',
                    }}
                        name="email"
                        onChange={inputHandler}
                        value={user.email}
                        disabled={'true'}></Form.Input>
                    <Text.MiddleLine style={{
                        lineHeight: 0,
                        textIndent: '5px',
                        transform: 'translateY(25px)',
                        fontWeight: 800
                    }}>
                        <Text.Label>
                            Department
                        </Text.Label>
                    </Text.MiddleLine>
                    <Form.Input placeholder="your position"
                        value={input.department}
                        name='department'
                        style={{
                            textAlign: 'right',
                        }}></Form.Input>
                </ContainerComponent.Pane>
                <Text.RightLine>
                    {isEdit && <Form.Input
                        type='submit'
                        onClick={(e) => {
                            submitHandler(e);
                            setIsEdit(false)
                        }}>
                        Save
                    </Form.Input>
                        || <ButtonComponent
                            onClick={() => setIsEdit(true)}>
                            Edit
                        </ButtonComponent>}
                </Text.RightLine>
            </Form>
        </ContainerComponent.Inner>
    </ContainerComponent>
}