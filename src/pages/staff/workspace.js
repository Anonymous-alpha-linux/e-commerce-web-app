import React from 'react';
import { ContainerComponent } from '../../components';
import { PostContainer, PostForm, Comment, Timespan, PostModal, Filter } from '../../containers';

export default function Workspace() {
    return <ContainerComponent>
        <Filter></Filter>
        <PostForm></PostForm>
        <PostContainer></PostContainer>
        <Comment></Comment>
        {/* <Timespan></Timespan> */}
        <PostContainer></PostContainer>
        <PostModal></PostModal>
    </ContainerComponent>;
}   
