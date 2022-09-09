import { useInfiniteQuery } from "react-query";

const useInfinityScroll = (QueryKey, QueryFnc, ableFlag) => {
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    QueryKey,
    ({ pageParam = 1 }) => QueryFnc(pageParam),
    {
      enabled: !!ableFlag,
      getNextPageParam: lastPage =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
      refetchOnWindowFocus: false
    }
  );
  return [data, status, fetchNextPage, isFetchingNextPage];
};

export default useInfinityScroll;
