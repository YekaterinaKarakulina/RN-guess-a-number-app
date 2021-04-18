import React from 'react';
import { View, ScrollView, Button, Text, Image, StyleSheet, Dimensions } from 'react-native';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
  return (
    <ScrollView>
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
        <MainButton onPress={onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7, // 300
    height: Dimensions.get('window').width * 0.7, // 300
    borderRadius:  Dimensions.get('window').width * 0.7 / 2, // 150
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical:  Dimensions.get('window').height / 40
  },
  image: {
    width: '100%',
    height: '100%'
  },
  resultContainer: {
    width: '80%',
    marginVertical: Dimensions.get('window').height / 60
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').width < 350 ? 16 : 20
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  }
});

export default GameOverScreen;
