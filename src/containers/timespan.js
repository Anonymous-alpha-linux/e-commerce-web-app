import { ContainerComponent, Text } from "../components";

export default function Timespan() {
    return <ContainerComponent.Section
        style={{
            padding: '10px 0',
        }}
        className="timespan__container"
    >
        <ContainerComponent.Inner
            style={{
                margin: '0 auto',
                textAlign: 'center',
            }}
        >
            <Text>Time to close Workspace</Text>
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
        </ContainerComponent.Inner>
    </ContainerComponent.Section>
}