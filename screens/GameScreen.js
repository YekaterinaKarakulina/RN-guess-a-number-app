import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
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

// const  renderListItem = (value, numOfRound) => ( // for ScrollView
//   <View key={value} style={styles.listItem}>
//     <BodyText>#{numOfRound}</BodyText>
//     <BodyText>{value}</BodyText>
//   </View>
// );

const  renderListItem = (listLength, itemData) => ( // for FlatList
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
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
      currentLow.current = currentGuess + 1;
    }
    const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNum);
    setPastGuesses((curPastGuess) => [
      nextNum.toString(), ...curPastGuess
    ]);
  };

  let listContainerStyle = styles.listContainer;

  if (Dimensions.get('window').width < 350) {
    listContainerStyle = styles.listContainerBig
  }

  return (
    <View style={styles.screen}>
      <BodyText>Opponent's guess</BodyText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonsContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
        <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={listContainerStyle}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
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
    // marginTop: 20,
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%'
  },
  listContainer: {
    flex: 1,
    width: '60%'
  },
  listContainerBig: {
    flex: 1,
    width: '80%'
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    width: '100%'
  }
});

export default GameScreen;