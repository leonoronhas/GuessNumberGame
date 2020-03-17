import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

/*===============================================
= Input default style for all text inputs. It also
= accepts new custom styling
=============================================== */
const Input = props => {
   return <TextInput {...props} style={{ ...styles.input, ...props.style }} /> // Syntax so I can use de default style, add custom ones, and edit the default if I need
};

const styles = StyleSheet.create({
   input: {
      height: 30,
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
      marginVertical: 10
   }
});

export default Input;