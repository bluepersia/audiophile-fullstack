import { createContext } from "react";
import type { User } from "./AuthContext.types";

type AuthContextType = {
  user: User;
};

const AuthContext = createContext<AuthContextType | null>(null);

export { AuthContext };
