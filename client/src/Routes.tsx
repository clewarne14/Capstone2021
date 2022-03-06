import React, { FC } from "react";
import { Route, Routes as DOMRoutes } from "react-router-dom";
import ComputerIcon from "@mui/icons-material/Computer";
import ListIcon from "@mui/icons-material/List";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ChooseProblemType from "./sections/ChooseProblemType/ChooseProblemType";

/**
 * This file contains all of the routes for our single page application.
 */

// Navbar routes
export const routes = [
  { text: "Lists", url: "/lists", icon: <ListIcon /> },
  { text: "Code", url: "/code", icon: <ComputerIcon /> },
  { text: "Create", url: "/create-problem/type", icon: <AddToPhotosIcon /> },
];

const Routes: FC = () => (
  <DOMRoutes>
    <Route path="create-problem/type" element={<ChooseProblemType />} />
  </DOMRoutes>
);

export default Routes;
