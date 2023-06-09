import { getTodayDataApi } from '../api/dataApi';
import { MAX_NUM, TODAY } from '../constants/orders';
import usePage from './usePage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const useTableQuery = () => {
  const { currentPage, maxPage } = usePage();
  const queryClient = useQueryClient();

  const { data: getData } = useQuery(
    ['data', currentPage],
    () => {
      return getTodayDataApi(currentPage, MAX_NUM, TODAY);
    },
    { suspense: true }
  );

  useEffect(() => {
    if (currentPage <= maxPage - 2) {
      const nextPage = currentPage + 1;

      queryClient.prefetchQuery(['data', nextPage], () =>
        getTodayDataApi(nextPage, MAX_NUM, TODAY)
      );
    }
  }, [currentPage, queryClient]);

  return { getData };
};

export default useTableQuery;
