import type { JSX } from "react/jsx-runtime";
import "./App.scss";
import { BrowserRouter, Routes } from "react-router";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
