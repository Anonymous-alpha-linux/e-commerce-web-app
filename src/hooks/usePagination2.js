import { useState } from "react";

export default function usePagination(initialPage) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const onChangePage = (page) => {
    setCurrentPage(page);
  };
  return [currentPage, onChangePage];
}
