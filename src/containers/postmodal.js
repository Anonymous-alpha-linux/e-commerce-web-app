import React from 'react';
import { ButtonComponent, ContainerComponent, Form, Icon, MessageBox, Text } from '../components';
import ConditionContainer from './condition';

import { AiOutlineCloudUpload } from 'react-icons/ai';
import UploadForm from './uploadpreview';

export default function PostModal() {
    const [openCondition, setOpenCondition] = React.useState(false)

    return <ContainerComponent.Section style={{
        // position: 'fixed',
        top: 0,
        left: 0,
        width: '100%'
    }}>
        <ContainerComponent.Inner>
            <Form>
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
                            {/* uploadpreview */}
                            <UploadForm></UploadForm>
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
                    
                    <ButtonComponent.Submit>
                        Submit
                    </ButtonComponent.Submit>

            </Form>
        </ContainerComponent.Inner>
    </ContainerComponent.Section>
}