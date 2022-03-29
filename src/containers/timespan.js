import { useEffect, useState } from "react";
import { ContainerComponent, Text } from "../components";
import { ButtonComponent } from "../components";

export default function Timespan({
    startTime = Date.now(),
    expireTime,
    setBlockWorkspace
}) {
    const startDate = new Date(startTime).getTime();
    const expireDate = new Date(expireTime).getTime();

    var timeleft = expireDate - startDate;
    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    const [counterTimer, setCounterTimer] = useState({
        days,
        hours,
        minutes,
        seconds
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            var timeleft = expireDate - now;
            var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
            var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            if (days > 0) {
                setCounterTimer({
                    days,
                    hours,
                    minutes,
                    seconds
                });
            }
            else {
                setBlockWorkspace(true);
                setCounterTimer({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                });
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

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
            {counterTimer.days > 0 && <ContainerComponent.Flex
                style={{
                    // alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '10px'
                }}
            >
                <ContainerComponent.Item>
                    <ButtonComponent>{counterTimer.days}</ButtonComponent>
                    <Text.Bold>Days</Text.Bold>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <Text>:</Text>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <ButtonComponent>{`${counterTimer.hours}`} </ButtonComponent>
                    <Text.Bold>Hours</Text.Bold>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <Text>:</Text>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <ButtonComponent>{`${counterTimer.minutes}`}</ButtonComponent>
                    <Text.Bold>Minutes</Text.Bold>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <Text>:</Text>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <ButtonComponent>{`${counterTimer.seconds}`}</ButtonComponent>
                    <Text.Bold>Seconds</Text.Bold>
                </ContainerComponent.Item>
            </ContainerComponent.Flex> || <ContainerComponent.Pane style={{ background: '#333', color: "red", fontWeight: '600' }}>Closed</ContainerComponent.Pane>}
        </ContainerComponent.Inner>
    </ContainerComponent.Section>
}