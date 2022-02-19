import React from 'react';
import { AddGroupContainer, MessageBoxContainer } from '../../containers';
import MessageContainer from '../../containers/message';
import Profile from './profile';
import Workspace from './workspace';

export default function Staff() {
    return <>
        <AddGroupContainer></AddGroupContainer>
        <MessageBoxContainer></MessageBoxContainer>
        <MessageContainer></MessageContainer>
        <Workspace></Workspace>
        <Profile></Profile>
    </>;
}
