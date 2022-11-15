import { ItemsList } from "../../components/ItemsList/ItemsList";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { PageContainer } from "../../components/PageContainer/PageContainer";
import { useAppSelector } from "../../hooks/redux";
import { MovieInfo } from "../../store/moviesSlice/models/MovieInfo";
import { EmptyData } from "../../components/EmptyData/EmptyData";
import { selectFavoriteMovies } from "../../store/favoriteSlice/favoriteSlice";

export const FavoritePage = () => {
  const favoriteMovies = useAppSelector(selectFavoriteMovies);

  const renderItem = (favoriteMovie: MovieInfo) => (
    <MovieCard movie={favoriteMovie} cardType="secondary" />
  );

  return (
    <PageContainer>
      <ItemsList
        data={favoriteMovies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyData title="No Movies" />}
      />
    </PageContainer>
  );
};
