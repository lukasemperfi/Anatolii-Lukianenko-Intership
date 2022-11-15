import { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getCast, selectCast } from "../../store/creditsSlice/creditsSlice";
import { Cast } from "../../store/creditsSlice/models/Cast";
import { CastCard } from "../CastCard/CastCard";
import { ItemsList } from "../ItemsList/ItemsList";
import styles from "./CastList.module.scss";

interface CastListProps {
  id: number;
}

export const CastList: FC<CastListProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const cast = useAppSelector(selectCast).slice(0, 5);

  const fetchCast = (id: number) => {
    dispatch(getCast(id));
  };

  useEffect(() => {
    fetchCast(id);
  }, [id]);

  const renderItem = (cast: Cast) => <CastCard cast={cast} />;

  return (
    <ItemsList
      data={cast}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      classNameItem={styles["cast-list__item"]}
      horizontal
    />
  );
};
