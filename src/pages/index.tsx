import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

export async function getImages({ pageParam = null }) {
  const response = await api.get('/images', {
    params: {
      after: pageParam
    }
  });

  return response.data;
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    getImages, {
      getNextPageParam: (lastPage, pages) => lastPage.after,
    }
  );

  const formattedData: Image[] = useMemo(() => {
    if(data) {
      return data.pages.map((page) => page.data).flat();
    } else {
      return [];
    }
  }, [data]);

  if(isLoading) {
    return <Loading />;
  }

  if(isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        { hasNextPage && (
          <Button
            w='36'
            h='10'
            bg='orange.500'
            color='pGray.50'
            mt='10'
            onClick={isFetchingNextPage ? () => {} : () => fetchNextPage()}
          >
            { isFetchingNextPage ? 'Carregando...' : 'Carregar mais' }
          </Button>
        )}
      </Box>
    </>
  );
}
