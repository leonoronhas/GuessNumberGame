import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Alert, ScrollView } from 'react-native';
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

// List Item design
const renderListItem = (value, numOfRounds) => (
   <View key={value} style={styles.listItem}>
      <BodyText># {numOfRounds} </BodyText>
      <BodyText>{value}</BodyText>
   </View>
);

/*===============================================
= Where the actual game happens. It consists of
= updating the guess based on hints given by the
= end user. 
=============================================== */
const GameScreen = props => {
   const initialGuess = generateRandomBetween(1, 100, props.userChoice);
   const [currentGuess, setCurrentGuess] = useState(initialGuess);
   const [pastGuesses, setPastGuesses] = useState([initialGuess]);

   const currentLow = useRef(1);    // Remains the same after re-renders
   const currentHigh = useRef(100); // Remains the same after re-renders

   const { userChoice, onGameOver } = props; // array destructuring

   useEffect(() => {
      if (currentGuess === props.userChoice) {
         props.onGameOver(pastGuesses.length);
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
         currentLow.current = currentGuess + 1;
      }
      const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
      setCurrentGuess(nextNumber);
      // setRounds(curRounds => curRounds + 1);
      setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
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
               <Ionicons name="md-remove" size={24} color="black" />
            </MainButton>
            <MainButton
               onPress={nextGuessHandler.bind(this, 'greater')}>
               <Ionicons name="md-add" size={24} color="black" />
            </MainButton>
         </Card>
         <View style={styles.listContainer}>
            <ScrollView contentContainerStyle={styles.list}>
               {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
            </ScrollView>
         </View>
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
   },
   listItem: {
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 10,
      padding: 15,
      marginVertical: 10,
      backgroundColor: 'orange',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '40%'
   },
   listContainer: {
      flex: 1,
      width: '80%',
   },
   list: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'flex-end'
   }
});

export default GameScreen;