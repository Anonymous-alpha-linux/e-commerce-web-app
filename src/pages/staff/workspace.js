import React from 'react';
import { ContainerComponent } from '../../components';
import { PostContainer, PostForm, Comment, Timespan, PostModal } from '../../containers';


export default function Workspace() {
    return <ContainerComponent>
        <PostForm></PostForm>
        <PostContainer></PostContainer>
        <Comment></Comment>
        {/* <Timespan></Timespan> */}
        <PostContainer></PostContainer>
        <PostModal></PostModal>
    </ContainerComponent>;
}   