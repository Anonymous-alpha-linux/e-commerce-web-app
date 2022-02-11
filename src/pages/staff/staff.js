import React from 'react';
import Profile from './profile';
import Workspace from './workspace';
import QA from './qa';

export default function Staff() {
    return <>
        <Workspace></Workspace>
        <Profile></Profile>
        <QA></QA>
    </>;
}
