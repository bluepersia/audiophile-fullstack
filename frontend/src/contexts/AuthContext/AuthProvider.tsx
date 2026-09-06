import type { PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <AuthContext.Provider value={{ user: null }}>
      {children}
    </AuthContext.Provider>
  );
}
