import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

import { MdGroup, MdDone } from "react-icons/md";
import { AiOutlineLeft } from "react-icons/ai";
import { FaSearch } from 'react-icons/fa';
import { ImSpinner6 } from 'react-icons/im';

import { ContainerComponent, Form, Icon, Text, Message, ButtonComponent } from '../../components'
import { useAdminContext, useAuthorizationContext, useWorkspaceContext } from '../../redux';
import { roles, toastTypes } from '../../fixtures';

function UserAll({ filter = [roles.QA_COORDINATOR], workspaceId }) {
    const { accounts: { data }, getAccountList } = useAdminContext();
    const { getWorkspaceMembers } = useWorkspaceContext();
    const { id } = useParams();
    let workspaceid = id || workspaceId;

    const [state, setState] = useState({
        members: [],
        outputs: []
    });
    const [input, setInput] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        getAccountList((accounts) => {
            getWorkspaceMembers(workspaceid, members => {
                const filterRoles = filter || [roles.QA_COORDINATOR, roles.STAFF];
                let output = accounts.filter(account => filterRoles.includes(account.role.roleName));
                setState({
                    members: members,
                    outputs: output,
                });
            });
        });
    }, []);
    // useEffect(() => {
    //     console.log(data);
    //     setState(oldState => {
    //         let output = data.filter(member => filter.includes(member.role.roleName))
    //         return {
    //             members: output,
    //             outputs: output
    //         }
    //     });
    // }, [data]);

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
            padding: "8px"
        }}
    >
        <ContainerComponent.Inner>
            <Form.Button style={{ border: "none", padding: '10px 2px' }}>
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

            <ContainerComponent.Item className="staffCRUD__searchbar" style={{ position: "relative" }}>
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

            <ContainerComponent.Pane className="staffCRUD__memberList">
                <MemberListData dataList={state.outputs} workspaceId={workspaceid}></MemberListData>
            </ContainerComponent.Pane>
        </ContainerComponent.Inner>
    </ContainerComponent>
}
function MemberListData({ dataList, workspaceId }) {
    const { pushToast } = useAuthorizationContext();
    const { workspaces } = useWorkspaceContext();

    const [blockAssign, setBlockAssign] = useState(null);

    useEffect(() => {
        Promise.resolve(workspaces.find(w => w._id === workspaceId))
            .then(workspace => {
                if (!workspace) throw new Error('Not find the match of workspace');
                setBlockAssign(workspace.manager);
            }).catch(error => {
                pushToast({
                    message: error.message,
                    type: toastTypes.ERROR
                });
            });
    }, []);

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
                    <MemberItem data={item} workspaceId={workspaceId} blockAssignState={[blockAssign, setBlockAssign]}></MemberItem>
                </ContainerComponent.Inner>
            </ContainerComponent.Item>
        )
    }) || <ContainerComponent.Item>
            <Text.CenterLine>There're no match records</Text.CenterLine>
        </ContainerComponent.Item>
}
function MemberItem({ data, workspaceId, blockAssignState }) {
    const { assignCoordinatorToWorkspace } = useWorkspaceContext();
    const [loading, setLoading] = useState(false);
    const [blockAssign, setBlockAssign] = blockAssignState;


    function assignHandler(accountId) {
        setLoading(true);
        assignCoordinatorToWorkspace(workspaceId, accountId, () => {
            setLoading(false);
            setBlockAssign(accountId);
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
            {
                blockAssign === data._id && <Icon.CircleIcon style={{ background: '' }}><MdDone></MdDone></Icon.CircleIcon> ||
                <Form.Button onClick={() => assignHandler(data._id)} style={{ background: 'rgb(0 255 95)', color: '#fff', padding: '5px 10px ', borderRadius: '10px', width: '100px' }}>
                    {loading ? <Icon.Spinner style={{ width: '120px' }}>
                        <ImSpinner6></ImSpinner6>
                    </Icon.Spinner>
                        : 'Assign'}
                </Form.Button>
            }
        </ContainerComponent.Flex>
    </ContainerComponent.Inner>
}

export default UserAll;