import { ComponentPropsWithoutRef, FC } from "react";
import cn from "classnames";

import styles from "./PageContainer.module.scss";

export const PageContainer: FC<ComponentPropsWithoutRef<"div">> = ({
  children,
  className,
}) => <div className={cn(styles.container, className)}>{children}</div>;
