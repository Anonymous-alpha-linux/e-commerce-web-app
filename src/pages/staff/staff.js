import React from 'react';
import { AddGroupContainer, MessageBoxContainer } from '../../containers';
import MessageContainer from '../../containers/message';
import Profile from './profile';
import Workspace from './workspace';
import { Outlet } from 'react-router-dom';

export default function Staff() {
    return <>
        <AddGroupContainer></AddGroupContainer>
        <MessageBoxContainer></MessageBoxContainer>
        <MessageContainer></MessageContainer>
        <Outlet></Outlet>
    </>;
}
