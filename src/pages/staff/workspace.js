import React from 'react';
import { ContainerComponent } from '../../components';
import { PostContainer, PostForm, Comment } from '../../containers';

export default function Workspace() {
    return <ContainerComponent>
        <PostForm></PostForm>
        <PostContainer></PostContainer>
        <Comment></Comment>
    </ContainerComponent>;
}