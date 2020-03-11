import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

/*===============================================
= Header.js will set up the design and structure of
= the header component
=============================================== */
const Header = props => {
   return (
      <View style={styles.header}>
         <Text style={styles.headerTitle}>{props.title}</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   header: {
      width: '100%',
      height: 90,
      paddingTop: 40,
      backgroundColor: 'orange',
      alignItems: 'center',
      justifyContent: 'center'

   },
   headerTitle: {
      color: 'black',
      fontSize: 18,
      fontWeight: '700'
   }
});

export default Header;
