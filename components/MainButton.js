import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

/*===============================================
= Main button design
=============================================== */
const MainButton = props => {
   return (
      <TouchableOpacity onPress={props.onPress}>
         <View style={styles.button}>
            <Text style={styles.buttonText}>{props.children}</Text>
         </View>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   button: {
      backgroundColor: Colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 30,
      //borderRadius: 20,
      // Shadow props iOS only
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      shadowOpacity: 0.3,
      // Elevation props Android only
      elevation: 8,
      backgroundColor: Colors.primary,
      padding: 20,
      borderRadius: 15 
   },
   buttonText: {
      color: 'white',
      fontFamily: 'open-sans',
      fontSize: 18
   }
});

export default MainButton;