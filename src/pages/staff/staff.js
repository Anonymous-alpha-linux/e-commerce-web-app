import React from 'react';
import { AddGroupContainer, MessageBoxContainer } from '../../containers';
import MessageContainer from '../../containers/message';
import Profile from './profile';
import Workspace from './workspace';
import { Outlet } from 'react-router-dom';
import PostUpContainer from '../../containers/popUp/popUp';

export default function Staff() {
    return <>
        <PostUpContainer title={"success!"}></PostUpContainer>
        <AddGroupContainer></AddGroupContainer>
        <MessageBoxContainer></MessageBoxContainer>
        <MessageContainer></MessageContainer>
        <Outlet></Outlet>
    </>;
}
