import { Link } from "react-router-dom";

import { Path } from "../../navigation/routeNames";
import { PageContainer } from "../PageContainer/PageContainer";
import classes from "./Navbar.module.scss";
import { ReactComponent as HeartIcon } from "../../assets/heart.svg";
import { useAppSelector } from "../../hooks/redux";
import { selectFavoriteMovies } from "../../store/favoriteSlice/favoriteSlice";

export const Navbar = () => {
  const favoriteMovies = useAppSelector(selectFavoriteMovies);

  return (
    <header className={classes.header}>
      <PageContainer>
        <div className={classes.content}>
          <Link to={Path.Home} className={classes.logo}>
            M
          </Link>
          <Link to={Path.Favorite} className={classes.favorite}>
            <HeartIcon className={classes["heart-icon"]} />
            <span className={classes["counter"]}>{favoriteMovies.length}</span>
          </Link>
        </div>
      </PageContainer>
    </header>
  );
};
