import type { JSX } from "react/jsx-runtime";
import "./App.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes } from "react-router";

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
