import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getPosterImg } from "../../api/services/helpers/tmdb";
import { AdaptivImage } from "../../components/AdaptivImage/AdaptivImage";
import { PageContainer } from "../../components/PageContainer/PageContainer";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./Details.module.scss";
import noPosterImg from "../../assets/no-poster.png";
import { TmdbPath } from "../../api/services/tmbd";
import { CastList } from "../../components/CastList/CastList";
import {
  getMoviesDetails,
  selectMovieDetails,
} from "../../store/movieDetailsSlice/movieDetailsSlice";

export const Details = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const movieDetails = useAppSelector(selectMovieDetails);

  const fetchMovieDeatails = (id: string) => {
    dispatch(getMoviesDetails(id));
  };

  useEffect(() => {
    if (id) {
      fetchMovieDeatails(id);
    }
  }, [id]);

  return (
    <PageContainer>
      {movieDetails && (
        <section className={styles["movie-content"]}>
          <div className={styles["movie-content__poster"]}>
            <AdaptivImage
              src={getPosterImg(
                TmdbPath.originalImage,
                movieDetails.poster_path,
                noPosterImg
              )}
              alt={`${movieDetails?.original_title}`}
            />
          </div>
          <div className={styles["movie-content__info"]}>
            <h1 className={styles["title"]}>{movieDetails.original_title}</h1>
            <div className={styles["genres"]}>
              {movieDetails.genres.slice(0, 5).map((genre, i) => (
                <span key={i} className={styles["genres__item"]}>
                  {genre.name}
                </span>
              ))}
            </div>
            <p>{movieDetails.overview}</p>
            <div className={styles["cast"]}>
              <h2 className={styles["cast__header"]}>Casts</h2>
              <CastList id={movieDetails.id} />
            </div>
          </div>
        </section>
      )}
    </PageContainer>
  );
};
