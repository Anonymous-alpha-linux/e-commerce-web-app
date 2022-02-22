import { useEffect, useState } from "react";
import { ContainerComponent, Text } from "../components";
import { ButtonComponent } from "../components";

export default function Timespan({
    startTime = Date.now(),
    expireTime,
}) {
    const startDate = new Date(startTime);
    const expireDate = new Date(expireTime);
    const [counterTimer, setCounterTimer] = useState({
        days: (expireDate.getMonth() - startDate.getMonth()) * 30,
        hours: 23 - startDate.getHours(),
        minutes: 59 - startDate.getMinutes(),
        seconds: 59 - startDate.getSeconds()
    });

    useEffect(() => {
        let timeout = setTimeout(() => {

            setCounterTimer({
                days: (expireDate.getMonth() - startDate.getMonth()) * 30,
                hours: 23 - startDate.getHours(),
                minutes: 59 - startDate.getMinutes(),
                seconds: 59 - startDate.getSeconds(),
            });
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
                    paddingTop: '10px'
                }}
            >
                <ContainerComponent.Item>
                    <ButtonComponent>{counterTimer.days} </ButtonComponent>
                    <Text.Bold>Days</Text.Bold>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <Text>:</Text>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <ButtonComponent>{`${counterTimer.hours < 10 && '0' || ''}${counterTimer.hours}`} </ButtonComponent>
                    <Text.Bold>Hours</Text.Bold>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <Text>:</Text>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <ButtonComponent>{`${counterTimer.minutes < 10 && '0' || ''}${counterTimer.minutes}`}</ButtonComponent>
                    <Text.Bold>Minutes</Text.Bold>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <Text>:</Text>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <ButtonComponent>{`${counterTimer.seconds < 10 && '0' || ''}${counterTimer.seconds}`}</ButtonComponent>
                    <Text.Bold>Seconds</Text.Bold>
                </ContainerComponent.Item>
            </ContainerComponent.Flex>
        </ContainerComponent.Inner>
    </ContainerComponent.Section>
}