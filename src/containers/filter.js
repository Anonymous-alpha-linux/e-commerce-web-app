import { useEffect, useRef } from "react";
import {
  ButtonComponent,
  ContainerComponent,
  Dropdown,
  Form,
  Text,
} from "../components";
import { usePostContext } from "../redux";

export default function Filter({ forwardedRef, ...props }) {
  // const { filterPost } = usePostContext();
  const { loader, selectOptions } = props;
  const selectHandler = (e) => {
    console.log("filter");
    const filterValue = Number(e.target.value);
    loader(filterValue);
  };
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
              height: "1px",
            }}
          ></hr>
          <Text.RightLine>
            <Text.MiddleLine>
              <Text style={{ margin: "0 5px" }}>Filter:</Text>
              <Form.Select onChange={selectHandler}>
                {selectOptions.map((option, index) => {
                  return (
                    <Form.Option key={index + 1} value={option.value}>
                      {option.label}
                    </Form.Option>
                  );
                })}
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
