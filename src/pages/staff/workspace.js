import React from 'react';
import { ContainerComponent } from '../../components';
import { PostContainer, Timespan } from '../../containers';

export default function Workspace() {
    return <ContainerComponent>
        <Timespan></Timespan>
        <PostContainer></PostContainer>
    </ContainerComponent>;
}