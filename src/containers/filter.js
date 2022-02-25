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
        <ContainerComponent.Flex style={{
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
        </ContainerComponent.Flex>
      </ContainerComponent.Inner>
    </ContainerComponent>
  );
}
