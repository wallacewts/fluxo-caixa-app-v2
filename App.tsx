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
import { AddDespesaScreen } from "./src/screens/AddDespesaScreen";
import { AddReceitaScreen } from "./src/screens/AddReceitaScreen";
import { CadastroScreen } from "./src/screens/CadastroScreen";

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

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let user;

      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 2000);
        });
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
  groups: {
    LoggedIn: {
      if: useIsSignedIn,
      screens: {
        Home: {
          screen: InternaScreen,
          options: {
            headerShown: false,
          },
        },
        AddDespesa: {
          screen: AddDespesaScreen,
          options: {
            title: "Adicionar Despesa",
          },
        },
        AddReceita: {
          screen: AddReceitaScreen,
          options: {
            title: "Adicionar Receita",
          },
        },
      },
    },
    LoggedOut: {
      if: useIsSignedOut,
      screens: {
        SignIn: {
          screen: HomeScreen,
          options: {
            headerShown: false,
          },
        },
        Cadastro: {
          screen: CadastroScreen,
          options: {
            title: "Cadastro",
          },
        },
        Login: {
          screen: LoginScreen,
          options: {},
        },
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);
