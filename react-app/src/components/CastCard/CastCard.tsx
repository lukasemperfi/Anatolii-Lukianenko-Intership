import { FC } from "react";

import { getPosterImg } from "../../api/services/helpers/tmdb";
import { AdaptivImage } from "../AdaptivImage/AdaptivImage";
import noPosterImg from "../../assets/no-poster.png";
import { TmdbPath } from "../../api/services/tmbd";
import styles from "./CastCard.module.scss";
import { Cast } from "../../store/creditsSlice/models/Cast";

interface CastCardProps {
  cast: Cast;
}

export const CastCard: FC<CastCardProps> = ({ cast }) => (
  <div className={styles["cast"]}>
    <AdaptivImage
      src={getPosterImg(TmdbPath.w500Image, cast.profile_path, noPosterImg)}
      alt={`${cast.name}`}
    />
    <p className={styles["cast__name"]}>{cast.name}</p>
  </div>
);
