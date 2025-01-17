import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { User } from '../types/index';
import AddUserScreen from '../screens/AddUserScreen';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme/colors';

type RootStackParamList = {
  Home: undefined;
  UserDetail: { user: User };
  Auth: undefined;
  AddUser: undefined;
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
              options={({ navigation }) => ({
                headerTitle: 'Meine Überwachten',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerRight: () => (
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('AddUser')}
                    style={styles.headerButton}
                  >
                    <MaterialIcons 
                      name="person-add" 
                      size={24} 
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                ),
              })}
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
            <Stack.Screen 
              name="AddUser" 
              component={AddUserScreen}
              options={{
                headerTitle: 'Neuer Nutzer',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
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

const styles = StyleSheet.create({
  headerButton: {
    padding: 8,
    marginRight: 8,
  },
});

export default AppNavigator; 