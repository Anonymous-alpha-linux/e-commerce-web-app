import React from 'react';
import { ButtonComponent, ContainerComponent, Form, Icon, MessageBox, Text } from '../components';
import ConditionContainer from './condition';

import { FaChevronLeft } from "react-icons/fa";
import UploadForm from './uploadpreview';

export default function PostModal({ setOpenModal }) {
    const [openCondition, setOpenCondition] = React.useState(false);
    const [error, setError] = React.useState('');

    return <ContainerComponent.Section className="postModal__container" style={{
        position: 'fixed',
        top: '50px',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: 10000,
        padding: '10px',
        background: '#fff',
        overflowY: 'scroll',
        paddingBottom: '50px'
    }}>
        <Form encType='multipart/form-data' style={{
            borderRadius: '20px',
            background: '#fff',
        }}>
            <Text onClick={() => setOpenModal(modal => !modal)}>
                <Text.Middle>
                    <Icon style={{ display: 'inline' }}>
                        <FaChevronLeft></FaChevronLeft>
                    </Icon>
                </Text.Middle>
                <Text.Middle style={{
                    verticalAlign: 'text-top'
                }}>
                    Back
                </Text.Middle>
            </Text>
            <Text.Title style={{
                textAlign: 'right'
            }}>Post Modal</Text.Title>
            <Text.Label>Author name: <Text.Middle>
                <Text.Bold>Staff</Text.Bold>
            </Text.Middle>
            </Text.Label>
            <Form.TextArea
                style={{
                    width: '100%',
                    height: '100px'
                }}
            ></Form.TextArea>
            <Text.Line>
                <Text.Middle>
                    <Form.Checkbox></Form.Checkbox>
                </Text.Middle>
                <Text.Middle>
                    Private Post
                </Text.Middle>
            </Text.Line>
            <ContainerComponent.Pane className="upload__input" style={{
                padding: '10px 0'
            }}>
                <UploadForm></UploadForm>
            </ContainerComponent.Pane>
            <Text.Line>
                <Text.Middle>
                    <Form.Checkbox></Form.Checkbox>
                </Text.Middle>
                <Text.Middle>
                    <Text.Paragraph
                        onClick={() => setOpenCondition(true)}
                        style={{
                            color: 'blue',
                            margin: '0'
                        }}
                    >Condition and Term</Text.Paragraph>
                </Text.Middle>
            </Text.Line>
            {openCondition && <ConditionContainer closeCondition={() => setOpenCondition(false)}></ConditionContainer>}
            {error && <MessageBox.TextMessage>
                {error}
            </MessageBox.TextMessage>}
            <Form.Input type='submit' value={'Submit'}></Form.Input>
        </Form>
    </ContainerComponent.Section>
}
