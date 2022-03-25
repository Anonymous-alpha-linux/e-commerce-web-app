import React from "react";
import {
    ContainerComponent,
    Form,
    Icon,
    Message,
    Text,

} from "../../components";
import { FaSearch, FaFilter } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useAdminContext } from "../../redux";

export default function MemberList() {
    const { accounts } = useAdminContext();
    const [member, setMember] = React.useState(accounts);
    const [searchOutput, setOutput] = React.useState([]);
    const [input, setInput] = React.useState('');

    function searchMember(input) { setOutput(accounts.filter(person => person.username.toLowerCase().includes(input.toLowerCase()))) }

    function inputHandler(e) {
        setInput(e.target.value);
        searchMember(e.target.value);
    }

    return (
        <Message style={{ width: "100%", maxWidth: '690px', margin: '0 auto' }}>
            <ContainerComponent style={{ background: "#ffff", color: "black" }}>
                <ContainerComponent.Pane className="list-member__header">
                    <ContainerComponent.Item
                        style={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text.Title style={{ margin: '10px' }}>ListMember</Text.Title>
                        <Link to="/">
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
                        </Link>
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
                    {searchOutput.length && searchOutput.map((item) => {
                        return (
                            <ContainerComponent.Flex style={{ justifyContent: "space-between" }}>
                                <ContainerComponent.Item>
                                    <Text.MiddleLine>
                                        <Icon.CircleIcon >
                                            <Icon.Image src={item.profileImage}></Icon.Image>
                                        </Icon.CircleIcon>
                                    </Text.MiddleLine>
                                    <Text.MiddleLine>
                                        <Text.Subtitle style={{ textAlign: "start", margin: 0 }}>
                                            {item.username}
                                        </Text.Subtitle>
                                    </Text.MiddleLine>
                                </ContainerComponent.Item>
                                <ContainerComponent.Item style={{ padding: '10px' }}>
                                    <Icon onClick={(e) => setMember((prev) => prev.filter((i) => i._id !== item._id))}>
                                        <TiUserDelete ></TiUserDelete>
                                    </Icon>
                                </ContainerComponent.Item>
                            </ContainerComponent.Flex>
                        )
                    }) ||
                        member.map((item) => {
                            return (
                                <ContainerComponent.Flex key={item._id} style={{ justifyContent: "space-between" }}>
                                    <ContainerComponent.Item>
                                        <Text.MiddleLine>
                                            <Icon.CircleIcon >
                                                <Icon.Image src={item.profileImage}></Icon.Image>
                                            </Icon.CircleIcon>
                                        </Text.MiddleLine>
                                        <Text.MiddleLine>
                                            <Text.Subtitle style={{ textAlign: "start", margin: 0 }}>
                                                {item.username}
                                            </Text.Subtitle>
                                        </Text.MiddleLine>
                                    </ContainerComponent.Item>
                                    <ContainerComponent.Item style={{ padding: '10px' }}>
                                        <Icon onClick={(e) => setMember((prev) => prev.filter((i) => i._id !== item._id))}>
                                            <TiUserDelete ></TiUserDelete>
                                        </Icon>
                                    </ContainerComponent.Item>
                                </ContainerComponent.Flex>
                            )
                        })}
                    {!member.length && <Text.CenterLine>No member</Text.CenterLine>}

                </ContainerComponent.Pane>

            </ContainerComponent>
        </Message>
    )
}
