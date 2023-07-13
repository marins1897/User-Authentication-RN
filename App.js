import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import UserContextProvider, { UserContext } from './store/user-context';
import { useContext, useEffect, useState } from 'react';
import IconButton from './components/UI/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
// deprecated
import AppLoading from 'expo-app-loading';
// use expo-splash-screen

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(UserContext);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({ tintColor }) => <IconButton icon="exit" 
                                                    size={24} 
                                                    color={tintColor} 
                                                    onPress={authCtx.logout} />
      }} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(UserContext);

  return (
      <NavigationContainer>
        {!authCtx.isLoggedIn ? <AuthStack /> : <AuthenticatedStack />}
      </NavigationContainer>
  );
}

function Root() {
  const authCtx = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchToken = async () => {
        const storedToken = await AsyncStorage.getItem('token');

        if (storedToken) {
            authCtx.login(storedToken);
        }

        setIsLoading(false);
    }

    fetchToken();
  },[]);

  if (isLoading) {
    return <AppLoading />
  }

  return <Navigation />;
}

export default function App() {

  return (
    <>
      <StatusBar style="light" />
      <UserContextProvider>

      <Root />

      </UserContextProvider>
    </>
  );
}