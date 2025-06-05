import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import * as React from "react";

export const AuthContext = React.createContext({
  signIn: (user: FirebaseAuthTypes.User) => {},
  signOut: () => {},
});
export const SignInContext = React.createContext(false);

export const useIsSignedIn = () => {
  const isSignedIn = React.useContext(SignInContext);
  console.log("isSignedIn", isSignedIn);
  return isSignedIn;
};

export const useIsSignedOut = () => {
  return !useIsSignedIn();
};
