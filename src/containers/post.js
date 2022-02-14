import React from 'react';
import { ContainerComponent, Form, Icon, Text } from '../components';
import { IoEarth} from 'react-icons/io5';
import { BiFilterAlt} from 'react-icons/bi'


export default function Post() {
    return <ContainerComponent style={{
        padding: '20px'
    }}>
        <ContainerComponent.Inner style={{
            height:"70px",
            background: "#EEF5EB",
            color:"black",
            padding:"5px"
        }}>
            <ContainerComponent.Flex>
                <ContainerComponent.Item style={{
                    padding: "0",
                }}>
                    <Icon style={{paddingRight:"10px"}}>
                        <IoEarth style={{
                            fontSize : "60px"
                        }}></IoEarth>
                    </Icon>
                </ContainerComponent.Item>
                <ContainerComponent.Item style={{ padding: "0", flexGrow: "1"}} >
                    <Text.Title style={{marginBottom:"3px",paddingLeft:"2px"}}>Staff Name</Text.Title>
                    <Form.Input placeholder="Create Your Post" 
                    style={{
                        height:"16px",
                        borderRadius:"10px",
                        width:"100%",
                    }}
                    ></Form.Input>
                </ContainerComponent.Item>
                <ContainerComponent.Item style={{ padding: "0",display:"flex",alignItems:"flex-end"}}>
                    <Icon style={{margin:"5px 7px"}}>
                        <BiFilterAlt style={{
                            fontSize:"35px",
                        }}></BiFilterAlt>
                    </Icon>
                </ContainerComponent.Item>
            </ContainerComponent.Flex>
        </ContainerComponent.Inner>
        <ContainerComponent.Inner>
            <ContainerComponent.Pane>
                <ContainerComponent.Flex 
                style={{
                    alignItems: 'center',
                    gap: "15px"
                }}>
                    <ContainerComponent.Item style={{
                        padding: "0",
                    }}>
                        <Icon.CircleIcon>
                        </Icon.CircleIcon>
                    </ContainerComponent.Item>
                    <ContainerComponent.Item 
                    style={{
                        width: "130px",
                        display : "flex",
                        flexWrap: "wrap",
                        padding: "0"
                    }}>
                        <Text.Title>Staff Name</Text.Title>
                        <ContainerComponent.Pane style={{
                            display: "flex",
                            alignItems: "center",
                        }}>
                            <Text.Date style={{
                                margin : "0"
                            }}>20:20</Text.Date>
                            <Icon style={{
                                padding: "2px 0 0 10px",
                                fontSize: "15px"
                            }}>
                                <IoEarth></IoEarth>
                            </Icon>
                        </ContainerComponent.Pane>
                    </ContainerComponent.Item>
                </ContainerComponent.Flex>
            </ContainerComponent.Pane>
            <ContainerComponent.Pane>
                <Text.Paragraph>
                    Một cảm xúc gì đó rất lạ, một cái chất rất khó tả ở Hải Bột,
                    một người nghệ sĩ rất “nghệ sĩ”! Anh cũng là một gã “gàn dở”
                    , nhưng cũng là một kẻ vô tư, treo ngược tâm hồn mình cheo 
                    leo ở đâu đó tận trên mây, như một nhà thơ.
                </Text.Paragraph>
                <ContainerComponent.Pane>
                    <ContainerComponent.Item>
                        
                    </ContainerComponent.Item>
                </ContainerComponent.Pane>
            </ContainerComponent.Pane>
            <ContainerComponent.Pane>
                {/* {Like, Dislike} */}
            </ContainerComponent.Pane>
        </ContainerComponent.Inner>
    </ContainerComponent>;
}
