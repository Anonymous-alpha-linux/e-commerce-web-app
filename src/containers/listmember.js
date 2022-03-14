import React from "react";
import {
  ButtonComponent,
  ContainerComponent,
  Form,
  Icon,
  ListMemberComponent,
  Preview,
  Text,
} from "../components";
import { FaSearch, FaFilter } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

export default function ListMemberContainer() {
  return (
    <ListMemberComponent style={{ width: "100%" }}>
      <ContainerComponent style={{ background: "#ffff", color: "black" }}>
          
        <ContainerComponent.Item
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text.Title style={{}}>ListMember</Text.Title>
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
              style={{
                width: "100%",
                marginLeft: "5px",
                border: "none",
                outline: "none",
              }}
            ></Form.Input>
            <Icon>
                
               <FaFilter></FaFilter>
            </Icon>
          </ListMemberComponent.SearchForm>
        </ContainerComponent.Item>



        <ContainerComponent.Flex>
          <ContainerComponent.Item>
            <ContainerComponent.Flex
              style={{ height: "50px", alignItems: "center" }}
            >
              <ContainerComponent.Item>
                <Icon.CircleIcon>
                  <BsFillPersonFill></BsFillPersonFill>
                </Icon.CircleIcon>
              </ContainerComponent.Item>
              <ContainerComponent.Item>
                <Text.Subtitle style={{ textAlign: "start", margin: 0 }}>
                  Name
                </Text.Subtitle>
              </ContainerComponent.Item>
            </ContainerComponent.Flex>
            <ContainerComponent.Flex
              style={{ height: "50px", alignItems: "center" }}
            >
              <ContainerComponent.Item>
                <Icon.CircleIcon>
                  <BsFillPersonFill></BsFillPersonFill>
                </Icon.CircleIcon>
              </ContainerComponent.Item>
              <ContainerComponent.Item>
                <Text.Subtitle style={{ textAlign: "start", margin: 0 }}>
                  Name
                </Text.Subtitle>
              </ContainerComponent.Item>
            </ContainerComponent.Flex>
            <ContainerComponent.Flex
              style={{
                height: "50px",
                alignItems:
                  "center",
              }}
            >
              <ContainerComponent.Item>
                <Icon.CircleIcon>
                  <BsFillPersonFill></BsFillPersonFill>
                </Icon.CircleIcon>
              </ContainerComponent.Item>
              <ContainerComponent.Item>
                <Text.Subtitle style={{ textAlign: "start", margin: 0 }}>
                  Name
                </Text.Subtitle>
              </ContainerComponent.Item>
            </ContainerComponent.Flex>
          </ContainerComponent.Item>
        </ContainerComponent.Flex>
      </ContainerComponent>
    </ListMemberComponent>
  );
}
