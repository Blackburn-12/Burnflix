import React from "react";

const Pagination = ({
  totalPosts,
  postPerPage,
  setCurrentPage,
  currentPage,
  totalPages, // Accept total pages as a prop
}) => {
  const pagesToShow = 10;

  const generatePageNumbers = () => {
    const pageArr = [];
    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageArr.push(i);
    }
    return pageArr;
  };

  const pageArr = generatePageNumbers();

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="bg-Dark flex flex-wrap justify-center p-4 gap-3 sm:gap-2 md:gap-4 lg:gap-6 xl:gap-6">
      {currentPage > pagesToShow && (
        <button
          onClick={() => setCurrentPage(currentPage - pagesToShow)}
          className="bg-CardColor text-white py-2 px-4 rounded-l-md transition duration-300 ease-in-out hover:bg-CardColorHover focus:outline-none"
        >
          &laquo; Prev {pagesToShow}
        </button>
      )}
      {pageArr.map((pageNumber, index) => (
        <button
          onClick={() => setCurrentPage(pageNumber)}
          className={`py-2 px-4 rounded-l-md transition duration-300 ease-in-out hover:bg-CardColorHover focus:outline-none ${
            pageNumber === currentPage ? "bg-[#EDCC4E] text-white" : "bg-CardColor text-white"
          }`}
          key={index}
        >
          {pageNumber}
        </button>
      ))}
      {totalPages > currentPage + pagesToShow && (
        <button
          onClick={() => setCurrentPage(currentPage + pagesToShow)}
          className="bg-CardColor text-white py-2 px-4 rounded-l-md transition duration-300 ease-in-out hover:bg-CardColorHover focus:outline-none"
        >
          Next {pagesToShow} &raquo;
        </button>
      )}
    </div>
  );
};

export default Pagination;
