import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import StageMapScreen from './screens/StageMapScreen';
import StageDetailScreen from './screens/StageDetailScreen';
import ChatbotScreen from './screens/ChatbotScreen';
import AboutScreen from './screens/AboutScreen';
import ResourcesScreen from './screens/ResourcesScreen';
import ContactScreen from './screens/ContactScreen';
import MLPredictionScreen from './screens/MLPredictionScreen';
import FloatingChatbotButton from './components/FloatingChatbotButton';

const Stack = createNativeStackNavigator();

function AppContent() {
  const [currentRoute, setCurrentRoute] = useState('Login');

  return (
    <>
      <Stack.Navigator
        initialRouteName="Login"
        screenListeners={{
          state: (e) => {
            const state = e.data.state;
            const routeName = state.routes[state.index].name;
            setCurrentRoute(routeName);
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MLPrediction" component={MLPredictionScreen} options={{ title: 'AI Detection' }} />
        <Stack.Screen name="StageMap" component={StageMapScreen} options={{ title: 'Stage Checker' }} />
        <Stack.Screen name="StageDetail" component={StageDetailScreen} options={{ title: 'Stage Details' }} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} options={{ title: 'Assistant' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
        <Stack.Screen name="Resources" component={ResourcesScreen} options={{ title: 'Resources' }} />
        <Stack.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact' }} />
      </Stack.Navigator>
      {currentRoute !== 'Chatbot' && currentRoute !== 'Login' && <FloatingChatbotButton />}
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppContent />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
