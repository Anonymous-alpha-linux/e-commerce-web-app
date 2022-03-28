import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

import { MdGroup } from "react-icons/md";
import { AiOutlineLeft } from "react-icons/ai";
import { FaSearch } from 'react-icons/fa';

import { ContainerComponent, Form, Icon, Text, Message } from '../../components'
import { useAdminContext, useWorkspaceContext } from '../../redux';
import { roles } from '../../fixtures';

function UserAll({ filter = roles.STAFF, workspaceId }) {
    const { accounts: { data } } = useAdminContext();
    const { workspaces } = useWorkspaceContext();

    const { id } = useParams();
    let workspaceid = id || workspaceId;

    const [state, setState] = useState({
        members: [],
        outputs: []
    });
    const [input, setInput] = React.useState('');

    useEffect(() => {
        setState(oldState => ({
            members: data.filter(member => member.role.roleName === filter),
            outputs: data.filter(member => member.role.roleName === filter)
        }));
    }, [data]);
    function inputHandler(e) {
        setInput(e.target.value);
        searchMember(e.target.value);
    }
    function searchMember(input) {
        setState(oldState => ({
            ...oldState,
            outputs: oldState.members.filter(person => person.username.toLowerCase().includes(input.toLowerCase()))
        }));
    }

    return <ContainerComponent className="staffCRUD__root"
        style={{
            maxWidth: '690px',
            width: '100%',
            height: '650px',
            top: '50px',
        }}
    >
        <ContainerComponent.Inner>
            <ContainerComponent.Flex style={{ justifyContent: "space-between", padding: "10px" }}>
                <Form.Button style={{ border: "none", marginTop: "5px" }}>
                    <Text.MiddleLine>
                        <Icon
                            style={{
                                fontSize: '14px'
                            }}
                        >
                            <AiOutlineLeft />
                        </Icon>
                    </Text.MiddleLine>
                    <Text.MiddleLine>Back</Text.MiddleLine>
                </Form.Button>
            </ContainerComponent.Flex>

            <ContainerComponent.Item style={{ position: "relative" }}>
                <Message.SearchForm style={{
                    display: 'flex',
                    justifyContent: "flex-start",
                    alignItems: "center",
                    border: "1px solid black",
                    borderRadius: "10px",
                    padding: "5px",
                }}>
                    <Icon style={{ height: "fix-content", padding: "2px", display: "flex", alignItems: "center", }}>
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

            <ContainerComponent.Pane>
                <MemberListData dataList={state.outputs} workspaceId={workspaceId}></MemberListData>
            </ContainerComponent.Pane>
        </ContainerComponent.Inner>
    </ContainerComponent>
}

function MemberListData({ dataList, workspaceId }) {

    const { assignCoordinatorToWorkspace } = useWorkspaceContext();
    function assignHandler(accountId) {
        assignCoordinatorToWorkspace(workspaceId, accountId);
    }
    return !!dataList.length && dataList.map((item) => {
        return (
            <ContainerComponent.Item key={item._id} style={{ padding: 0 }}>
                <ContainerComponent.Inner
                    style={{
                        color: "black",
                        padding: "0 10px 0",
                        background: 'white',
                        width: '100%'
                    }}>
                    <ContainerComponent.Inner style={{ height: "50px", display: "flex", justifyContent: "space-between", flexGrow: "1" }}>
                        <ContainerComponent.Pane style={{ display: "flex", alignItems: "center" }}>
                            <ContainerComponent.Item
                                style={{
                                    padding: "0",
                                    height: "fit-content",
                                }}>
                                <Icon.CircleIcon>
                                    <Icon.Image src={item.profileImage}></Icon.Image>
                                </Icon.CircleIcon>
                            </ContainerComponent.Item>
                            <ContainerComponent.Item>
                                <Text.Subtitle style={{ textAlign: "start", margin: 0, padding: "0" }}>{item.username}</Text.Subtitle>
                            </ContainerComponent.Item>
                        </ContainerComponent.Pane>
                        <ContainerComponent.Flex style={{ justifyContent: "center", alignItems: "center" }}>
                            <Form.Button onClick={() => assignHandler(item._id)} style={{ background: 'rgb(0 255 95)', color: '#fff', padding: '5px 10px ', borderRadius: '10px' }}>Assign</Form.Button>
                        </ContainerComponent.Flex>
                    </ContainerComponent.Inner>
                </ContainerComponent.Inner>
            </ContainerComponent.Item>
        )
    }) || <ContainerComponent.Item>
            <Text.CenterLine>There're no match records</Text.CenterLine>
        </ContainerComponent.Item>
}

export default UserAll;