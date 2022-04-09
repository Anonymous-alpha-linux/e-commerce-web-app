import React, { useEffect, useRef } from 'react'
import { ButtonComponent, ContainerComponent, Text } from '../../components'
import { media } from '../../fixtures';
import { useMedia } from '../../hooks';
import { useAuthorizationContext, useWorkspaceContext } from '../../redux';

function WorkspaceOverview() {
    const { workspace: { memberNumber, postNumber, newestPostNumber }, onLoadWorkspace } = useWorkspaceContext();
    const { user } = useAuthorizationContext();

    const firstMountedRef = useRef(true);

    const device = useMedia(520, 720);

    useEffect(() => {
        if (!firstMountedRef.current) {
            onLoadWorkspace();
        }
        firstMountedRef.current = false;
    }, [user.workspace]);

    return (
        <ContainerComponent style={{ borderRadius: "10px" }}>
            <ContainerComponent.Inner style={{ width: "100%" }}>
                <Text.Title className="overview__title">OverView</Text.Title>
            </ContainerComponent.Inner>
            <ContainerComponent.GridThreeColumns style={{ color: 'white', alignContent: "center", justifyContent: 'center', width: '100%', fontSize: '12px', gridTemplateColumns: `${device === media.MOBILE ? 'repeat(1, 1fr)' : device === media.TABLET ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}` }}>
                {/* <ContainerComponent.Item className="overview__square">
                    <Text.CenterLine style={{ fontSize: '25px', fontWeight: "600" }}>
                        {totalWorkspace}
                    </Text.CenterLine>
                    <Text.CenterLine className="overview__text">
                        Total Workspace
                    </Text.CenterLine>
                </ContainerComponent.Item> */}
                <ContainerComponent.Item className="overview__square">
                    <Text.CenterLine style={{ fontSize: '25px', fontWeight: "600" }}>
                        {postNumber}.3k
                        <Text.MiddleLine style={{ marginLeft: '10px', verticalAlign: 'text-top' }}>
                            <ButtonComponent style={{ background: '#fff', color: 'green', fontWeight: '600', fontSize: '0.4em', padding: "5px 10px" }}>+{newestPostNumber} NEW <Text.Line style={{ fontSize: '0.8em', fontStyle: 'italic' }}> after 15 days</Text.Line></ButtonComponent>
                        </Text.MiddleLine>
                    </Text.CenterLine>
                    <Text.CenterLine className="overview__text">
                        Total Post
                    </Text.CenterLine>
                </ContainerComponent.Item>
                <ContainerComponent.Item className="overview__square">
                    <Text.CenterLine style={{ fontSize: '25px', fontWeight: "600" }}>
                        {memberNumber}
                    </Text.CenterLine>
                    <Text.CenterLine className="overview__text">
                        Total Contributor
                    </Text.CenterLine>
                </ContainerComponent.Item>
            </ContainerComponent.GridThreeColumns>
        </ContainerComponent>
    )
}

export default WorkspaceOverview