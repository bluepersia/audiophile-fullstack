import type { JSX } from "react/jsx-runtime";
import Header from "../Header/Header";
import { Outlet } from "react-router";

export default function AppLayout(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
