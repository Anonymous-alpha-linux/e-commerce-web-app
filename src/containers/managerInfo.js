import React, { useEffect, useState } from "react";
import {
  ContainerComponent,
  Icon,
  ButtonComponent,
  Form,
  Text,
  AnimateComponent,
} from "../components";
import { useAuthorizationContext, useWorkspaceContext } from "../redux";

export default function ManagerInfo() {
  const { workspace } = useWorkspaceContext();
  const { getProfile } = useAuthorizationContext();

  const [profile, setProfile] = useState({
    profileImage: "",
    lastName: "",
    firstName: "",
    roleName: "",
    introduction: "",
    gender: "",
    age: "",
    email: "",
    workTitle: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (workspace.manager) {
      setLoading(true);
      getProfile(workspace.manager, (data) => {
        if (!data.error) {
          setProfile((o) => ({ ...o, ...data }));
        }
        setLoading(false);
      });
    }
  }, [workspace]);

  return (
    <ContainerComponent>

      <ContainerComponent.Inner className="personal__green">
        <AnimateComponent.Zoom>
          <ContainerComponent.Pane className="personal__frameAva" style={{ position: "relative", }}>
            <Text.CenterLine
              style={{ position: "relative", zIndex: 1, height: "27.5px" }}
            >
              <Icon.CircleIcon
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  width: "57px",
                  height: "57px",
                  zIndex: 1,
                }}
              >
                <Icon.Image
                  src={`${profile.profileImage ||
                    process.env.PUBLIC_URL + "/add-avatar.jpg"
                    }`}
                  alt={`Avatar`}
                  style={{ objectFit: "fill" }}
                ></Icon.Image>
              </Icon.CircleIcon>
              <Text.CenterLine style={{ paddingTop: "10px" }}>
                <Text.Title>{`${profile.lastName || "Anonymous"} ${profile.firstName || "Nguyen"
                  }`}</Text.Title>
                <Text.Subtitle
                  style={{
                    textTransform: "capitalize",
                    opacity: 0.5,
                    fontWeight: 500,
                  }}
                >
                  {profile.roleName || "QA Coordinator"}
                </Text.Subtitle>
              </Text.CenterLine>
            </Text.CenterLine>
            <Text.Line
              style={{
                width: "100%",
                height: "141px",
                borderRadius: "10px",
                boxShadow: "1px 1px 5px 2px black",
                position: "relative",
                bottom: 0,
                background: "#fff",
                border: "1px solid #163d3c",
              }}
            ></Text.Line>
          </ContainerComponent.Pane>
        </AnimateComponent.Zoom>
      </ContainerComponent.Inner>

      <ContainerComponent.Inner>
        <ContainerComponent.Pane className="personal__threeFrame"></ContainerComponent.Pane>

        <ContainerComponent.Pane className="personal__greenBot" style={{ paddingTop: '20px' }}>
          <ContainerComponent.Inner style={{
            padding: '20px 0 0 0',
            maxWidth: "720px",
            width: '100%'
          }}>
            <Text.Title style={{ lineHeight: "2px", textIndent: "10px", transform: "translate(10px,24px)", }}>
              Profile
            </Text.Title>
            <Form.TextArea readOnly={true} rows={15} style={{ width: "100%", borderRadius: "10px", padding: "40px 10px 10px 20px", }} value={profile.introduction} placeholder="Your introduction"></Form.TextArea>
            <Text.MiddleLine style={{ lineHeight: 0, textIndent: "5px", transform: "translate(10px,24px)", fontWeight: 800, }}>
              <Text.Label>Gender</Text.Label>
            </Text.MiddleLine>
            <Form.Input readOnly={true} style={{ border: "1px solid #163D3C", textAlign: "right", borderRadius: "10px" }} value={profile.gender.toUpperCase()} placeholder="Post your information"></Form.Input>

            <Text.MiddleLine style={{ lineHeight: 0, textIndent: "5px", transform: "translate(10px,24px)", fontWeight: 800 }}>
              <Text.Label>Age</Text.Label>
            </Text.MiddleLine>
            <Form.Input placeholder="Choose Date" readOnly={true} value={profile.age} style={{ border: "1px solid #163D3C", textAlign: "right", borderRadius: "10px" }}></Form.Input>
            <Text.MiddleLine style={{ lineHeight: 0, textIndent: "5px", transform: "translate(10px,24px)", fontWeight: 800, }}>
              <Text.Label>Email</Text.Label>
            </Text.MiddleLine>
            <Form.Input placeholder="Post your information" readOnly={true} style={{ border: "1px solid #163D3C", textAlign: "right", borderRadius: "10px" }} value={profile.email}></Form.Input>

            <Text.MiddleLine style={{ lineHeight: 0, textIndent: "5px", transform: "translate(10px,24px)", fontWeight: 800, }}  >
              <Text.Label>Department</Text.Label>
            </Text.MiddleLine>
            <Form.Input
              placeholder="Choose Date"
              readOnly={true}
              value={workspace.workTitle}
              style={{
                border: "1px solid #163D3C",
                textAlign: "right",
                borderRadius: "10px"
              }}
            ></Form.Input>
          </ContainerComponent.Inner>
        </ContainerComponent.Pane>
      </ContainerComponent.Inner>
    </ContainerComponent>
  );
}
