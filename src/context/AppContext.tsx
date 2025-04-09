"use client";
import { ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext } from "react";

import type { UserResource } from "@clerk/types";

export const AppContext = createContext<{
  user: UserResource | null | undefined;
}>({
  user: null,
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  return (
    <AppContext.Provider
      value={{
        user, // Pass user to the context
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
