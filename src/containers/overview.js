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
        <ContainerComponent>
            <ContainerComponent.GridThreeColumns style={{ color: 'white', justifyContent: 'center', width: '100%', fontSize: '12px', gridTemplateColumns: `${device === media.MOBILE ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}` }}>
                <ContainerComponent.Item >
                    <div className="square" style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'green',
                        padding: '20px',
                        borderRadius: '20px'
                    }}>
                        <Text.CenterLine>
                            {totalWorkspace}
                        </Text.CenterLine>
                        <Text.CenterLine>
                            Total Workspace
                        </Text.CenterLine>
                    </div>
                </ContainerComponent.Item>
                <ContainerComponent.Item>
                    <div className="square" style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'green',
                        padding: '20px',
                        borderRadius: '20px'
                    }}>
                        <Text.CenterLine>
                            {totalPost}
                        </Text.CenterLine>
                        <Text.CenterLine>
                            Total Post
                        </Text.CenterLine>
                    </div>
                </ContainerComponent.Item>
                <ContainerComponent.Item>
                    <div className="square" style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'green',
                        padding: '20px',
                        borderRadius: '20px'
                    }}>
                        <Text.CenterLine>
                            {totalUser}
                        </Text.CenterLine>
                        <Text.CenterLine>
                            Total User
                        </Text.CenterLine>
                    </div>
                </ContainerComponent.Item>
            </ContainerComponent.GridThreeColumns>
        </ContainerComponent>
    )
}
