import React, { useRef, useState } from 'react';
import { ContainerComponent, Icon, ButtonComponent, Form, Text } from '../components';
import { useAuthorizationContext, useWorkspaceContext } from '../redux';
import { mainAPI } from '../config';
import { Link, useLocation } from 'react-router-dom';

export default function Personal({ personalInfo }) {
    const { user, profile, editProfile } = useAuthorizationContext();
    console.log(profile);
    const { workspace } = useWorkspaceContext();
    const [postAPI, host] = process.env.REACT_APP_ENVIRONMENT === 'development' ? [mainAPI.LOCALHOST_STAFF, mainAPI.LOCALHOST_HOST] : [mainAPI.CLOUD_API_STAFF, mainAPI.CLOUD_HOST];
    const [isEdit, setIsEdit] = useState(false);

    const [input, setInput] = useState({
        firstName: profile?.firstName || '',
        lastName: profile?.lastName || '',
        address: profile?.address || '',
        phone: profile?.phone || '',
        introduction: profile?.introduction || '',
        gender: profile?.gender || 'male',
        age: profile?.age || 0,
        birth: ''
    });
    const location = useLocation();
    const titleRef = useRef();

    const inputHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }
    const submitHandler = (e) => {
        e.preventDefault();
        return editProfile(input);
    }

    return <ContainerComponent
        className="personal"
        style={{
            padding: '10px'
        }}>
        <ContainerComponent.Inner>
            <ContainerComponent.Pane style={{
                position: 'relative',
            }}>
                <Text.CenterLine style={{ position: 'relative', zIndex: 1, height: '27.5px' }}>
                    <Icon.CircleIcon className="personal__avatar">
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
                    <Text.Title
                        className={"personal__title"}
                        forwardedRef={titleRef}
                    >Profile</Text.Title>
                    <Form.TextArea placeholder="Some your introduction"
                        rows={15}
                        name={'introduction'}
                        onChange={inputHandler}
                        onScroll={(e) => {
                            if (e.target.scrollTop > 10) titleRef.current.style.opacity = '0';
                            else titleRef.current.style.opacity = '1';
                        }}
                        style={{
                            width: '100%',
                            borderRadius: '20px',
                            padding: '30px 0 0 10px'
                        }}
                        disabled={!isEdit}
                        value={input.introduction}></Form.TextArea>

                    <Text.MiddleLine style={{
                        lineHeight: 0,
                        textIndent: '5px',
                        transform: 'translateY(25px)',
                        fontWeight: 800
                    }}>
                        <Text.Label>
                            First name
                        </Text.Label>
                    </Text.MiddleLine>
                    <Form.Input style={{
                        textAlign: 'right',
                    }}
                        name="firstName"
                        onChange={inputHandler}
                        value={input.firstName}
                        disabled={!isEdit}></Form.Input>

                    <Text.MiddleLine style={{
                        lineHeight: 0,
                        textIndent: '5px',
                        transform: 'translateY(25px)',
                        fontWeight: 800
                    }}>
                        <Text.Label>
                            Last name
                        </Text.Label>
                    </Text.MiddleLine>
                    <Form.Input style={{
                        textAlign: 'right',
                    }}
                        name="lastName"
                        onChange={inputHandler}
                        value={input.lastName}
                        disabled={!isEdit}></Form.Input>

                    <Text.MiddleLine style={{
                        lineHeight: 0,
                        textIndent: '5px',
                        transform: 'translateY(25px)',
                        fontWeight: 800
                    }}>
                        <Text.Label>
                            Phone
                        </Text.Label>
                    </Text.MiddleLine>
                    <Form.Input style={{
                        textAlign: 'right',
                    }}
                        name="phone"
                        onChange={inputHandler}
                        value={input.phone}
                        disabled={!isEdit}></Form.Input>

                    <Text.MiddleLine style={{
                        lineHeight: 0,
                        textIndent: '5px',
                        transform: 'translateY(25px)',
                        fontWeight: 800
                    }}>
                        <Text.Label>
                            Address
                        </Text.Label>
                    </Text.MiddleLine>
                    <Form.Input style={{
                        textAlign: 'right',
                    }}
                        name="address"
                        onChange={inputHandler}
                        value={input.address}
                        disabled={!isEdit}></Form.Input>

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
                        disabled={!isEdit}
                        value={input.gender}
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
                    {/* Date of birth */}
                    <Text.MiddleLine style={{
                        lineHeight: 0,
                        textIndent: '5px',
                        transform: 'translateY(25px)',
                        fontWeight: 800
                    }}>
                        <Text.Label>
                            {isEdit ? 'Day of Birth' : 'Age'}
                        </Text.Label>
                    </Text.MiddleLine>
                    <Form.Input
                        type={isEdit ? "date" : "text"}
                        onChange={inputHandler}
                        name={'birth'}
                        disabled={!isEdit}
                        value={!isEdit ? input.age : input.birth}
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
                        disabled={true}></Form.Input>

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
                        value={workspace.workTitle}
                        name='department'
                        disabled={true}
                        style={{
                            textAlign: 'right',
                        }}></Form.Input>
                </ContainerComponent.Pane>
                <Text.RightLine>
                    {isEdit && <>
                        <Form.Input
                            type='submit'
                            style={{ display: 'none' }}
                            onClick={(e) => {
                                submitHandler(e);
                                setIsEdit(false);
                            }}>
                        </Form.Input>
                        <Text.Line>
                            <Text.MiddleLine>
                                <ButtonComponent
                                    style={{ cursor: 'pointer', marginBottom: '20px' }}
                                    onClick={() => setIsEdit(false)}>
                                    Cancel
                                </ButtonComponent>
                            </Text.MiddleLine>
                            <Text.MiddleLine>
                                <ButtonComponent style={{ cursor: 'pointer', marginBottom: '20px' }}
                                    onClick={() => { document.querySelector('input[type=submit]').click(); }}
                                >
                                    Save
                                </ButtonComponent>
                            </Text.MiddleLine>
                        </Text.Line>
                    </>
                        ||
                        <ButtonComponent
                            style={{ cursor: 'pointer', marginBottom: '20px' }}
                            onClick={() => setIsEdit(true)}>
                            Edit
                        </ButtonComponent>
                    }
                </Text.RightLine>
            </Form>
        </ContainerComponent.Inner>
    </ContainerComponent>
}