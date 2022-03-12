import React from 'react'
import { ContainerComponent } from '../../components'
import { useWorkspaceContext } from '../../redux'

export default function Group() {
    const { workspace } = useWorkspaceContext();
    return (
        <ContainerComponent>
            <h1>This is The list of workspace</h1>

        </ContainerComponent>
    )
}
