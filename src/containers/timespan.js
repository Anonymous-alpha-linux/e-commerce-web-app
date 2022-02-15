import { ContainerComponent, Text } from "../components";

export default function Timespan() {
    return <ContainerComponent
        style = {{
            padding:'10px 0',
        }}
    >
        <ContainerComponent.Inner
            style = {{
                margin: '0 auto',
                textAlign: 'center',
            }}
        >
            <Text>Time to close Workspace</Text>
            <Text>
                <ContainerComponent.Flex
                    style={{
                        // alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ContainerComponent.Item>
                        <Text.Date>200</Text.Date>
                    </ContainerComponent.Item>

                    <ContainerComponent.Item>
                        <Text>:</Text>
                    </ContainerComponent.Item>
                    
                    <ContainerComponent.Item>
                        <Text.Date>45</Text.Date>
                    </ContainerComponent.Item>
                    
                    <ContainerComponent.Item>
                        <Text>:</Text>
                    </ContainerComponent.Item>
                    
                    <ContainerComponent.Item>
                        <Text.Date>44</Text.Date>
                    </ContainerComponent.Item>
                </ContainerComponent.Flex>
            </Text>

        </ContainerComponent.Inner>
    </ContainerComponent>
}