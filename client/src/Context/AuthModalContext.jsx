import React, { createContext, useState } from "react";

export const AuthModalContext = createContext();

export default function AuthModalProvider({ children }) {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <AuthModalContext.Provider value={{isSignUpOpen, setIsSignUpOpen,isSignInOpen, setIsSignInOpen}}>
      {children}
   </AuthModalContext.Provider>
  )
}
