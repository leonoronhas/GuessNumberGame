import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';

const generateRandomBetween = (min, max, exclude) => {
   min = Math.ceil(min);
   max = Math.floor(max);
   const rndNumb = Math.floor(Math.random() * (max - min)) + min;

   if (rndNumb === exclude) {
      return generateRandomBetween(min, max, exclude);
   }
   else {
      return rndNumb;
   }
};

/*===============================================
=
=
=============================================== */
const GameScreen = props => {
   const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));

   const [rounds, setRounds] = useState(0);

   const currentLow = useRef(1);    // Remains the same after re-renders
   const currentHigh = useRef(100); // Remains the same after re-renders

   const { userChoice, onGameOver } = props; // array destructuring

   useEffect(() => {
      if (currentGuess === props.userChoice) {
         props.onGameOver(rounds);
      }
   }, [currentGuess, userChoice, onGameOver]); // Only if the objects changes that it will re-render

   const nextGuessHandler = direction => {
      if (direction === 'lower' && currentGuess < props.userChoice || direction === 'greater' && currentGuess > props.userChoice) {
         Alert.alert('Don\'t lie!', 'We both know that this is wrong...',
            [{ text: 'Sorry!', style: 'cancel' }]
         );
         return;
      }
      if (direction === 'lower') {
         currentHigh.current = currentGuess;
      }
      else {
         currentLow.current = currentGuess;
      }
      const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
      setCurrentGuess(nextNumber);
      setRounds(curRounds => curRounds + 1);
   };

   return (
      <View style={styles.screen}>
         <Card style={styles.oppContainer}>
            <BodyText>Opponent's Guess</BodyText>
            <NumberContainer>{currentGuess}</NumberContainer>
         </Card>
         <Card style={styles.buttonContainer}>
            <MainButton
               onPress={nextGuessHandler.bind(this, 'lower')}>
               <Ionicons name="md-remove" size={24} color="black"/>
            </MainButton>
            <MainButton
               onPress={nextGuessHandler.bind(this, 'greater')}>
               <Ionicons name="md-add" size={24} color="black"/>
            </MainButton>
         </Card>
      </View>
   );
};

const styles = StyleSheet.create({
   screen: {
      flex: 1, // So it takes all available screen
      padding: 10,
      alignItems: 'center'
   },
   oppContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
   },
   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
      width: 400,
      maxWidth: '90%'
   }
});

export default GameScreen;