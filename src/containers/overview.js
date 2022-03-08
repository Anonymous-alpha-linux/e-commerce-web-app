import React from 'react'

import { ContainerComponent, Text } from '../components'

export default function DashboardOverview() {
    return (
        <ContainerComponent >
            <ContainerComponent.GridThreeColumns style={{ color: 'white', justifyContent: 'center', width: '100%', minWidth: '360px', fontSize: '12px' }}>
                <ContainerComponent.Item >
                    <div className="square" style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'green',
                        padding: '20px',
                        borderRadius: '20px'
                    }}>
                        <Text.CenterLine>
                            50
                        </Text.CenterLine>
                        <Text.CenterLine>
                            Total WKS
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
                            100
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
                            150
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
