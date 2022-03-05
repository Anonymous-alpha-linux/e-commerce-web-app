import React from 'react'
import { ContainerComponent, Form, Icon, Preview,Text } from '../components'
import { FaHome, FaPenSquare, FaSignOutAlt} from 'react-icons/fa';
import { MdOutlineWork} from 'react-icons/md';
import { AiFillRightCircle, AiFillPieChart} from 'react-icons/ai';
import { GrDocumentText} from 'react-icons/gr'
import { useState } from 'react';
import { RiAccountCircleFill} from 'react-icons/ri'
export default function MenuContainer() {
    const [switchToggle,setSwitchToggle] = useState(false);
    const ToggleSwitch = () => {
        switchToggle ? setSwitchToggle(false) : setSwitchToggle(true) 
    }
  return (
    <ContainerComponent.Toggle style={{width: "375px",height:"100vh",background:"white"}}>
        <ContainerComponent.Inner style={{position:"absolute"}}></ContainerComponent.Inner>
        <ContainerComponent.Inner>
            <ContainerComponent.Flex style={{justifyContent:"center",alignItems:"center",padding:"25px"}}>
                  <Preview.Images 
                  image={"https://tinyurl.com/vwcvkbhv"}
                  style={{
                      width:"70px",
                      height: "70px",
                      borderRadius:"50%"
                  }}
                  >
                </Preview.Images>
            </ContainerComponent.Flex>
            <ContainerComponent.Flex>
                <ContainerComponent.Item style={{width:"100%",padding:"20px",display:"flex",alignItems:"center",position:"relative"}}>
                    <Icon style={{marginLeft:"20px"}}>
                        <FaHome style={{ fontSize: "30px" }}></FaHome>
                    </Icon>
                    <Text.Title style={{left:"50%",transform:"translateX(-50%)",position:"absolute"}}>
                        DashBoard
                    </Text.Title>
                </ContainerComponent.Item>
                <ContainerComponent.Item style={{ width: "100%", padding: "20px", display: "flex", alignItems: "center", position: "relative" }}>
                    <Icon style={{ marginLeft: "20px" }}>
                        <AiFillPieChart style={{ fontSize: "30px" }}></AiFillPieChart>
                    </Icon>
                    <Text.Title style={{ left: "50%", transform: "translateX(-50%)", position: "absolute" }}>
                        Chart
                    </Text.Title>
                </ContainerComponent.Item>
                <ContainerComponent.Item style={{ width: "100%", padding: "20px", display: "flex", alignItems: "center", position: "relative" }}>
                    <Icon style={{ marginLeft: "20px", fontSize: "35px" }}>
                        <GrDocumentText style={{ fontSize: "30px" }}></GrDocumentText>
                    </Icon>
                    <Text.Title style={{ left: "50%", transform: "translateX(-50%)", position: "absolute" }}>
                        Document
                    </Text.Title>
                </ContainerComponent.Item>
                <ContainerComponent.Item style={{ width: "100%", padding: "20px", display: "flex", alignItems: "center", position: "relative" }}>
                    <Icon style={{ marginLeft: "20px" }}>
                          <FaPenSquare style={{ fontSize: "30px" }}></FaPenSquare>
                    </Icon>
                    <Text.Title style={{ left: "50%", transform: "translateX(-50%)", position: "absolute" }}>
                        Post
                    </Text.Title>
                </ContainerComponent.Item>
                <ContainerComponent.Item style={{ width: "100%", padding: "20px", display: "flex", alignItems: "center", position: "relative" }}>
                    <Icon style={{ marginLeft: "20px" }}>
                        <RiAccountCircleFill style={{ fontSize: "30px" }}></RiAccountCircleFill>
                    </Icon>
                    <Text.Title style={{ left: "50%", transform: "translateX(-50%)", position: "absolute" }}>
                        Account
                    </Text.Title>
                </ContainerComponent.Item>
                {/* <ContainerComponent.Item style={{ width: "100%", padding: "20px", display: "flex", alignItems: "center", position: "relative" }}>
                    <Icon style={{ marginLeft: "20px" }}>
                        <FaSignOutAlt style={{ fontSize: "30px" }}></FaSignOutAlt>
                    </Icon>
                    <Text.Title style={{ left: "50%", transform: "translateX(-50%)", position: "absolute" }}>
                        Log out
                    </Text.Title>
                </ContainerComponent.Item> */}
                <ContainerComponent.Item style={{ width: "100%", padding: "20px", display: "flex", alignItems: "center", position: "relative" }}>
                    <Icon style={{ marginLeft: "20px" }}>
                        <MdOutlineWork style={{fontSize:"35px"}}></MdOutlineWork>
                    </Icon>
                    <Text.Title style={{ left: "50%", transform: "translateX(-50%)", position: "absolute" }}>
                        Workspace
                    </Text.Title>
                    <Icon  
                    style={{position:"absolute",right:"5%",fontSize:"25px"}} 
                    onClick = {ToggleSwitch}
                    >
                        <AiFillRightCircle></AiFillRightCircle>
                    </Icon>
                </ContainerComponent.Item>
                <ContainerComponent.Toggle 
                className={switchToggle ? "show" : "hide"}
                style={{margin:"0 auto"}}>
                    <ContainerComponent.Item style={{ width: "100%", padding: "20px", display: "flex", alignItems: "center",gap:"20px" }}>
                        <Icon style={{ marginLeft: "20px" }}>
                            <MdOutlineWork></MdOutlineWork>
                        </Icon>
                        <Text.Title>
                            Workspace 1
                        </Text.Title>
                    </ContainerComponent.Item>   
                    <ContainerComponent.Item style={{ width: "100%", padding: "20px", display: "flex", alignItems: "center",gap:"20px"}}>
                        <Icon style={{ marginLeft: "20px" }}>
                            <MdOutlineWork></MdOutlineWork>
                        </Icon>
                        <Text.Title>
                            Workspace 2
                        </Text.Title>
                    </ContainerComponent.Item>
                </ContainerComponent.Toggle>
            </ContainerComponent.Flex>
        </ContainerComponent.Inner>
    </ContainerComponent.Toggle>
  )
}
