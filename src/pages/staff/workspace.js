import React from 'react';
import { ContainerComponent } from '../../components';
import { PostContainer } from '../../containers';

export default function Workspace() {
    return <ContainerComponent>
        <PostContainer></PostContainer>
    </ContainerComponent>;
}