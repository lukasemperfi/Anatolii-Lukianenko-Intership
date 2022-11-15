import { useEffect, useState } from "react";

import { ItemsList } from "../../components/ItemsList/ItemsList";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { PageContainer } from "../../components/PageContainer/PageContainer";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Loader, LoaderSize } from "../../components/Loader/Loader";
import { ListFooter } from "../../components/ItemsList/ListFooter/ListFooter";
import { EmptyData } from "../../components/EmptyData/EmptyData";
import {
  getMovies,
  selectMoviesState,
} from "../../store/moviesSlice/moviesSlice";
import { MovieInfo } from "../../store/moviesSlice/models/MovieInfo";

export const MoviesList = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    movies,
    pagination: { isListEnd, page },
    isMoreLoading,
    isLoading,
  } = useAppSelector(selectMoviesState);

  const fetchMovies = (currentPage: number) => {
    dispatch(getMovies(currentPage));
  };

  const setCurrPage = () => {
    if (!isListEnd && !isMoreLoading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const renderItem = (movie: MovieInfo) => <MovieCard movie={movie} />;

  return (
    <PageContainer>
      {isLoading && currentPage === 1 ? (
        <Loader size={LoaderSize.medium} centered />
      ) : (
        <ItemsList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={
            <ListFooter isLoading={isMoreLoading} isListEnd={isListEnd} />
          }
          ListEmptyComponent={<EmptyData title="No Movies" />}
          onEndReached={setCurrPage}
        />
      )}
    </PageContainer>
  );
};
