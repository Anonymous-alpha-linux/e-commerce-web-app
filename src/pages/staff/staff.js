import React from 'react';
import { ContainerComponent, Textarea, Form, ButtonComponent } from '../../components';

export default function Staff() {
    return (
        <ContainerComponent>
            {/* Workspace */}
            <ContainerComponent
                style = {{
                    background: 'black'
                }}
            >
                <ContainerComponent.Item>
                    <p>Author</p>
                    <p>Date</p>
                </ContainerComponent.Item>

                <Textarea.Container>
                    <Textarea.Input
                        placeholder="Post Textarea"
                        type='textarea'
                        name="post"
                        style={{
                            width: '700px',
                            height: '200px',
                            top: '50%',
                            left: '0'
                        }}
                    />
                </Textarea.Container>

                <ContainerComponent.Grid columns={3}>
                    <ContainerComponent.Item>
                        <p>Thump up</p>
                    </ContainerComponent.Item>
                    <ContainerComponent.Item>
                        <p>Thump down</p>
                    </ContainerComponent.Item>
                </ContainerComponent.Grid>
                <ContainerComponent.Item>
                        <p>Comment</p>
                    </ContainerComponent.Item>
            </ContainerComponent>

            {/* Post model */}
            <Form>
                <Form.Title
                    style = {{
                        border: '0',
                    }}
                >Post model</Form.Title>
                <Form.Container>
                    <Form.Textarea
                        placeholder="Post"
                        type='textarea'
                        name="post"
                        style={{
                            width: '100%',
                            height: '250px',
                        }}
                    />
                    <Form.Container>
                        <Form.Input
                            type='checkbox'
                        />checkbox
                    </Form.Container>
                    <Form.Button>Upload</Form.Button>
                    <Form.Button>Summit</Form.Button>
                </Form.Container>
            </Form>

            {/* Profile */}
            <ContainerComponent
                style = {{
                    background: 'grey'
                }}
            >
                <ContainerComponent.Item>
                    <p>Avatar</p>
                    <p>Infomation</p>
                </ContainerComponent.Item>
                <ButtonComponent>Edit</ButtonComponent>
                <ButtonComponent>Save</ButtonComponent>
            </ContainerComponent>

            {/* Notification */}
            <ContainerComponent
                style = {{
                    background: 'black'
                }}
            >
                <ContainerComponent.Item>
                    <h3>Notification</h3>
                </ContainerComponent.Item>
                <ContainerComponent.Flex>
                    <ContainerComponent.MiddleInner>
                        <ContainerComponent.Item>
                            <h4>Noti 1</h4>
                        </ContainerComponent.Item>
                        <ContainerComponent.Inner>
                            <ContainerComponent.Item>
                                <p>bla bla bla</p>
                            </ContainerComponent.Item>
                        </ContainerComponent.Inner>
                    </ContainerComponent.MiddleInner>

                    <ContainerComponent.MiddleInner>
                        <ContainerComponent.Item>
                            <h4>Noti 2</h4>
                        </ContainerComponent.Item>
                        <ContainerComponent.Inner>
                            <ContainerComponent.Item>
                                <p>bla bla bla</p>
                            </ContainerComponent.Item>
                        </ContainerComponent.Inner>
                    </ContainerComponent.MiddleInner>

                    <ContainerComponent.MiddleInner>
                        <ContainerComponent.Item>
                            <h4>Noti 3</h4>
                        </ContainerComponent.Item>
                        <ContainerComponent.Inner>
                            <ContainerComponent.Item>
                                <p>bla bla bla</p>
                            </ContainerComponent.Item>
                        </ContainerComponent.Inner>
                    </ContainerComponent.MiddleInner>
                </ContainerComponent.Flex>
            </ContainerComponent>

            {/* Q&A */}


        </ContainerComponent>
    );
}
