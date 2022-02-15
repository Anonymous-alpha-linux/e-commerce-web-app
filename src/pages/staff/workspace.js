import React, { useEffect, useState } from 'react';
import { ContainerComponent } from '../../components';
import { PostContainer, PostForm, Timespan } from '../../containers';


export default function Workspace() {
    return <>
        <Timespan></Timespan>
        <PostForm></PostForm>
        <PostContainer></PostContainer>
    </>;
}   