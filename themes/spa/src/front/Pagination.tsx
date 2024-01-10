import { MouseEvent } from "react";

export default function Pagination(props: any) {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    const pageNumber = (e.target as HTMLLinkElement).getAttribute(
      "data-pagenumber",
    );
    if (pageNumber == props.currentPage) {
      return false;
    }
    props.onPageChanged(pageNumber);
  };
  return (
    <div className="pagination">
      {(() => {
        const items = [];
        for (let i = 0; i < props.total; i++) {
          const className =
            props.currentPage === i
              ? "pagination-item currentPage"
              : "pagination-item";
          items.push(
            <a
              key={i}
              className={className}
              href="#"
              data-pagenumber={i}
              onClick={handleClick}
            >
              {i + 1}
            </a>,
          );
        }
        return items;
      })()}
    </div>
  );
}
