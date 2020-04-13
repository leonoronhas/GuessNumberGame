import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

/*===============================================
= Home page of the app and design
= Where the user will be able to input, reset and
= confirm the guess number before the game.
=============================================== */
const StartGameScreen = props => {

   const [enteredValue, setEnteredValue] = useState(''); // Input (String)
   const [confirmed, setConfirmed] = useState(false);    // Confirm input 
   const [selectedNumber, setSelectedNumber] = useState(''); // Input to be saved (Number)
   const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 3.9); // Dimensions only run once hence the need of useState to re-render




   // Function to replace when the input is not a number from 0-9 for ANDROID
   const numberInputHandler = inputText => {
      setEnteredValue(inputText.replace(/[^0-9]/g, '')); // Numbers only 'g' globally (entire text)
   };

   // Function to reset the input field
   const resetInputHandler = () => {
      setEnteredValue('');
      setConfirmed(false);
   };

   // Re-run every time the app re-renders
   useEffect(() => {
      // Function to set button dimension after a render
      const updateLayout = () => {
         setButtonWidth(Dimensions.get('window').width / 4);
      }
      // Dimension listener to change/update when new orientation
      Dimensions.addEventListener('change', updateLayout);

      // Return so it cleans up the new event listener after every re-run
      return () => {
         Dimensions.removeEventListener('change', updateLayout);
      }
   });

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
      <ScrollView>
         <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
            <TouchableWithoutFeedback // dismiss the keyboard when tapped in the screen (iOS fix)
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
                        <View style={{ width: buttonWidth }}>
                           <MainButton style={styles.buttonStyleWarning}
                              onPress={resetInputHandler}>
                              Reset
                     </MainButton>
                        </View>
                        <View style={{ width: buttonWidth }}>
                           <MainButton style={styles.buttonStyleConfirmation}
                              onPress={confirmInputHandler}>
                              Ready
                     </MainButton>
                        </View>
                     </View>
                  </Card>
                  {confirmedOutput}
               </View>
            </TouchableWithoutFeedback>
         </KeyboardAvoidingView>
      </ScrollView>
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
      width: '90%',
      maxWidth: '95%',
      minWidth: 300,
      alignItems: 'center',
   },
   buttonContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      paddingHorizontal: 15
   },
   // button: {
   //    width: Dimensions.get('window').width / 4,
   // },
   buttonStyleWarning: {
      backgroundColor: Colors.warning
   },
   buttonStyleConfirmation: {
      backgroundColor: Colors.accent,
      minWidth: 110
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