import React from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Editor from "./components/Editor/Editor";
import "./App.scss";

function App() {
  return (
    <>
      <Navbar />
      <Editor />
      <Footer />
    </>
  );
}

export default App;
