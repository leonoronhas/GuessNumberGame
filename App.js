import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Font from 'expo-font'; // Built in with expo to help manage custom fonts
import { AppLoading } from 'expo'; // This will prolong the splash screen until required apis (fonts) are still being loaded

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

// Helper function to make customs fonts available
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0); // starts at zero
  const [dataLoaded, setDataLoaded] = useState(false); // 

  // Make sure apis (Fonts) are loaded before starting the game
  if (!dataLoaded) {
    return (
      <AppLoading // Only works with functions
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    ); 
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  }
  else if (guessRounds > 0) {
    content = <GameOverScreen
      roundsNumber={guessRounds}
      userNumber={userNumber}
      onRestart={configureNewGameHandler}
    />;
  }

  return (
    <View style={styles.screen}>
      <Header title="GUESS A NUMBER" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    fontWeight: '200',
    backgroundColor: '#fffde7'
  }
});
