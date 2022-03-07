import React from 'react'
import { ContainerComponent, Text } from '../components';

export default function DashboardOverview() {
    return (
        <ContainerComponent className="overview">
            <ContainerComponent.GridThreeColumns>
                <ContainerComponent.Item style={{
                    flexGrow: 1,
                    width: '30%'
                }}>
                    <div className="square" style={{
                        width: '100%',
                        aspectRatio: 1 / 1,
                        background: '#000',
                        borderRadius: '20px',
                        padding: '20px'
                    }}>
                        <Text.CenterLine>
                            50
                        </Text.CenterLine>
                    </div>
                </ContainerComponent.Item>
                <ContainerComponent.Item style={{
                    flexGrow: 1,
                    width: '30%'
                }}>
                    <div className="square" style={{
                        width: '100%',
                        aspectRatio: 1 / 1,
                        background: '#000',
                        borderRadius: '20px',
                        padding: '20px'
                    }}>
                        <Text.CenterLine>
                            50
                        </Text.CenterLine>
                    </div>
                </ContainerComponent.Item>
                <ContainerComponent.Item style={{
                    flexGrow: 1,
                    width: '30%'
                }}>
                    <div className="square" style={{
                        width: '100%',
                        aspectRatio: 1 / 1,
                        background: '#000',
                        borderRadius: '20px',
                        padding: '20px'
                    }}>
                        <Text.CenterLine>
                            50
                        </Text.CenterLine>
                    </div>
                </ContainerComponent.Item>
                <ContainerComponent.Item style={{
                    flexGrow: 1,
                    width: '30%'
                }}>
                    <div className="square" style={{
                        width: '100%',
                        aspectRatio: 1 / 1,
                        background: '#000',
                        borderRadius: '20px',
                        padding: '20px'
                    }}>
                        <Text.CenterLine>
                            50
                        </Text.CenterLine>
                    </div>
                </ContainerComponent.Item>
            </ContainerComponent.GridThreeColumns>
        </ContainerComponent>
    )
}
