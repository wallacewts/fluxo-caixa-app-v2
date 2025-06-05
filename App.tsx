import { firebase, FirebaseAuthTypes } from "@react-native-firebase/auth";
import * as React from "react";
import { SplashScreen } from "./src/screens/SplashScreen";
import {
  AuthContext,
  SignInContext,
  useIsSignedIn,
  useIsSignedOut,
} from "./src/hooks/useIsSignedIn";
import { HomeScreen } from "./src/screens/HomeScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import {
  createStaticNavigation,
  NavigationContext,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { InternaScreen } from "./src/screens/InternaScreen";

type AppState = {
  isLoading: boolean;
  isSignout: boolean;
  user: FirebaseAuthTypes.User;
};

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState: AppState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            user: action.user,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            user: action.user,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            user: null,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      user: null,
    }
  );
  const navigation = React.useContext(NavigationContext);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let user;

      try {
        user = firebase.auth().currentUser;
      } catch (e) {
        console.error(e);
      }

      dispatch({ type: "RESTORE_TOKEN", user });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (user: FirebaseAuthTypes.User) => {
        dispatch({ type: "SIGN_IN", user });
      },
      signOut: () => {
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (user: FirebaseAuthTypes.User) => {
        dispatch({ type: "SIGN_IN", user });
      },
    }),
    []
  );

  if (state.isLoading) {
    return <SplashScreen />;
  }

  const isSignedIn = state.user != null;

  return (
    <AuthContext.Provider value={authContext}>
      <SignInContext.Provider value={isSignedIn}>
        <Navigation />
      </SignInContext.Provider>
    </AuthContext.Provider>
  );
}

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      if: useIsSignedIn,
      screen: InternaScreen,
    },
    SignIn: {
      if: useIsSignedOut,
      screen: HomeScreen,
    },
    Login: {
      screen: LoginScreen,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);
