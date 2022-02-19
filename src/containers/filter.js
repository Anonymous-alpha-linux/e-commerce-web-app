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
        <hr
          style={{
            margin: "auto 1vw",
            display: "inline-block",
            width: "80vw",
          }}
        ></hr>
        <Text.Subtitle
          style={{
            display: "inline-block",
            fontSize: "1.5vw",
            marginLeft: `2vw`,
            width: "10vw",
          }}
        >
          Filter...
          <span
            style={{
              display: "inline-block",
              fontSize: "80%",
              marginLeft: "2px",
            }}
          >
            Top
          </span>
        </Text.Subtitle>
      </ContainerComponent.Inner>
    </ContainerComponent>
  );
}
