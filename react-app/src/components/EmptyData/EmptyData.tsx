import { FC } from "react";
import cn from "classnames";

import classes from "./EmptyData.module.scss";

interface EmptyDataProps {
  title: string;
  className?: string;
}

export const EmptyData: FC<EmptyDataProps> = ({ title, className }) => (
  <div className={cn(classes.empty, className)}>{title}</div>
);
