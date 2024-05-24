import { RouteObject } from "react-router";
import Desktop from "./Desktop/Desktop";
import Layout from "./Layout";
import { ERoutes } from "./ERoutes";

export const routes: RouteObject[] = [
  {
    path: ERoutes.HOME,
    element: <Layout />,
    children: [{ path: ERoutes.HOME, element: <Desktop /> }],
  },
];
