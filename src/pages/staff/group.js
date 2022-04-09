import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ImSpinner } from "react-icons/im";
import { GrStackOverflow } from 'react-icons/gr';
import { AiFillCaretDown, AiOutlineArrowLeft } from 'react-icons/ai'

import { AnimateComponent, ButtonComponent, ContainerComponent, Icon, Text } from '../../components';
import { DropDownButton, TriggerLoading } from '../../containers';
import { useAuthorizationContext, useWorkspaceContext } from '../../redux';
import { OutsideAlert, useMedia } from '../../hooks';

export default function Group() {
    const { user } = useAuthorizationContext();
    const { workspaces, loadMore, loadMoreWorkspaceList } = useWorkspaceContext();
    const navigate = useNavigate();

    return (
        <ContainerComponent style={{ maxWidth: '680px', padding: '10px' }}>
            <Text.Line className="back__btn" style={{ marginBottom: '20px', cursor: 'pointer' }}>
                <Text.MiddleLine className="back__icon">
                    <Icon>
                        <AiOutlineArrowLeft></AiOutlineArrowLeft>
                    </Icon>
                </Text.MiddleLine>
                <Text.MiddleLine className="back__text">
                    <Text.Bold onClick={() => navigate(-1)}>Back</Text.Bold>
                </Text.MiddleLine>
            </Text.Line>

            <TriggerLoading loader={loadMoreWorkspaceList} loadMore={loadMore}>
                {!!workspaces.length &&
                    workspaces.map((item, index) => {
                        const disabled = user.workspace === item._id;
                        const disabledStyled = () => ({
                            background: `${disabled ? "#fff" : "rgb(22, 61, 60)"}`,
                            color: `${disabled ? "#000" : "#fff"}`,
                        });
                        return (
                            <ContainerComponent.Item
                                key={index + 1}
                                className="workspaceList__item"
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    minWidth: "280px",
                                    ...disabledStyled(),
                                }}
                            >
                                <WorkspaceItem
                                    item={item}
                                // toggleMemberModal={toggleMemberModal}
                                ></WorkspaceItem>
                            </ContainerComponent.Item>

                        );
                    })}
            </TriggerLoading>
        </ContainerComponent>
    );
}
function WorkspaceItem({ item, toggleMemberModal }) {
    const { user, editCurrentWorkspace } = useAuthorizationContext();
    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [openButtonGroup, setButtonGroup] = useState(false);
    const device = useMedia(680, 1050);

    const disabled = user.workspace === item._id;

    function selectHandler(workspaceId) {
        setLoading(true);
        editCurrentWorkspace(workspaceId, async () => {
            await setLoading(false);
            navigate(location.pathname);
        });
    }

    if (loading) return <Text.CenterLine style={{ height: '50px', fontSize: '40px', maxWidth: '680px' }}>
        <Icon.Spinner>
            <ImSpinner></ImSpinner>
        </Icon.Spinner>
    </Text.CenterLine>

    return <ContainerComponent.Pane>
        <ContainerComponent.Flex onClick={(e) => {
            e.stopPropagation();
            if (!disabled) {
                selectHandler(item._id);
            }
        }
        } style={{ alignItems: "center", justifyContent: "space-between", textAlign: 'center' }}>
            <Text.MiddleLine className="workspace-item__icon">
                <Icon style={{ fontSize: "25px" }}>
                    <GrStackOverflow></GrStackOverflow>
                </Icon>
            </Text.MiddleLine>

            <Text.MiddleLine className="workspace-item__timespan">
                <ContainerComponent.Pane>
                    <Text.Title style={{ textAlign: "center", textTransform: 'capitalize' }}>
                        {item.workTitle}
                    </Text.Title>
                    <TimespanChild expireTime={item.expireTime}></TimespanChild>
                </ContainerComponent.Pane>
            </Text.MiddleLine>

            <Text.MiddleLine className="workspace-item__dropdownIcon" style={{ cursor: 'pointer' }}>
                {user.accountId === item.manager &&
                    <>
                        <Icon onClick={() => setButtonGroup(o => !o)}>
                            <AiFillCaretDown></AiFillCaretDown>
                        </Icon>
                    </>
                }
            </Text.MiddleLine>
        </ContainerComponent.Flex>
        {openButtonGroup && <OutsideAlert toggleShowing={() => setButtonGroup(false)}>
            <ContainerComponent.Pane style={{ marginTop: '20px' }}>
                <Text.Line style={{ lineHeight: '2' }}>
                    <Link to={`/management/workspace_member/${item._id}`} style={{ color: 'inherit' }}>
                        <Text.CenterLine>
                            Add member
                        </Text.CenterLine>
                    </Link>
                </Text.Line>
                <Text.Line style={{ lineHeight: '2' }}>
                    <Link to="">
                        <Text.CenterLine>
                            Edit time
                        </Text.CenterLine>
                    </Link>
                </Text.Line>
                <Text.Line style={{ lineHeight: '2' }}>
                    <Link to="/workspace_detail" style={{ color: 'inherit' }}>
                        <Text.CenterLine>
                            Workspace detail
                        </Text.CenterLine>
                    </Link>
                </Text.Line>
            </ContainerComponent.Pane>
        </OutsideAlert>
        }
    </ContainerComponent.Pane>
}
function TimespanChild({ startTime = Date.now(), expireTime }) {
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
        seconds,
    });
    const [blockWorkspace, setBlockWorkspace] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            var timeleft = expireDate - now;
            var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
            var hours = Math.floor(
                (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
                setBlockWorkspace(false);
                setCounterTimer({
                    days,
                    hours,
                    minutes,
                    seconds,
                });
            } else {
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
        };
    }, []);

    function convertTo2Digit(number) {
        return number.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
    }
    return (
        <ContainerComponent.Section className="timespan__container">
            <ContainerComponent.Inner
                style={{ margin: "0 auto", textAlign: "center" }}
            >
                {(!blockWorkspace && (
                    <ContainerComponent.Flex
                        style={{
                            // alignItems: 'center',
                            justifyContent: "center",
                        }}
                    >
                        <ContainerComponent.Item
                            style={{ fontSize: "13px", padding: "5px 0" }}
                        >
                            <ButtonComponent style={{ padding: "5px 15px" }}>
                                {`${counterTimer.days}`}
                            </ButtonComponent>
                        </ContainerComponent.Item>

                        <ContainerComponent.Item>
                            <Text>:</Text>
                        </ContainerComponent.Item>

                        <ContainerComponent.Item
                            style={{ fontSize: "13px", padding: "5px 0" }}
                        >
                            <ButtonComponent
                                style={{ padding: "5px 10px" }}
                            >{`${convertTo2Digit(counterTimer.hours)}`}</ButtonComponent>
                        </ContainerComponent.Item>

                        <ContainerComponent.Item>
                            <Text>:</Text>
                        </ContainerComponent.Item>

                        <ContainerComponent.Item
                            style={{ fontSize: "13px", padding: "5px 0" }}
                        >
                            <ButtonComponent
                                style={{ padding: "5px 10px" }}
                            >{`${convertTo2Digit(counterTimer.minutes)}`}</ButtonComponent>
                        </ContainerComponent.Item>

                        <ContainerComponent.Item>
                            <Text>:</Text>
                        </ContainerComponent.Item>

                        <ContainerComponent.Item
                            style={{ fontSize: "13px", padding: "5px 0" }}
                        >
                            <ButtonComponent
                                style={{ padding: "5px 10px" }}
                            >{`${convertTo2Digit(counterTimer.seconds)}`}</ButtonComponent>
                        </ContainerComponent.Item>
                    </ContainerComponent.Flex>
                ))
                    ||
                    <ContainerComponent.Pane style={{ color: "red", fontWeight: 500, fontSize: "0.8em" }}
                    >Closed</ContainerComponent.Pane>}
            </ContainerComponent.Inner>
        </ContainerComponent.Section>
    );
}
