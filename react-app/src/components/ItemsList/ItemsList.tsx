import { ReactNode, useState } from "react";
import cn from "classnames";

import classes from "./ItemsList.module.scss";
import { useOnScreen } from "../../hooks/useOnScreen";

interface ItemsListProps<T> {
  data: T[];
  renderItem: (item: T, index?: number) => ReactNode;
  keyExtractor: (item: T) => number;
  ListFooterComponent?: ReactNode;
  ListEmptyComponent?: ReactNode;
  onEndReached?: () => any;
  onEndReachedOptions?: IntersectionObserverInit;
  classNameContainer?: string;
  classNameItem?: string;
  horizontal?: boolean;
}

export const ItemsList = <T,>({
  data,
  renderItem,
  keyExtractor,
  onEndReached,
  onEndReachedOptions,
  ListFooterComponent,
  ListEmptyComponent,
  classNameContainer,
  classNameItem,
  horizontal,
}: ItemsListProps<T>) => {
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  const lastElementRef = (node: HTMLDivElement) => {
    setNode(node);
  };

  useOnScreen(node, onEndReached, onEndReachedOptions);

  return (
    <div className={classes.wrapper}>
      {data.length > 0 ? (
        <div className={classes.container}>
          <div
            className={cn({
              [classes.list]: !horizontal,
              [classes.horizontal]: horizontal,
              classNameContainer,
            })}
          >
            {data?.map((item, index) => {
              if (data.length === index + 1) {
                return (
                  <div
                    key={keyExtractor(item)}
                    ref={lastElementRef}
                    className={classNameItem}
                  >
                    {renderItem(item, index)}
                  </div>
                );
              } else {
                return (
                  <div key={keyExtractor(item)} className={classNameItem}>
                    {renderItem(item, index)}
                  </div>
                );
              }
            })}
          </div>
          {ListFooterComponent}
        </div>
      ) : (
        ListEmptyComponent
      )}
    </div>
  );
};
