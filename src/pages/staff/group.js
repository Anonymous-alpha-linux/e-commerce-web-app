import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillCaretDown } from "react-icons/ai";
import { GrStackOverflow } from "react-icons/gr";
import { ImSpinner6 } from "react-icons/im";

import { AnimateComponent, ButtonComponent, ContainerComponent, Dropdown, Icon, Text } from '../../components';
import { AddFromWorkspace, Modal, TriggerLoading } from '../../containers';
import { useMedia, useModal } from '../../hooks';
import { useWorkspaceContext } from '../../redux';
import { media } from '../../fixtures';
import { ListMember, UserAll } from '../QAManager';



export default function Group() {
    const [modalWS, setModalWS] = useModal(false);
    const { workspaces, loadMore, loadMoreWorkspaceList } = useWorkspaceContext();

    return (
        <>
            <ContainerComponent>
                <TriggerLoading
                    loadMore={loadMore}
                    loader={loadMoreWorkspaceList}
                >
                    {workspaces &&
                        workspaces.map((item, index) => (
                            <EditToggle
                                item={item}
                                key={index + 1}
                                clickLoader={() => { }}
                            ></EditToggle>
                        ))}
                </TriggerLoading>
            </ContainerComponent>
            <Modal isShowing={modalWS} toggle={setModalWS}>
                <AddFromWorkspace setModal={setModalWS} modal={modalWS} />
            </Modal>
        </>
    )
}

const EditToggle = ({ item, clickLoader = null }) => {
    const [modal, toggleModal] = useModal();
    const [memberModal, toggleMemberModal] = useModal();
    const [workspaceModal, toggleWorkspaceModal] = useModal();
    const [openDropdown, setDropdown] = useState(false);
    const device = useMedia(480, 1080);
    return (
        <>
            <ContainerComponent.Item
                id={`workspace-${item._id}`}
                onMouseLeave={() => setDropdown(false)}
                style={{ width: "100%", padding: "10px", minWidth: "230px" }}
            >
                <ContainerComponent.Flex
                    style={{ alignItems: "center", justifyContent: "space-between" }}
                >
                    <Text.MiddleLine>
                        <Icon style={{ fontSize: "25px" }}>
                            <GrStackOverflow></GrStackOverflow>
                        </Icon>
                    </Text.MiddleLine>

                    <Text.MiddleLine>
                        <ContainerComponent.Pane>
                            <Text.Title
                                style={{ textAlign: "center", textTransform: "capitalize" }}
                            >
                                {item.workTitle}
                            </Text.Title>
                            <TimespanChild expireTime={item.expireTime}></TimespanChild>
                        </ContainerComponent.Pane>
                    </Text.MiddleLine>
                    <AnimateComponent.Rotate state={openDropdown} deg={-180}>
                        <Text.MiddleLine onClick={() => setDropdown((prev) => !prev)}>
                            <Dropdown>
                                <Icon style={{ fontSize: "20px" }}>
                                    <AiFillCaretDown></AiFillCaretDown>
                                </Icon>
                            </Dropdown>
                        </Text.MiddleLine>
                    </AnimateComponent.Rotate>
                </ContainerComponent.Flex>
                <AnimateComponent.DropdownClick>
                    {openDropdown && (
                        <ContainerComponent.Flex style={{ flexDirection: "column", color: '#fff' }}>
                            <ContainerComponent.Item>
                                {(device === media.MOBILE && (
                                    <ButtonComponent>
                                        <Link to={`/management/workspace/${item._id}`}
                                            style={{ color: "#fff" }}
                                            onClick={clickLoader}
                                        >
                                            <Text.Line style={{ textAlign: "center" }}>
                                                <Text.NoWrapText>Assign QA Coordinator</Text.NoWrapText>
                                            </Text.Line>
                                        </Link>
                                    </ButtonComponent>
                                )) || (
                                        <ButtonComponent onClick={toggleModal}>
                                            <Text.Line style={{ textAlign: "center" }}>
                                                <Text.NoWrapText>Assign QA Coordinator</Text.NoWrapText>
                                            </Text.Line>
                                        </ButtonComponent>
                                    )}
                            </ContainerComponent.Item>
                            <ContainerComponent.Item>
                                {(device === media.MOBILE && (
                                    <ButtonComponent>
                                        <Link
                                            to={`/management/workspace_member/${item._id}`}
                                            style={{ color: "#fff" }}
                                            onClick={clickLoader}
                                        >
                                            <Text.Line style={{ textAlign: "center" }}>
                                                <Text.NoWrapText>Add Member</Text.NoWrapText>
                                            </Text.Line>
                                        </Link>
                                    </ButtonComponent>
                                )) || (
                                        <ButtonComponent onClick={toggleMemberModal}>
                                            <Text.Line style={{ textAlign: "center" }}>
                                                <Text.NoWrapText>Add Member</Text.NoWrapText>
                                            </Text.Line>
                                        </ButtonComponent>
                                    )}
                            </ContainerComponent.Item>
                            <ContainerComponent.Item>
                                {(device === media.MOBILE && (
                                    <ButtonComponent>
                                        <Text.Line style={{ textAlign: "center" }}>
                                            <Text.NoWrapText>Edit Time/Title</Text.NoWrapText>
                                        </Text.Line>
                                    </ButtonComponent>
                                )) || (
                                        <ButtonComponent onClick={toggleWorkspaceModal}>
                                            <Text.Line style={{ textAlign: "center" }}>
                                                <Text.NoWrapText>Edit Time/Title</Text.NoWrapText>
                                            </Text.Line>
                                        </ButtonComponent>
                                    )}
                            </ContainerComponent.Item>
                            <ContainerComponent.Item>
                                {(device === media.MOBILE && (
                                    <ButtonComponent>
                                        <Text.Line style={{ textAlign: "center" }}>
                                            <Link to="/workspace_overview">
                                                <Text.NoWrapText>Detail workspace</Text.NoWrapText>
                                            </Link>
                                        </Text.Line>
                                    </ButtonComponent>
                                )) || (
                                        <ButtonComponent onClick={toggleWorkspaceModal}>
                                            <Text.Line style={{ textAlign: "center" }}>
                                                <Text.NoWrapText>Detail workspace</Text.NoWrapText>
                                            </Text.Line>
                                        </ButtonComponent>
                                    )}
                            </ContainerComponent.Item>
                        </ContainerComponent.Flex>
                    )}
                </AnimateComponent.DropdownClick>
            </ContainerComponent.Item>

            <Modal
                style={{
                    background: "#fff",
                    maxWidth: "420px",
                    borderRadius: "10px",
                    overflow: "hidden",
                }}
                isShowing={modal}
                toggle={toggleModal}
            >
                <UserAll workspaceId={item._id}></UserAll>
            </Modal>
            <Modal
                style={{
                    background: "#fff",
                    maxWidth: "420px",
                    borderRadius: "10px",
                    overflow: "hidden",
                }}
                isShowing={memberModal}
                toggle={toggleMemberModal}
            >
                <ListMember workspaceId={item._id}></ListMember>
            </Modal>
            <Modal
                style={{
                    background: "transparent",
                    maxWidth: "420px",
                    borderRadius: "10px",
                    overflow: "hidden",
                }}
                isShowing={workspaceModal}
                toggle={toggleWorkspaceModal}
            >
                <WorkspaceModal
                    workspaceId={item._id}
                    toggleModal={toggleWorkspaceModal}
                    workTitle={item.workTitle}
                ></WorkspaceModal>
            </Modal>
        </>
    );
};
function TimespanChild({ startTime = Date.now(), expireTime }) {
    const { workspaces } = useWorkspaceContext();
    const startDate = new Date(startTime).getTime();
    const expireDate = new Date(expireTime).getTime();
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        const interval = setInterval(() => {
            const now = new Date().getTime();
            var timeleft = expireDate - now;
            var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
            var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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
            setLoading(false);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    function calculateBlockTime() {

    }
    function convertTo2Digit(number) {
        return number.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
    }

    return (
        <ContainerComponent.Section className="timespan__container">
            {(loading && (
                <ContainerComponent.Inner
                    style={{ margin: "0 auto", textAlign: "center" }}
                >
                    <Text.CenterLine>
                        <Icon.Spinner style={{ fontSize: "400px" }}>
                            <ImSpinner6></ImSpinner6>
                        </Icon.Spinner>
                    </Text.CenterLine>
                </ContainerComponent.Inner>
            )) || (
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
                        )) || (
                                <ContainerComponent.Pane
                                    style={{ color: "red", fontWeight: 500, fontSize: "0.8em" }}
                                >
                                    Closed
                                </ContainerComponent.Pane>
                            )}
                    </ContainerComponent.Inner>
                )}
        </ContainerComponent.Section>
    );
}
function WorkspaceModal({ workspaceId, workTitle, toggleModal }) {
    const [workspaceInfo, setWorkspaceInfo] = useState({
        workTitle: workTitle,
        eventTime: Date.now(),
        expireTime: Date.now(),
    });
    const [loading, setLoading] = useState(false);

    const { editWorkspace } = useWorkspaceContext();

    async function HandleWSInput(e) {
        setWorkspaceInfo({ ...workspaceInfo, [e.target.name]: e.target.value });
    }
    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        editWorkspace(
            workspaceId,
            workspaceInfo.workTitle,
            workspaceInfo.expireTime,
            workspaceInfo.eventTime,
            () => {
                setLoading(false);
                toggleModal();
            }
        );
    }
    return (
        <div className="c-modal__container">
            {(loading && (
                <Text.CenterLine>
                    <Icon.Spinner style={{ fontSize: "400px" }}>
                        <ImSpinner6></ImSpinner6>
                    </Icon.Spinner>
                </Text.CenterLine>
            )) || (
                    <form onSubmit={onSubmit}>
                        <div className="form-container">
                            <div className="question-container">
                                <label className="question-label">Workspace Title</label>
                                <input className="row-input"
                                    type="text"
                                    name="workTitle"
                                    onChange={HandleWSInput}
                                    value={workspaceInfo.workTitle}
                                />
                            </div>
                            <div className="question-container">
                                <label className="question-label">
                                    Close Event(comment, etc.)
                                </label>
                                <input
                                    className="row-input"
                                    type="date"
                                    name="eventTime"
                                    onChange={HandleWSInput}
                                // value={workspaceInfo.eventTime}
                                />
                            </div>
                            <div className="question-container">
                                <label className="question-label">Closure Date</label>
                                <input
                                    className="row-input"
                                    type="date"
                                    name="expireTime"
                                    onChange={HandleWSInput}
                                // value={workspaceInfo.expireTime}
                                />
                            </div>
                        </div>
                        <div className="form-container">
                            <div className="question-container">
                                <button type="submit" className="submit_category">
                                    Add
                                </button>
                                <button className="btn-trans-Cancel" onClick={toggleModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </form>
                )}
        </div>
    );
}