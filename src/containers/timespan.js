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
    }, [expireTime]);

    function convertTo2Digit(number) {
        return number.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
    }

    return <ContainerComponent.Section
        style={{
            padding: '10px 10px',
            background:"white"
        }}
        className="timespan"
    >
        <ContainerComponent.Inner
            style={{
                margin: '0 auto',
                textAlign: 'center',
            }}
        >
            <Text style={{fontWeight:"600",fontSize:"17px"}}>Time to close Workspace</Text>
            {counterTimer.days > 0 && <ContainerComponent.Flex
                style={{
                    // alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '10px'
                }}
            >
                <ContainerComponent.Item>
                    <ButtonComponent className="timeSpan__button" style={{ background: '#163D3C' }}>{counterTimer.days}</ButtonComponent>
                    <Text.Bold style={{ color: '#163D3C' }}>Days</Text.Bold>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <Text style={{ transform: "translateY(14%)", fontWeight: "700", color:"#163D3C"}}>:</Text>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <ButtonComponent className="timeSpan__button" style={{ background:'#163D3C'}}>{`${convertTo2Digit(counterTimer.hours)}`} </ButtonComponent>
                    <Text.Bold style={{ color: '#163D3C' }}>Hours</Text.Bold>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <Text style={{ transform: "translateY(14%)", fontWeight: "700", color: "#163D3C" }}>:</Text>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <ButtonComponent className="timeSpan__button" style={{ background: '#163D3C' }}>{`${convertTo2Digit(counterTimer.minutes)}`}</ButtonComponent>
                    <Text.Bold style={{ color: '#163D3C' }}>Minutes</Text.Bold>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <Text style={{ transform: "translateY(14%)", fontWeight: "700", color: "#163D3C" }}>:</Text>
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <ButtonComponent className="timeSpan__button" style={{ background: '#163D3C' }}>{`${convertTo2Digit(counterTimer.seconds)}`}</ButtonComponent>
                    <Text.Bold style={{ color: '#163D3C' }}>Seconds</Text.Bold>
                </ContainerComponent.Item>
            </ContainerComponent.Flex> || <ContainerComponent.Pane style={{ color: "red", fontWeight: '600' }}>Closed</ContainerComponent.Pane>}
        </ContainerComponent.Inner>
    </ContainerComponent.Section>
}