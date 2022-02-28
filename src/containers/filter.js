import { useEffect, useRef } from "react";
import { ButtonComponent, ContainerComponent, Dropdown, Form, Text } from "../components";
import { usePostContext } from "../redux";

export default function Filter() {
  const { filterPost } = usePostContext();
  return (
    <ContainerComponent>
      <ContainerComponent.Inner
        style={{
          position: "relative",
          padding: "1px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "5px",
          }}
        >
          <hr
            style={{
              flexGrow: 1,
              height: "1px"
            }}
          ></hr>
          <Text.RightLine>
            <Text.MiddleLine>
              <Text style={{ margin: '0 5px' }}>
                Filter:
              </Text>
              <Form.Select onChange={filterPost}>
                <Form.Option value={0}>
                  Most Recent
                </Form.Option>
                <Form.Option value={1}>
                  Most Like
                </Form.Option>
              </Form.Select>
              {/* <Dropdown component={<Text.MiddleLine>
                Most Recent
              </Text.MiddleLine>}>
                <Dropdown.Option value={0}>
                  Most Recent
                </Dropdown.Option>
                <Dropdown.Option value={1}>
                  Most Like
                </Dropdown.Option>
              </Dropdown> */}
            </Text.MiddleLine>
          </Text.RightLine>
        </div>
      </ContainerComponent.Inner>
    </ContainerComponent>
  );
}
