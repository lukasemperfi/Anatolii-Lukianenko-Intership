import { Route, Routes } from "react-router-dom";

import { MainLayout } from "../components/MainLayout/MainLayout";
import { Details } from "../pages/Details/Details";
import { FavoritePage } from "../pages/FavoritePage/FavoritePage";
import { HomePage } from "../pages/HomePage/HomePage";
import { Path } from "./routeNames";

export const AppRouter = () => (
  <>
    <Routes>
      <Route path={Path.Home} element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={Path.Favorite} element={<FavoritePage />} />
        <Route path={Path.Details} element={<Details />} />
      </Route>
    </Routes>
  </>
);
