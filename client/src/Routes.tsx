import React, { FC } from "react";
import { Route, Routes as DOMRoutes } from "react-router-dom";
import ComputerIcon from "@mui/icons-material/Computer";
import ListIcon from "@mui/icons-material/List";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ChooseProblemType from "./sections/ChooseProblemType/ChooseProblemType";
import MultipleChoiceCreation from "./sections/MultipleChoiceCreation/MultipleChoiceCreation";
import AlgorithmicCreation from "./sections/AlgorithmicCreation/AlgorithmicCreation";
import UserProfile from "./sections/UserProfile/UserProfile";
import Lobby from "./sections/Lobby/Lobby";
import ProblemBox from "./ProblemBox/ProblemBox";

export type PostRequestResponse = {
  success: boolean;
  message: string;
};

export type MultipleChoiceProblemGetResponse = {
  title: string;
  dateCreated: string;
  answer: string;
  creatorName: string;
  likes: number;
  problemType: "multiple choice" | "algorithmic";
  tags: Array<string>;
  choices: Array<string>;
  problemDescription: string;
  problemId: number;
};

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
    <Route
      path="create-problem/multiple-choice"
      element={<MultipleChoiceCreation />}
    />
    <Route
      path="create-problem/algorithmic"
      element={<AlgorithmicCreation />}
    />
    <Route path="profile/:username" element={<UserProfile />} />
    <Route path="/code" element={<Lobby />} />
  </DOMRoutes>
);

export default Routes;

//  <ProblemBox
//    startcode={"Public static void main()"}
//    problemtext={"Print out the first 5 fibonacci numbers"}
//  />;
