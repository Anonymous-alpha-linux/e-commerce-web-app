import React from 'react';
import { ContainerComponent } from '../components';

export default function Navigation() {
    return (
        <ContainerComponent.Grid columns={3}>
            <ContainerComponent.Item>
                <h1>This is logo</h1>
            </ContainerComponent.Item>
            <ContainerComponent.Item>
                <ContainerComponent.Inner>
                    <ContainerComponent.Flex>
                        <h1>This is Navlinks</h1>
                    </ContainerComponent.Flex>
                </ContainerComponent.Inner>
            </ContainerComponent.Item>
            <ContainerComponent.Item>
                <h1>This is Cart</h1>
            </ContainerComponent.Item>
        </ContainerComponent.Grid>
    )
}
