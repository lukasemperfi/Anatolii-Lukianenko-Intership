import { FC } from "react";
import cn from "classnames";
import { generatePath, Link } from "react-router-dom";

import { AdaptivImage } from "../AdaptivImage/AdaptivImage";
import styles from "./MovieCard.module.scss";
import noPosterImg from "../../assets/no-poster.png";
import { ReactComponent as HeartIcon } from "../../assets/heart.svg";
import { MovieInfo } from "../../store/moviesSlice/models/MovieInfo";
import { getPosterImg } from "../../api/services/helpers/tmdb";
import { TmdbPath } from "../../api/services/tmbd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addFavoriteMovie,
  deleteFavoriteMovie,
  selectIsMovieFavorite,
} from "../../store/favoriteSlice/favoriteSlice";
import { Path } from "../../navigation/routeNames";

const cardVariants = {
  primary: {
    showTopRight: true,
    showDeleteBtn: false,
  },
  secondary: {
    showTopRight: false,
    showDeleteBtn: true,
  },
};

type CardVariantsType = keyof typeof cardVariants;

interface MovieCardProps {
  movie: MovieInfo;
  cardType?: CardVariantsType;
}

export const MovieCard: FC<MovieCardProps> = ({
  movie,
  cardType = "primary",
}) => {
  const dispatch = useAppDispatch();
  const isMovieFavorite = useAppSelector((state) =>
    selectIsMovieFavorite(state, movie.id)
  );

  const addToFavorite = () => {
    dispatch(addFavoriteMovie(movie));
  };

  const removeFromFavorite = () => {
    dispatch(deleteFavoriteMovie(movie.id));
  };

  const switchFavorite = () => {
    if (isMovieFavorite) {
      removeFromFavorite();
    } else {
      addToFavorite();
    }
  };

  return (
    <div className={styles["card"]}>
      {cardVariants[cardType].showTopRight && (
        <div className={styles["top-right"]}>
          <button
            className={styles["add-favorite-button"]}
            onClick={switchFavorite}
          >
            <HeartIcon
              className={cn(styles.heartIcon, {
                [styles["movie-favorite"]]: isMovieFavorite,
              })}
            />
          </button>
        </div>
      )}
      <Link to={generatePath(Path.Details, { id: `${movie.id}` })}>
        <AdaptivImage
          src={getPosterImg(TmdbPath.w342Url, movie.poster_path, noPosterImg)}
          alt={`${movie.original_title}`}
        />
      </Link>
      {cardVariants[cardType].showDeleteBtn && (
        <button
          className={styles["delete-button"]}
          onClick={removeFromFavorite}
        >
          Remove From Favorite
        </button>
      )}
    </div>
  );
};
