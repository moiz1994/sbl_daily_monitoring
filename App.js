import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
import { Colors } from './constants/Colors';

import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './components/UI/Loader';
import WorkingDateScreen from './screens/WorkingDateScreen';
import SaleDifferenceScreen from './screens/SaleDifferenceScreen';
import DistributorScreen from './screens/DistributorScreen';
import DistributorDetailScreen from './screens/DistributorDetailScreen';
import SaleDateScreen from './screens/SaleDateScreen';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.gray700 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.gray700 },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

const AuthenticatedStack = () => {
  const authContext = useContext(AuthContext);
  return (
    <Stack.Navigator
      initialRouteName='Dashboard'
      screenOptions={{
        headerStyle: { backgroundColor: Colors.gray700 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.gray700 },        
      }}
    >
      <Stack.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ 
          title: 'SBL Daily Monitoring',
        }}
      />

      <Stack.Screen
        name='WorkingDate'
        component={WorkingDateScreen}
        options={{ 
          title: 'Working Dates Report'
        }}
      />

      <Stack.Screen
        name='SaleDifference'
        component={SaleDifferenceScreen}
        options={{ 
          title: 'Sale Difference Report'
        }}
      />

      <Stack.Screen
        name='DistStatus'
        component={DistributorScreen}
        options={{ 
          title: 'Distributor Active Status'
        }}
      />

      <Stack.Screen
        name='DistDetail'
        component={DistributorDetailScreen}
        options={{ 
          title: 'Distributor Details'
        }}
      />

      <Stack.Screen
        name='SaleDate'
        component={SaleDateScreen}
        options={{ 
          title: 'Sale Date'
        }}
      />
    </Stack.Navigator>
  );
}

const Navigation = () => {
  const authContext = useContext(AuthContext);  
  return (
    <NavigationContainer>
      {!authContext.isAuthenticated && <AuthStack />}
      {authContext.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

const Root = () => {
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
    return <Loader message="Loading..."/>;
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

