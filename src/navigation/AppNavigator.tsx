import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { User } from '../types/index';

type RootStackParamList = {
  Home: undefined;
  UserDetail: { user: User };
  Auth: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const isAuthenticated = true;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{
                headerTitle: 'Übersicht',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen 
              name="UserDetail" 
              component={UserDetailScreen}
              options={({ route }) => ({
                headerTitle: route.params.user.name,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              })}
            />
          </>
        ) : (
          <Stack.Screen 
            name="Auth" 
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 