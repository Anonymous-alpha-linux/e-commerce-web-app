import React from 'react'
import { ContainerComponent } from '../../components'
import { useWorkspaceContext } from '../../redux';

function WorkspaceOverview() {
    console.log(useWorkspaceContext());
    return (
        <ContainerComponent>
            <ContainerComponent.GridThreeColumns>
                <ContainerComponent.GridThreeColumns>
                    <ContainerComponent.Item></ContainerComponent.Item>
                </ContainerComponent.GridThreeColumns>
            </ContainerComponent.GridThreeColumns>
        </ContainerComponent>
    )
}

export default WorkspaceOverview