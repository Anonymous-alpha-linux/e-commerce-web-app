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
    if (typeof onLoadData !== 'undefined') {
      onLoadData(page);
    }
  };
  const onNext = () => {
    onChangePage(page + 1 < lastPage ? page + 1 : page);
    if (typeof onLoadData !== 'undefined' && page + 1 < lastPage) {
      onLoadData(page + 1);
    }
  };
  const onSelected = (page) => {
    onChangePage(page);
    if (typeof onLoadData !== 'undefined') {
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


// const Pagination = ({ page, pages, changePage }) => {
//   let middlePagination;

//   if (pages <= 5) {
//     middlePagination = [...Array(pages)].map((_, idx) => (
//       <button
//         key={idx + 1}
//         onClick={() => changePage(idx)}
//         disabled={page === idx}
//       >
//         {idx + 1}
//       </button>
//     ));
//   } else {
//     const startValue = Math.floor((page) / 5) * 5;

//     middlePagination = (
//       <>
//         {[...Array(5)].map((_, idx) => (
//           <button
//             key={startValue + idx}
//             disabled={page === startValue + idx}
//             onClick={() => changePage(startValue + idx)}
//           >
//             {startValue + idx}
//           </button>
//         ))}

//         <button>...</button>
//         <button onClick={() => changePage(pages)}>{pages}</button>
//       </>
//     );

//     if (page > 5) {
//       if (pages - page >= 5) {
//         middlePagination = (
//           <>
//             <button onClick={() => changePage(0)}>1</button>
//             <button>...</button>
//             <button onClick={() => changePage(startValue)}>{startValue}</button>
//             {[...Array(5)].map((_, idx) => (
//               <button
//                 key={startValue + idx + 1}
//                 disabled={page === startValue + idx}
//                 onClick={() => changePage(startValue + idx)}
//               >
//                 {startValue + idx + 1}
//               </button>
//             ))}

//             <button>...</button>
//             <button onClick={() => changePage(pages)}>{pages}</button>
//           </>
//         );
//       } else {
//         let amountLeft = pages - page + 5;
//         middlePagination = (
//           <>
//             <button onClick={() => changePage(0)}>1</button>
//             <button>...</button>
//             <button onClick={() => changePage(startValue)}>{startValue}</button>
//             {[...Array(amountLeft)].map((_, idx) => (
//               <button
//                 key={startValue + idx}
//                 disabled={page === startValue + idx}
//                 style={
//                   pages < startValue + idx ? { display: "none" } : null
//                 }
//                 onClick={() => changePage(startValue + idx)}
//               >
//                 {startValue + idx}
//               </button>
//             ))}
//           </>
//         );
//       }
//     }
//   }

//   return (
//     pages > 1 && (
//       <div className="pagination">
//         <button
//           className="pagination__prev"
//           onClick={() => changePage((page) => page - 1)}
//           disabled={page === 1}
//         >
//           &#171;
//         </button>
//         {middlePagination}
//         <button
//           className="pagination__next"
//           onClick={() => changePage((page) => page + 1)}
//           disabled={page === pages}
//         >
//           &#187;
//         </button>
//       </div>
//     )
//   );
// };

// export default Pagination;
