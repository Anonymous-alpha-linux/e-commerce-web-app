import React, { useEffect } from 'react'

import { ContainerComponent, Text } from '../components'
import { useMedia } from '../hooks';
import { useAdminContext, useWorkspaceContext } from '../redux'
import { media } from '../fixtures';

export default function DashboardOverview() {
    const { totalWorkspace, totalPost, totalUser, getDashBoardOverview } = useAdminContext();
    const device = useMedia(420, 1080);
    useEffect(() => {
        getDashBoardOverview(data => {
            console.log(data);
        });
    }, []);
    return (
        <ContainerComponent style={{borderRadius:"10px"}}>
            <ContainerComponent.Inner style={{width:"100%"}}>
                <Text.Title className="overview__title">OverView</Text.Title>
            </ContainerComponent.Inner>
            <ContainerComponent.GridThreeColumns style={{ color: 'white',alignContent:"center", justifyContent: 'center', width: '100%', fontSize: '12px', gridTemplateColumns: `${device === media.MOBILE ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}` }}>
                <ContainerComponent.Item className="overview__square">
                        <Text.CenterLine style={{fontSize:'25px',fontWeight:"600"}}>
                            {totalWorkspace}    
                        </Text.CenterLine>
                        <Text.CenterLine className="overview__text">
                            Total Workspace
                        </Text.CenterLine>
                </ContainerComponent.Item>
                <ContainerComponent.Item className="overview__square">
                    <Text.CenterLine style={{ fontSize: '25px', fontWeight: "600" }}>
                            {totalPost}
                        </Text.CenterLine>
                        <Text.CenterLine className="overview__text">
                            Total Post
                        </Text.CenterLine>
                </ContainerComponent.Item>
                <ContainerComponent.Item className="overview__square">
                    <Text.CenterLine style={{ fontSize: '25px', fontWeight: "600" }}>
                            {totalUser}
                        </Text.CenterLine>
                        <Text.CenterLine className="overview__text">
                            Total User
                        </Text.CenterLine>
                </ContainerComponent.Item>
            </ContainerComponent.GridThreeColumns>
        </ContainerComponent>
    )
}
