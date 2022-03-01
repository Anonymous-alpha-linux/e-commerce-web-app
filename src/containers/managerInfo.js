import React from 'react';
import { ContainerComponent, Icon, ButtonComponent, Form, Text } from '../components';
import { BsFillPersonFill } from 'react-icons/bs';
import { useWorkspaceContext } from '../redux';

export default function ManagerInfo() {
    const { workspace } = useWorkspaceContext();
    const { profileImage, username, email, role: { roleName }, } = workspace.manager;
    // return <ContainerComponent.Section className="managerInfo__container" style={{
    //     padding: '10px',
    // }}>
    //     <ContainerComponent.Inner>
    //         <ContainerComponent.Grid columns={3}>
    //             <ContainerComponent.Item>
    //             </ContainerComponent.Item>
    //             <ContainerComponent.Item style={{ alignItems: 'center' }}>
    //                 <Icon.CircleIcon>
    //                     <Icon.Image src={workspace.manager.profileImage}></Icon.Image>
    //                 </Icon.CircleIcon>
    //                 <Text.Subtitle>{workspace.manager.username}</Text.Subtitle>
    //                 <Text.Subtitle>Digital Marketing</Text.Subtitle>
    //                 <Text.Paragraph>
    //                     Manager Name
    //                     Manager Age
    //                 </Text.Paragraph>
    //             </ContainerComponent.Item>
    //             <ContainerComponent.Item>
    //             </ContainerComponent.Item>
    //         </ContainerComponent.Grid>
    //     </ContainerComponent.Inner>
    // </ContainerComponent.Section>
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
                        <Icon.Image src={`${profileImage}`} alt={`Avatar`} style={{
                            objectFit: 'fill',
                        }}></Icon.Image>
                    </Icon.CircleIcon>
                    <Text.CenterLine style={{
                        paddingTop: '10px'
                    }}>
                        <Text.Title>{username}</Text.Title>
                        <Text.Subtitle style={{
                            textTransform: 'capitalize',
                            opacity: 0.5,
                            fontWeight: 500
                        }}>{roleName}</Text.Subtitle>
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
                }} value={email}></Form.Input>

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
                <Form.Input placeholder="Choose Date" type="date" style={{
                    textAlign: 'right',
                }}></Form.Input>
            </ContainerComponent.Pane>
        </ContainerComponent.Inner>
    </ContainerComponent>
}