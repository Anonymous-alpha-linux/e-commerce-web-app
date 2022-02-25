import { ContainerComponent, Text } from "../components";

export default function Filter() {
  return (
    <ContainerComponent>
      <ContainerComponent.Inner
        style={{
          position: "relative",
          padding: "1px",
        }}
      >
        {/* <ContainerComponent.Flex style={{
          alignItems: 'center'
        }}>
          <ContainerComponent.Item style={{
            flexGrow: 1
          }}>
            <hr
              style={{
                display: "inline-block",
                width: "100%",
              }}
            ></hr>
          </ContainerComponent.Item>
          <ContainerComponent.Item>
            <Text.MiddleLine style={{
              width: '20%'
            }}>
              <Text.Subtitle
                style={{
                  display: "inline-block",
                }}
              >
                Filter:
              </Text.Subtitle>
              <Text.MiddleLine>
                <Text.Title
                  style={{
                    display: "inline-block",
                    marginLeft: "2px",
                  }}
                >
                  Top
                </Text.Title>
              </Text.MiddleLine>
            </Text.MiddleLine>
          </ContainerComponent.Item>
        </ContainerComponent.Flex> */}
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
              flexGrow: "9",
              height: "1px",
              margin: "0em",
            }}
          ></hr>
          <h3
            style={{
              fontSize: "13px",
              flexGrow: "0.1",
            }}
          >
            Filter:
            <select style={{ fontSize: "12px" }}>
              <option style={{ fontSize: "12px" }}>Top</option>
              <option style={{ fontSize: "12px" }}>Most Recent</option>
              <option style={{ fontSize: "12px" }}>Most Like</option>
            </select>
          </h3>
        </div>
      </ContainerComponent.Inner>
    </ContainerComponent>
  );
}
