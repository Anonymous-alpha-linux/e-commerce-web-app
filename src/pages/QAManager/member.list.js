import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { MdDone, MdRemove } from 'react-icons/md';
import { FaSearch, FaFilter } from "react-icons/fa";
import { ImSpinner6 } from 'react-icons/im';
import { TiUserDelete } from "react-icons/ti";

import { useAdminContext, useAuthorizationContext, useWorkspaceContext } from "../../redux";
import { ContainerComponent, Form, Icon, Message, Text, } from "../../components";
import { toastTypes, roles } from "../../fixtures";

export default function MemberList({ workspaceId }) {
    const { workspaces, getWorkspaceMembers } = useWorkspaceContext();
    const { accounts: { data }, getAccountList } = useAdminContext();
    const { id } = useParams();
    let workspaceid = id || workspaceId;
    console.log(workspaceid)
    const [state, setState] = useState({
        members: [],
        outputs: []
    });
    const [input, setInput] = React.useState('');
    useEffect(() => {
        getAccountList();
    }, []);
    useEffect(() => {
        getWorkspaceMembers(workspaceid, members => {
            console.log(members);
            setState({
                members: members,
                outputs: data.filter(account => [roles.QA_COORDINATOR, roles.STAFF].includes(account.role.roleName)),
            });
        });
    }, [data, workspaceid]);

    function inputHandler(e) {
        setInput(e.target.value);
        searchMember(e.target.value);
    }
    function searchMember(input) {
        setState(oldState => ({
            ...oldState,
            outputs: data.filter(person => person.username.toLowerCase().includes(input.toLowerCase())).filter(account => [roles.QA_COORDINATOR, roles.STAFF].includes(account.role.roleName))
        }));
    }
    function addMember(accountId) {
        setState(oldState => ({
            ...oldState,
            members: [...oldState.members, { _id: accountId }]
        }));
    }
    function removeMember(accountId) {
        setState(oldState => ({
            ...oldState,
            members: oldState.members.filter(member => member._id !== accountId)
        }));
    }

    return (
        <ContainerComponent style={{ background: "#ffff", color: "black", width: "100%", maxWidth: '690px', margin: '0 auto' }}>
            <ContainerComponent.Pane className="list-member__header">
                <ContainerComponent.Item style={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center",
                }}
                >
                    <Text.Title style={{ margin: '10px', fontSize: '1rem' }}>List of Member - <Text style={{ fontSize: '1rem', textTransform: 'uppercase' }}>{workspaces.find(w => { return w._id === workspaceid })?.workTitle}</Text></Text.Title>
                    {/* <Link to="/addMemebr">
                        <Text.Line style={{ display: "block", backgroundColor: "silver", padding: "5px", borderRadius: "10px", position: 'absolute', right: '0%', transform: 'translate(-10%,-50%)' }}>
                            <Text.MiddleLine>
                                <Icon>
                                    <FaFilter></FaFilter>
                                </Icon>
                            </Text.MiddleLine>
                            <Text.MiddleLine>
                                <Text.Subtitle style={{ margin: 0 }}>
                                    Add Member
                                </Text.Subtitle>
                            </Text.MiddleLine>
                        </Text.Line>
                    </Link> */}
                </ContainerComponent.Item>

                <ContainerComponent.Item>
                    <Message.SearchForm
                        style={{
                            display: 'flex',
                            justifyContent: "flex-start",
                            alignItems: "center",
                            border: "1px solid black",
                            borderRadius: "10px",
                            padding: "5px",
                        }}>
                        <Icon
                            style={{
                                height: "fix-content",
                                padding: "2px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <FaSearch style={{ fontSize: "16px" }}></FaSearch>
                        </Icon>
                        <Form.Input
                            onChange={inputHandler}
                            value={input}
                            style={{
                                width: "100%",
                                marginLeft: "5px",
                                border: "none",
                                outline: "none",
                            }}
                        ></Form.Input>
                    </Message.SearchForm>
                </ContainerComponent.Item>
            </ContainerComponent.Pane>

            <ContainerComponent.Pane className="list-member__body">
                <MemberListData dataList={state.outputs} memberList={state.members} workspaceId={workspaceid} addMember={addMember} removeMember={removeMember}></MemberListData>
            </ContainerComponent.Pane>
        </ContainerComponent>
    )
}
function MemberListData({ dataList, memberList, workspaceId, addMember, removeMember }) {
    return !!dataList.length
        &&
        dataList.map((item) => {
            return (
                <ContainerComponent.Item key={item._id} style={{ padding: 0 }}>
                    <ContainerComponent.Inner
                        style={{
                            color: "black",
                            padding: "0 10px 0",
                            background: 'white',
                            width: '100%'
                        }}>
                        <MemberItem data={item} workspaceId={workspaceId} memberList={memberList} addMember={addMember} removeMember={removeMember}></MemberItem>
                    </ContainerComponent.Inner>
                </ContainerComponent.Item>
            )
        })
        ||
        <ContainerComponent.Item>
            <Text.CenterLine>There're no match records</Text.CenterLine>
        </ContainerComponent.Item>
}
function MemberItem({ data, workspaceId, memberList, addMember, removeMember }) {
    return memberList.map(member => member._id).includes(data._id) && <JoinedMember data={data} workspaceId={workspaceId} removeMember={removeMember}></JoinedMember> || <UnjoinedMember data={data} workspaceId={workspaceId} addMember={addMember}></UnjoinedMember>
}
function JoinedMember({ data, workspaceId, removeMember }) {
    const { unassignMemberToWorkspace } = useWorkspaceContext();
    const [loading, setLoading] = useState(false);

    function unassignHandler(accountId) {
        setLoading(true);
        unassignMemberToWorkspace(workspaceId, accountId, () => {
            setLoading(false);
            removeMember(accountId);
        });
    }
    return <ContainerComponent.Inner style={{ height: "50px", display: "flex", justifyContent: "space-between", flexGrow: "1" }}>
        <ContainerComponent.Pane style={{ display: "flex", alignItems: "center" }}>
            <ContainerComponent.Item
                style={{
                    padding: "0",
                    height: "fit-content",
                }}>
                <Icon.CircleIcon>
                    <Icon.Image src={data.profileImage}></Icon.Image>
                </Icon.CircleIcon>
            </ContainerComponent.Item>
            <ContainerComponent.Item>
                <Text.Subtitle style={{ textAlign: "start", margin: 0, padding: "0" }}>{data.username}</Text.Subtitle>
            </ContainerComponent.Item>
        </ContainerComponent.Pane>
        <ContainerComponent.Flex style={{ justifyContent: "center", alignItems: "center" }}>
            {loading ? <Icon.Spinner style={{ width: '120px' }}>
                <ImSpinner6></ImSpinner6>
            </Icon.Spinner>
                : <Icon.CircleIcon style={{ background: '#000', color: "#fff" }} onClick={() => unassignHandler(data._id)}>
                    <MdRemove></MdRemove>
                </Icon.CircleIcon>}
        </ContainerComponent.Flex>
    </ContainerComponent.Inner>
}
function UnjoinedMember({ data, workspaceId, addMember }) {
    const { assignMemberToWorkspace } = useWorkspaceContext();
    const [loading, setLoading] = useState(false);

    function assignHandler(accountId) {
        setLoading(true);
        assignMemberToWorkspace(workspaceId, accountId, () => {
            setLoading(false);
            addMember(accountId);
        });
    }

    return <ContainerComponent.Inner style={{ height: "50px", display: "flex", justifyContent: "space-between", flexGrow: "1" }}>
        <ContainerComponent.Pane style={{ display: "flex", alignItems: "center" }}>
            <ContainerComponent.Item
                style={{
                    padding: "0",
                    height: "fit-content",
                }}>
                <Icon.CircleIcon>
                    <Icon.Image src={data.profileImage}></Icon.Image>
                </Icon.CircleIcon>
            </ContainerComponent.Item>
            <ContainerComponent.Item>
                <Text.Subtitle style={{ textAlign: "start", margin: 0, padding: "0" }}>{data.username}</Text.Subtitle>
            </ContainerComponent.Item>
        </ContainerComponent.Pane>
        <ContainerComponent.Flex style={{ justifyContent: "center", alignItems: "center" }}>
            <Form.Button onClick={() => assignHandler(data._id)} style={{ background: 'rgb(0 255 95)', color: '#fff', padding: '5px 10px ', borderRadius: '10px', width: '100px' }}>
                {loading ? <Icon.Spinner style={{ width: '120px' }}>
                    <ImSpinner6></ImSpinner6>
                </Icon.Spinner>
                    : 'Assign'}
            </Form.Button>
        </ContainerComponent.Flex>
    </ContainerComponent.Inner>
}
