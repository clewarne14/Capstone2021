import React, { FC } from "react";
import { Route, Routes as DOMRoutes } from "react-router-dom";
import ChooseProblemType from "./sections/ChooseProblemType/ChooseProblemType";

/**
 * This file contains all of the routes for our single page application.
 */

const Routes: FC = () => (
  <DOMRoutes>
    <Route path="create-problem/type" element={<ChooseProblemType />} />
  </DOMRoutes>
);

export default Routes;
