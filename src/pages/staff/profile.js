import React from 'react';
import { ContainerComponent } from '../../components';
import {Personal} from '../../containers'
import {ManagerInfo} from '../../containers'

export default function Profile() {
<<<<<<< HEAD
    return <>
        {/* Personal */}
        This is profile
        {/* ManagerInfo */}
    </>;
=======
    return <ContainerComponent>
    <Personal></Personal>;
    <ManagerInfo></ManagerInfo>
    </ContainerComponent>
>>>>>>> 214104fe73bd7a877829f26cc93e5b1444beaee1
}
