import { useEffect, useState } from "react";
import { ContainerComponent, Text } from "../components";

export default function Timespan({
    startTime = Date.now(),
    expireTime,
}) {
    const [counterTimer, setCounterTimer] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const startDate = new Date(startTime);
        const expireDate = new Date(expireTime);

        let timeout = setTimeout(() => {
            setCounterTimer({
                days: (expireDate.getMonth() - startDate.getMonth()) * 30,
                hours: 23 - startDate.getHours(),
                minutes: 59 - startDate.getMinutes(),
                seconds: 59 - startDate.getSeconds(),
            })
        }, 1000);

        return () => {
            clearTimeout(timeout);
        }
    }, [counterTimer]);

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
                    <Text.Date>{counterTimer.days}</Text.Date>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <Text>:</Text>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <Text.Date>{`${counterTimer.hours < 10 && '0' || ''}${counterTimer.hours}`}</Text.Date>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <Text>:</Text>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <Text.Date>{`${counterTimer.minutes < 10 && '0' || ''}${counterTimer.minutes}`}</Text.Date>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <Text>:</Text>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <Text.Date>{`${counterTimer.seconds < 10 && '0' || ''}${counterTimer.seconds}`}</Text.Date>
                </ContainerComponent.Item>
            </ContainerComponent.Flex>
        </ContainerComponent.Inner>
    </ContainerComponent.Section>
}