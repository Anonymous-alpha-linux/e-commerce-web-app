import React from "react";
import {
  ContainerComponent,
  Form,
  Icon,
  ListMemberComponent,
  Text,
} from "../components";
import { FaSearch, FaFilter } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import {Link} from "react-router-dom";



export default function ListMemberContainer() {
  const  [member, setMember] = React.useState([
    {
      _id: 1,
      username: "gow",
      email: "tinhntgcd18753@fpt.edu.vn",
      profileImag:
        "https://laptrinhcuocsong.com/images/anh-vui-lap-trinh-vien-7.png",
    },
    {
      _id: 2,
      username: "LM",
      email: "KN18753@fpt.edu.vn",
      profileImag:
        "https://laptrinhcuocsong.com/images/anh-vui-lap-trinh-vien-7.png",
    },
    {
      _id: 3,
      username: "QK",
      email: "QK753@fpt.edu.vn",
      profileImag:
        "https://laptrinhcuocsong.com/images/anh-vui-lap-trinh-vien-7.png",
    },
    {
      _id: 4,
      username: "Bin",
      email: "Bin753@fpt.edu.vn",
      profileImag:
        "https://laptrinhcuocsong.com/images/anh-vui-lap-trinh-vien-7.png",
    },
  ]);
  const [searchOuput,setOutput]=React.useState([]);
const [input,setInput]=React.useState('');
  function SearchMember(input) {setOutput(member.filter(person => person.username.toLowerCase().includes(input.toLowerCase())))}
  function inputHandler(e) {
    setInput(e.target.value);
    SearchMember(e.target.value);
  }

    return (
    <ListMemberComponent style={{ width: "100%", maxWidth:'690px', margin: '0 auto' }}>
      <ContainerComponent style={{ background: "#ffff", color: "black" }}>
        <ContainerComponent.Pane className="list-member__header">
        <ContainerComponent.Item
          style={{
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text.Title style={{margin: '10px'}}>ListMember</Text.Title>
          <Link to="/">
                        <Text.Line style={{ display: "block", backgroundColor: "silver", padding: "5px", borderRadius: "10px",position:'absolute',right:'0%', transform:'translate(-10%,-50%)' }}>
                            <Text.MiddleLine>
                                <Icon></Icon>
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
          <ListMemberComponent.SearchForm
            style={{
                display: 'flex',
              justifyContent: "flex-start",
              alignItems: "center",
              border: "1px solid black",
              borderRadius: "10px",
              padding: "5px",
            }}
          >
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
          </ListMemberComponent.SearchForm>
        </ContainerComponent.Item>
        </ContainerComponent.Pane>


        <ContainerComponent.Pane className="list-member__body">
              {searchOuput.length && searchOuput.map((item) => {return (
                <ContainerComponent.Flex style={{justifyContent:"space-between"}}>
                <ContainerComponent.Item>
                  <Text.MiddleLine>
                    <Icon.CircleIcon >
                      <Icon.Image src={item.profileImag}></Icon.Image>
                    </Icon.CircleIcon>
                  </Text.MiddleLine>
                  <Text.MiddleLine>
                    <Text.Subtitle style={{ textAlign: "start", margin: 0 }}>
                      {item.username}
                    </Text.Subtitle>
                  </Text.MiddleLine>
                </ContainerComponent.Item>
                <ContainerComponent.Item style={{padding:'10px'}}>
                  <Icon onClick={(e) => setMember((prev) => prev.filter((i) => i._id !== item._id))}>
                    <TiUserDelete ></TiUserDelete>
                  </Icon>
                </ContainerComponent.Item>
              </ContainerComponent.Flex>
              ) }) ||
               member.map((item) => {return (
                <ContainerComponent.Flex style={{justifyContent:"space-between"}}>
                <ContainerComponent.Item>
                  <Text.MiddleLine>
                    <Icon.CircleIcon >
                      <Icon.Image src={item.profileImag}></Icon.Image>
                    </Icon.CircleIcon>
                  </Text.MiddleLine>
                  <Text.MiddleLine>
                    <Text.Subtitle style={{ textAlign: "start", margin: 0 }}>
                      {item.username}
                    </Text.Subtitle>
                  </Text.MiddleLine>
                </ContainerComponent.Item>
                <ContainerComponent.Item style={{padding:'10px'}}>
                  <Icon onClick={(e) => setMember((prev) => prev.filter((i) => i._id !== item._id))}>
                    <TiUserDelete ></TiUserDelete>
                  </Icon>
                </ContainerComponent.Item>
              </ContainerComponent.Flex>
              ) })}
              {!member.length && <Text.CenterLine>No member</Text.CenterLine>}

        </ContainerComponent.Pane>
      </ContainerComponent>
    </ListMemberComponent>
  );
}
