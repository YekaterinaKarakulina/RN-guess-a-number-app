import React from 'react';
import { View, Button, Text, Image, StyleSheet } from 'react-native';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is over</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          // fadeDuration={1000} // default = 300
          // source={{uri: 'https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf-970-80.jpg.webp'}}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
     <View style={styles.resultContainer}>
      <BodyText style={styles.resultText}>
          Your phone needed {' '}
          <Text style={styles.highlight}>{roundsNumber}</Text>
          {' '} rounds to guess the number {' '}
          <Text style={styles.highlight}>{userNumber}.</Text>
        </BodyText>
     </View>
      <Button title="NEW GAME" onPress={onRestart} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30
  },
  image: {
    width: '100%',
    height: '100%'
  },
  resultContainer: {
    width: '80%',
    marginVertical: 15
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  }
});

export default GameOverScreen;
