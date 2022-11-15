import { Outlet } from "react-router-dom";

import { Navbar } from "../Navbar/Navbar";
import styles from "./MainLayout.module.scss";

export const MainLayout = () => (
  <div className={styles.wrapper}>
    <Navbar />
    <main className={styles.main}>
      <Outlet />
    </main>
  </div>
);
