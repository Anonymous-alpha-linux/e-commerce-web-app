import React from 'react';
import { ContainerComponent } from '../../components';
import { PostContainer, Timespan, PostModal } from '../../containers';

export default function Workspace() {
    return <ContainerComponent>
        <Timespan></Timespan>
        <PostContainer></PostContainer>
        <PostModal></PostModal>
    </ContainerComponent>;
}