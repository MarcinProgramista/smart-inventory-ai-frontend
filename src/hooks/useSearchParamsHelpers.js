export default function useSearchParamsHelpers(setSearchParams) {
  const setQuery = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (value) {
        next.set("q", value);
      } else {
        next.delete("q");
      }

      next.set("page", "1");

      return next;
    });
  };

  const setSort = (by, order) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      next.set("sort", by);
      next.set("order", order);
      next.set("page", "1");

      return next;
    });
  };

  const setPage = (page) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      next.set("page", String(page));

      return next;
    });
  };

  return {
    setQuery,
    setSort,
    setPage,
  };
}
