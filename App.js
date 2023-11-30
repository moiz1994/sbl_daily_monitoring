import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
import { Colors } from './constants/Colors';

import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext, useEffect, useState } from 'react';
import LoadingOverlay from './components/LoadingOverlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButton from './components/IconButton';
import { StyleSheet, View } from 'react-native';


const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.gray600 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.gray700 },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authContext = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.gray600 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.gray700 },        
      }}
    >
      <Stack.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ 
          title: 'SBL Daily Monitoring',
          headerRight: ({tintColor}) => (
            <View style={styles.menu}>            
              <IconButton
                icon='refresh'
                color={tintColor}
                size={24}
                onPress={authContext.logout} 
              />
              <IconButton
                icon='power'
                color={tintColor}
                size={24}
                onPress={authContext.logout} 
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation(){
  const authContext = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authContext.isAuthenticated && <AuthStack />}
      {authContext.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root(){
  const [isLoading, setIsLoading] = useState(true);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken(){
        const storedToken = await AsyncStorage.getItem('token')
        if(storedToken){
          authContext.authenticate(storedToken)
        }
        setIsLoading(false);
    }

      fetchToken();
  }, [])

  if(isLoading){
    return <LoadingOverlay />;
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
      
    </>
  );
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row'
  }
});