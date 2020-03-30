import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import Colors from '../constants/colors';

/*===============================================
= Header.js will set up the design and structure of
= the header component
=============================================== */
const Header = props => {
   return (
      <View style={{
         ...styles.headerBase,
         ...Platform.select({
            ios: styles.headerIOS,
            android: styles.headerAndroid
         })
      }}>
         <Text style={styles.headerTitle}>{props.title}</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   headerBase: {
      width: '100%',
      height: 90,
      paddingTop: 40,
      alignItems: 'center',
      justifyContent: 'center'

   },
   headerIOS: {
      backgroundColor: 'white'
   },
   headerAndroid: {
      backgroundColor: Colors.primary
   },
   headerTitle: {
      color: 'black',
      fontSize: 18,
      fontFamily: 'open-sans-bold'
   }
});

export default Header;
