import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

/*===============================================
= Home page of the app and design
= Where the user will be able to input, reset and
= confirm the guess number.
=============================================== */
const StartGameScreen = props => {

   const [enteredValue, setEnteredValue] = useState(''); // Input (String)
   const [confirmed, setConfirmed] = useState(false);    // Confirm input 
   const [selectedNumber, setSelectedNumber] = useState(''); // Input to be saved (Number)

   // Function to replace when the input is not a number from 0-9 for ANDROID
   const numberInputHandler = inputText => {
      setEnteredValue(inputText.replace(/[^0-9]/g, '')); // Numbers only 'g' globally (entire text)
   };

   // Function to reset the input field
   const resetInputHandler = () => {
      setEnteredValue('');
      setConfirmed(false);
   };
   // Function to confirm start of game and user input
   const confirmInputHandler = () => {
      const chosenNumber = parseInt(enteredValue);
      // Validate user input
      if (chosenNumber <= 0 || chosenNumber > 99) {
         Alert.alert(
            'Invalid Number',
            'Number must be between 1 - 99',
            [{ text: 'Okay', style: 'default', onPress: resetInputHandler }]
         );
         return;
      }
      else if (isNaN(chosenNumber)) {
         Alert.alert(
            'Invalid Input',
            'You must enter a number from 1 - 99',
            [{ text: 'Okay', style: 'default', onPress: resetInputHandler }]
         );
         return;
      }
      // Initial state before game starts
      setConfirmed(true);
      setSelectedNumber(chosenNumber);
      setEnteredValue('');
      Keyboard.dismiss();
   }

   let confirmedOutput;

   if (confirmed) {
      confirmedOutput = (
         <Card style={styles.summaryContainer}>
            <BodyText>You selected</BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>
               START GAME
            </MainButton>
         </Card>
      );
   }

   return (
      <TouchableWithoutFeedback // So we can dismiss the keyboard when tapped in the screen (iOS fix)
         onPress={() => {
            Keyboard.dismiss();
         }}
      >
         <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
               <BodyText>Select a Number</BodyText>
               <Input style={styles.input}
                  blurOnSubmit autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType="number-pad" // iOS only - no decimals
                  maxLength={2}
                  onChangeText={numberInputHandler}
                  value={enteredValue}
               />
               <View style={styles.buttonContainer}>
                  <View style={styles.button}>
                     <Button
                        title="Reset"
                        onPress={resetInputHandler}
                        color={Colors.warning}
                     />
                  </View>
                  <View style={styles.button}>
                     <Button
                        title="Confirm"
                        onPress={confirmInputHandler}
                        color={Colors.accent}
                     />
                  </View>
               </View>
            </Card>
            {confirmedOutput}
         </View>
      </TouchableWithoutFeedback>
   );
};

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      padding: 10,
      alignItems: 'center'
   },
   title: {
      fontSize: 20,
      marginVertical: 10,
      fontFamily: 'open-sans-bold'
   },
   inputContainer: {
      width: 300,
      maxWidth: '80%',
      alignItems: 'center',
   },
   buttonContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      paddingHorizontal: 15
   },
   button: {
      width: 90
   },
   input: {
      width: 50,
      textAlign: "center"
   },
   summaryContainer: {
      marginTop: 20,
      alignItems: 'center'
   }
});

export default StartGameScreen;