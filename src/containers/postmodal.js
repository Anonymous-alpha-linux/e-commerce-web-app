import React from 'react';
import { ButtonComponent, ContainerComponent, Form, Icon, MessageBox, Text } from '../components';
import ConditionContainer from './condition';

import { AiOutlineCloudUpload } from 'react-icons/ai';

export default function PostModal() {
    const [openCondition, setOpenCondition] = React.useState(false)

    return <ContainerComponent style={{
        padding: '20px'
    }}>
        <ContainerComponent.Inner>
            <ContainerComponent.Pane>
                <ContainerComponent.Pane>
                    <Text.Title>Post Modal</Text.Title>
                    <Text.Subtitle>Author name: Staff</Text.Subtitle>
                    <Form.TextArea
                        style = {{
                            width: '100%',
                            height: '100px'
                        }}
                    ></Form.TextArea>
                    
                    <ContainerComponent.Flex>
                        <ContainerComponent.Item>
                            <Form.Checkbox></Form.Checkbox>
                        </ContainerComponent.Item>
                        <ContainerComponent.Item>
                            <ContainerComponent.Pane>
                                <Text.Paragraph
                                    style = {{
                                        margin: '0'
                                    }}
                                >Private Post</Text.Paragraph>
                            </ContainerComponent.Pane>
                        </ContainerComponent.Item>
                    </ContainerComponent.Flex>

                    <ContainerComponent.Flex>
                        <ContainerComponent.Item>
                            <Icon
                                style ={{
                                    fontSize: '30px'
                                }}
                            >
                                <AiOutlineCloudUpload></AiOutlineCloudUpload>
                            </Icon>
                        </ContainerComponent.Item>
                        <ContainerComponent.Item
                            style = {{
                                padding: '20px'
                            }}
                        >
                            <ButtonComponent.Upload>
                                Upload your content
                            </ButtonComponent.Upload>
                        </ContainerComponent.Item>
                    </ContainerComponent.Flex>

                    

                    <ContainerComponent.Flex>
                        <ContainerComponent.Item>
                            <Form.Checkbox></Form.Checkbox>
                        </ContainerComponent.Item>
                        <ContainerComponent.Item>
                            <ContainerComponent.Pane>
                                <Text.Paragraph
                                    onClick = {() => setOpenCondition(!openCondition)}
                                    style = {{
                                        color: 'blue',
                                        margin: '0'
                                    }}
                                >Condition and Term</Text.Paragraph>
                            </ContainerComponent.Pane>
                        </ContainerComponent.Item>
                        {openCondition && <ConditionContainer></ConditionContainer>}
                    </ContainerComponent.Flex>

                    <MessageBox.TextMessage>
                        Message Box Text
                    </MessageBox.TextMessage>

                    <ContainerComponent.Item></ContainerComponent.Item>
                    
                    <ButtonComponent.Summit>
                        Summit
                    </ButtonComponent.Summit>
                </ContainerComponent.Pane>
            </ContainerComponent.Pane>
        </ContainerComponent.Inner>
    </ContainerComponent>
}