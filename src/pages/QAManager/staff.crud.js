import React, { useState, useEffect } from 'react'
import { ContainerComponent, Form, Icon, Text, Message } from '../../components'
import { AiOutlineLeft } from "react-icons/ai";
import { MdGroup } from "react-icons/md";
import { useAdminContext, useAuthorizationContext } from '../../redux';
import { roles } from '../../fixtures';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function StaffManagement({ filter = roles.STAFF }) {
    const { accounts } = useAdminContext();
    const [member, setMember] = useState(accounts);
    const [searchOuput, setOutput] = React.useState([]);
    const [input, setInput] = React.useState('');

    useEffect(() => {
        setMember(accounts.filter(member => member.role.roleName === filter));
    }, [filter, accounts]);

    function inputHandler(e) {
        setInput(e.target.value);
        searchMember(e.target.value);
    }
    function searchMember(input) { setOutput(member.filter(person => person.username.toLowerCase().includes(input.toLowerCase()))) }

    return (
        <ContainerComponent className="staffCRUD__root"
            style={{
                // position: 'fixed',
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
                    <Text.Line style={{ display: "flex", backgroundColor: "silver", padding: "5px", borderRadius: "10px" }}>
                        <Icon
                            style={{
                                fontSize: '16px'
                            }}
                        >
                            <MdGroup />
                        </Icon>
                        <Link to="/management/member">
                            <Text.Subtitle style={{ margin: 0, paddingTop: "3px" }}>
                                Add Staff
                            </Text.Subtitle>
                        </Link>
                    </Text.Line>
                </ContainerComponent.Flex>

                <ContainerComponent.Item style={{ position: "relative" }}>
                    {/* <Form.Input placeholder="Search" style={{ padding: "4px", width: "96%" }} ></Form.Input> */}
                    <Message.SearchForm style={{
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

                <ContainerComponent.Pane>
                    {member.map((item) => {
                        return (
                            <ContainerComponent.Item key={item._id}
                                style={{
                                    padding: 0
                                }}
                            >
                                <ContainerComponent.Inner
                                    style={{
                                        color: "black",
                                        padding: "0 10px 0",
                                        background: 'white',
                                        // height: "500px"
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
                                            <Form.Checkbox></Form.Checkbox>
                                        </ContainerComponent.Flex>
                                    </ContainerComponent.Inner>
                                </ContainerComponent.Inner>
                            </ContainerComponent.Item>
                        )
                    })}
                </ContainerComponent.Pane>
            </ContainerComponent.Inner>
        </ContainerComponent>
    )
}

export default StaffManagement;