import { useState, useCallback, useMemo, useEffect } from "react";
import Pagination from "shared/components/Pagination";

function usePaginate(
  array = [],
  itemsPerPage,
  currentPage = 1,
  controls = true
) {
  const [_paginated, setPaginated] = useState([]);
  const [_currentPage, setCurrentPage] = useState(currentPage);

  if (!itemsPerPage || typeof itemsPerPage !== "number")
    throw new Error(
      "expected itemsPerPage to be a number but got " + itemsPerPage
    );

  const pages = Math.ceil(array.length / itemsPerPage);

  const handlePaginate = useCallback(
    function (page = _currentPage) {
      let _page = page - 1;
      let startIndex = _page * itemsPerPage;
      let stopIndex = startIndex + itemsPerPage;
      setPaginated(array.slice(startIndex, stopIndex));
      setCurrentPage(page);
    },
    [array, itemsPerPage, _currentPage]
  );

  const _Pagination = useMemo(
    function () {
      return function () {
        if (!controls) return null;
        return (
          <Pagination
            noOfpages={pages}
            currentPage={_currentPage}
            handlePaginate={handlePaginate}
          />
        );
      };
    },
    [controls, pages, _currentPage, handlePaginate]
  );

  useEffect(() => {
    handlePaginate();
  }, []);

  return {
    handlePaginate,
    noOfpages: pages,
    paginated: _paginated,
    Pagination: _Pagination,
  };
}

export default usePaginate;
