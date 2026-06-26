import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import AuthScreen from '../screens/AuthScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import ModuleScreen from '../screens/ModuleScreen';
import LessonScreen from '../screens/LessonScreen';
import QuizScreen from '../screens/QuizScreen';
import LevelCompleteScreen from '../screens/LevelCompleteScreen';
import DailyChallengeScreen from '../screens/DailyChallengeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TutorScreen from '../screens/TutorScreen';
import WalletScreen from '../screens/WalletScreen';
import GamesScreen from '../screens/GamesScreen';
import ChessGame from '../screens/ChessGame';
import DraughtsGame from '../screens/DraughtsGame';
import TracksScreen from '../screens/TracksScreen';
import TrackDetailScreen from '../screens/TrackDetailScreen';
import { colors } from '../theme';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, isGuest, loading } = useAuth();
  const { isOnboarded, loaded: progressLoaded } = useProgress();

  if (loading || !progressLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const isAuthenticated = !!user || isGuest;
  let initialRoute = 'Auth';
  if (isAuthenticated && !isOnboarded) initialRoute = 'Onboarding';
  if (isAuthenticated && isOnboarded) initialRoute = 'Home';

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.background },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: { animation: 'spring', config: { stiffness: 1000, damping: 500, mass: 3, overshootClamping: true } },
            close: { animation: 'spring', config: { stiffness: 1000, damping: 500, mass: 3, overshootClamping: true } },
          },
        }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Module" component={ModuleScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="LevelComplete" component={LevelCompleteScreen} />
        <Stack.Screen name="DailyChallenge" component={DailyChallengeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Tutor" component={TutorScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Games" component={GamesScreen} />
        <Stack.Screen name="Chess" component={ChessGame} />
        <Stack.Screen name="Draughts" component={DraughtsGame} />
        <Stack.Screen name="Tracks" component={TracksScreen} />
        <Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
