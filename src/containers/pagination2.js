import React from "react";
import { ContainerComponent, Text } from "../components";

function Pagination({
  page,
  firstPage = 0,
  lastPage,
  onChangePage,
  onLoadData,
}) {
  const onPrevious = () => {
    onChangePage(page > 0 ? page - 1 : page);
    if (onLoadData) {
      onLoadData(page);
    }
  };
  const onNext = () => {
    onChangePage(page + 1 < lastPage ? page + 1 : page);
    if (onLoadData && page + 1 < lastPage) {
      onLoadData(page + 1);
    }
  };
  return (
    <ContainerComponent className="pagination__root">
      <ContainerComponent.Flex style={{ gap: "15px" }}>
        <Text.MiddleLine className="pagination__previous" onClick={onPrevious}>
          <Text.Bold>Previous</Text.Bold>
        </Text.MiddleLine>
        {Array(lastPage - firstPage + 1)
          .fill()
          .map((_, index) => (
            <Text.MiddleLine
              key={index + 1}
              style={{
                color: `${page === index ? "blue" : "#000"}`,
                fontWeight: "bold",
              }}
            >
              {firstPage + index}
            </Text.MiddleLine>
          ))}
        <Text.MiddleLine className="pagination__next" onClick={onNext}>
          <Text.Bold>Next</Text.Bold>
        </Text.MiddleLine>
      </ContainerComponent.Flex>
    </ContainerComponent>
  );
}

export default Pagination;
