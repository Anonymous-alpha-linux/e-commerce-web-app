import React, { useEffect, useState } from 'react';
import { ContainerComponent, Icon, ButtonComponent, Form, Text } from '../components';
import { BsFillPersonFill } from 'react-icons/bs';
import { useAuthorizationContext, useWorkspaceContext } from '../redux';
import { mainAPI } from '../config';

export default function Personal({ personalInfo }) {
    const { user } = useAuthorizationContext();
    const { workspace } = useWorkspaceContext();
    const [postAPI, host] = process.env.REACT_APP_ENVIRONMENT === 'development' ? [mainAPI.LOCALHOST_STAFF, mainAPI.LOCALHOST_HOST] : [mainAPI.CLOUD_API_STAFF, mainAPI.CLOUD_HOST];
    const [isEdit, setIsEdit] = useState(false);
    useEffect(() => {
        console.log(user, workspace);
    }, []);

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
                        <ButtonComponent>Information</ButtonComponent>
                    </ContainerComponent.Item>
                    <ContainerComponent.Item>
                        <ButtonComponent>My Post</ButtonComponent>
                    </ContainerComponent.Item>
                    <ContainerComponent.Item>
                        <ButtonComponent>Feedback</ButtonComponent>
                    </ContainerComponent.Item>
                </ContainerComponent.GridThreeColumns>
            </ContainerComponent.Pane>
            <ContainerComponent.Pane style={{
                padding: '20px 0'
            }}>
                <Text.Title style={{
                    lineHeight: '2px',
                    textIndent: '10px',
                    transform: 'translateY(20px)',
                }}>Profile</Text.Title>
                <Form.TextArea placeholder="Your introduction"
                    rows={15}
                    style={{
                        width: '100%',
                        borderRadius: '20px',
                        padding: '30px 0 0 10px'
                    }}
                    value={"NAME"}></Form.TextArea>
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
                <Form.Input placeholder="Post your information" style={{
                    textAlign: 'right',
                }} value={"NAME"}></Form.Input>

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
                <Form.Input placeholder="Choose Date" type="date" style={{
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
                <Form.Input placeholder="Post your information" style={{
                    textAlign: 'right',
                }} value={user.email}></Form.Input>
            </ContainerComponent.Pane>

            {isEdit && <ButtonComponent 
            onClick={() => setIsEdit(false)}
            style={{width: '30%', maxWidth: '80px'}}>
                Save
            </ButtonComponent>
            ||  <ButtonComponent style={{width: '30%', maxWidth: '80px'}} 
            onClick={() => setIsEdit(true)}>
                Edit
            </ButtonComponent>}
        
        </ContainerComponent.Inner>
    </ContainerComponent>
}