import React from 'react';
import {View, StyleSheet, Text, TextInput, Button} from 'react-native';

/*===============================================
=
=
=============================================== */
const StartGameScreen = props => {
   return (
      <View style={styles.screen}>
         <Text style={styles.title}>Start a New Game!</Text>
         <View style={styles.inputContainer}>
            <Text>Select a Number</Text>
            <TextInput />
            <View style={styles.buttonContainer}>
               <Button title="Reset" onPress={() => {}}/>
               <Button title="Confirm" onPress={() => {}}/>
            </View>
         </View>
      </View>
     );
};

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      padding: 10,
      alignItems: 'center'
   },
   title:{
      fontSize: 20,
      marginVertical: 10
   },
   inputContainer:{
      width: 300,
      maxWidth: '80%',
      alignItems: 'center',
      // Shadow props iOS only
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 6,
      shadowOpacity: 0.3,
      // Elevation props Android only
      elevation: 8,
      backgroundColor: 'snow',
      padding: 20,
      borderRadius: 15
   },
   buttonContainer:{
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      paddingHorizontal: 15
   }
});

export default StartGameScreen;