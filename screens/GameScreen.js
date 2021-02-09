import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max-min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

const GameScreen = ({ userChoice, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, userChoice));
  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver ]);

  const nextGuessHandler = (direction) => {
    if ((direction === 'lower' && currentGuess < userChoice ) || 
    (direction === 'greater' && currentGuess > userChoice )) {
      Alert.alert('Don\'t lie!', 'You know that this is wrong...', [{text: 'Sorry!', style: 'cancel'}]);;
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNum);
    setRounds((curRounds) => curRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <BodyText>Opponent's guess</BodyText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonsContainer}>
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
});

export default GameScreen;