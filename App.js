import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import AdminDashboard from './screens/AdminDashboard';
import AddCourseScreen from './screens/AddCourseScreen';
import AssignCourseScreen from './screens/AssignCourseScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Auth Stack for Login/Signup
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

// Drawer stack (after login)
function AdminDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={AdminDashboard} />
      <Drawer.Screen name="Add Courses" component={AddCourseScreen} />
      <Drawer.Screen name="AssignCourses" component={AssignCourseScreen} />

      {/* You can add more items here */}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
