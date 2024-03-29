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
import MultipleChoiceProblem from "./sections/MultipleChoiceProblem/MultipleChoiceProblem";
import AlgorithmicProblem from "./sections/AlgorithmicProblem/AlgorithmicProblem";
import ListsLobby from "./sections/ListsLobby/ListsLobby";
import ChooseListOption from "./sections/ChooseListOption/ChooseListOption";
import ListPage from "./sections/ListPage/ListPage";
import MyList from "./sections/MyList/MyList";

export type ProblemType = "multiple choice" | "algorithmic" | "all";

export type PostRequestResponse = {
  success: boolean;
  message: string;
};

export type CompressedProblem = {
  problemId: string;
  likes: number;
  title: string;
  problemType: ProblemType;
};

export type Problem = {
  title: string;
  dateCreated: string;
  creatorName: string;
  likes: number;
  problemType: ProblemType;
  tags: Array<string>;
  problemDescription: string;
  problemId: string;
  profilePicture: string;
};

export interface MultipleChoiceProblemType extends Problem {
  answer: string;
  choices: Array<string>;
}

export interface AlgorithmicProblemType extends Problem {
  testSuite: string;
  startingCode: string;
  language: string;
}

export type User = {
  email: string;
  username: string;
  profilePicture?: string;
  reputation: number;
  lists: string;
  problemsCreated: string;
  problemsSolved: string;
  bio?: string;
};

export type List = {
  problemsIds: Array<string>;
  dateCreated: string;
  listId: string;
  createdBy: string;
};

/**
 * This file contains all of the routes for our single page application.
 */

// Navbar routes
export const routes = [
  { text: "Code", url: "/code", icon: <ComputerIcon /> },
  { text: "Create", url: "/create-problem/type", icon: <AddToPhotosIcon /> },
];

const Routes: FC = () => (
  <DOMRoutes>
    <Route path="/create-problem/type" element={<ChooseProblemType />} />
    <Route
      path="/create-problem/multiple-choice"
      element={<MultipleChoiceCreation />}
    />
    <Route
      path="/create-problem/algorithmic"
      element={<AlgorithmicCreation />}
    />

    <Route path="/profile/:username" element={<UserProfile />} />
    <Route path="/code" element={<Lobby />} />
    <Route
      path="/code/algorithmic/:problemId"
      element={<AlgorithmicProblem />}
    />
    <Route
      path="/code/multiple-choice/:problemId"
      element={<MultipleChoiceProblem />}
    />
    <Route path="/lists" element={<ChooseListOption />} />
    <Route path="/lists/public" element={<ListsLobby />} />
    <Route path="/lists/:listId" element={<ListPage />} />
    <Route path="/lists/:username" element={<MyList />} />
  </DOMRoutes>
);

export default Routes;
