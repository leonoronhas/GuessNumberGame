import React from 'react';
import { View, StyleSheet, Button, Image, Text } from 'react-native';
import BodyText from '../components/BodyText';
import Color from '../constants/colors'
import Card from '../components/Card';
import MainButton from '../components/MainButton';

/*===============================================
=
=
=============================================== */
const GameOverScreen = props => {
   return (
      <View style={styles.screen}>
         <BodyText style={styles.title}>The Game is Over!</BodyText>
         <Image
            source={require('../assets/success.png')}
            style={styles.image}
            resizeMode="contain"
         />
         <Card style={styles.resultsCard}>
            <BodyText style={styles.result}>Your phone took <Text style={styles.hightlight}>{props.roundsNumber}</Text> rounds to guess the number
         <Text style={styles.hightlight}> {props.userNumber}</Text>!
         </BodyText>
         </Card>
         <MainButton onPress={props.onRestart}>
            New Game
            </MainButton>
      </View>
   );
};

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   },
   image: {
      width: '80%',
      height: 300,
      borderRadius: 20
   },
   hightlight: {
      color: Color.warning,
      fontFamily: 'open-sans-bold'
   },
   title: {
      fontFamily: 'open-sans-bold',
      fontSize: 25
   },
   result: {
      fontSize: 20,
      textAlign: 'center',
      marginVertical: 30,
   },
   resultsCard: {
      width: '80%',
      marginVertical: 20
   }
});

export default GameOverScreen;