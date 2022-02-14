import React, { useState } from 'react';
import { ContainerComponent, Icon, Text } from '../components';
import { useAuthorizationContext } from '../redux';

export default function Post() {

    return <ContainerComponent style={{
        padding: '20px'
    }}>
        <ContainerComponent.Inner>
            <ContainerComponent.Pane>
                <Icon.CircleIcon>
                    Avatar
                </Icon.CircleIcon>
                <ContainerComponent.Pane>
                    <Text.Title>Staff Name</Text.Title>
                    <Text.Date>20: 20</Text.Date>
                    <Icon>Earth</Icon>
                </ContainerComponent.Pane>
            </ContainerComponent.Pane>
            <ContainerComponent.Pane>
                <Text.Paragraph>
                    Một cảm xúc gì đó rất lạ, một cái chất rất khó tả ở Hải Bột, một người nghệ sĩ rất “nghệ sĩ”!
                    Anh cũng là một gã “gàn dở”, nhưng cũng là một kẻ vô tư, treo ngược tâm hồn mình cheo leo ở đâu đó tận trên mây, như một nhà thơ.
                </Text.Paragraph>
                {/* Preview */}
            </ContainerComponent.Pane>
            <ContainerComponent.Pane>
                {/* {Like, Dislike} */}
            </ContainerComponent.Pane>
        </ContainerComponent.Inner>
    </ContainerComponent>;
}
