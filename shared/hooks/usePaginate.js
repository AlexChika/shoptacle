import { useState, useCallback, useMemo, useEffect } from "react";
import Pagination from "shared/components/Pagination";

function getPaginated(array, itemsPerPage = 0, page) {
  let _page = page - 1;
  let startIndex = _page * itemsPerPage;
  let stopIndex = startIndex + itemsPerPage;
  return array.slice(startIndex, stopIndex);
}

function usePaginate(
  array = [],
  itemsPerPage,
  currentPage = 1,
  controls = true,
  cb
) {
  const [_paginated, setPaginated] = useState(
    getPaginated(array, itemsPerPage, currentPage)
  );

  const [_currentPage, setCurrentPage] = useState(currentPage);

  if (!itemsPerPage || typeof itemsPerPage !== "number")
    throw new Error(
      "expected itemsPerPage to be a number but got " + itemsPerPage
    );

  const pages = Math.ceil(array.length / itemsPerPage);

  const handlePaginate = useCallback(
    function (page) {
      const paginated = getPaginated(array, itemsPerPage, page);
      setPaginated(paginated);
      setCurrentPage(page);
      if (cb) cb(page);
    },
    [array, itemsPerPage]
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
    setPaginated(getPaginated(array, itemsPerPage, 1));
    setCurrentPage(1);
  }, [array, itemsPerPage]);

  return {
    handlePaginate,
    noOfpages: pages,
    paginated: _paginated,
    Pagination: _Pagination,
  };
}

export default usePaginate;
