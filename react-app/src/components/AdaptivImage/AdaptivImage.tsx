import { ComponentPropsWithoutRef, FC, useState } from "react";
import cn from "classnames";

import styles from "./AdaptivImage.module.scss";

interface AdaptivImageProps extends ComponentPropsWithoutRef<"img"> {
  imgContainerClassname?: string;
}

export const AdaptivImage: FC<AdaptivImageProps> = ({
  imgContainerClassname,
  ...imgAtr
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleOnLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div
      className={cn(styles.imageContainer, {
        [styles.skeleton]: !isImageLoaded,
      })}
    >
      <img
        className={cn(styles.image, {
          [styles.loadedImage]: isImageLoaded,
        })}
        {...imgAtr}
        onLoad={handleOnLoad}
      />
    </div>
  );
};
