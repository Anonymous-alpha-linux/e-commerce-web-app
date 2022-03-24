import React from "react";
import { ContainerComponent, Text } from "../components";

function Pagination({
  page,
  firstPage = 0,
  lastPage,
  onChangePage,
  onLoadData,
  onReset
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
  const onSelected = (page) => {
    console.log(page);
    onChangePage(page);
    if (onLoadData) {
      onLoadData(page);
    }
  }
  return (
    <ContainerComponent className="pagination__root">
      <ContainerComponent.Flex style={{ gap: "15px", padding: '10px 0' }}>
        <Text.MiddleLine className="pagination__previous" style={{ padding: '10px', cursor: 'pointer' }} onClick={onPrevious}>
          <Text.Bold>Previous</Text.Bold>
        </Text.MiddleLine>
        {Array(lastPage - firstPage + 1)
          .fill()
          .map((_, index) => (
            <Text.MiddleLine
              key={index + 1}
              onClick={() => {
                onSelected(index);
                onLoadData(index);
              }}
              style={{
                color: `${page === index ? "blue" : "#000"}`,
                fontWeight: "bold",
                padding: '10px',
                border: '1px solid #000',
                cursor: 'pointer'
              }}
            >
              {firstPage + index}
            </Text.MiddleLine>
          ))}
        <Text.MiddleLine className="pagination__next" style={{
          padding: '10px',
          cursor: 'pointer'
        }} onClick={onNext}>
          <Text.Bold>Next</Text.Bold>
        </Text.MiddleLine>
      </ContainerComponent.Flex>
    </ContainerComponent>
  );
}

export default Pagination;
