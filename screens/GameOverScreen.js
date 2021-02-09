import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BodyText from '../components/BodyText';

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
  return (
    <View style={styles.screen}>
      <BodyText>The Game is over</BodyText>
      <BodyText>Number of rounds: {roundsNumber}</BodyText>
      <BodyText>Number was: {userNumber}</BodyText>
      <Button title="NEW GAME" onPress={onRestart} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default GameOverScreen;
