import React, {useState, useEffect} from 'react';
import { ImageBackground, StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native';
import Bird from './components/Bird';
import Obstacles from './components/Obstacles';
import RNRestart from 'react-native-restart';


export default function App() {
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState(screenHeight/2)
  
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 + 50)
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0)
  const [score, setScore] = useState(0)
  
  const obstacleWidth = 62
  const obstacleHeight = 360
  const gap = 170


  const gravity = 3
  let gameTimerId
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo
 
  const [isGameOver, setIsGameOver] = useState(false)

  const bgSea = { uri: "https://i.imgur.com/VJvWyuH.jpg" };

/// start falling

useEffect(() => {
  if (birdBottom > 0){
    gameTimerId = setInterval(() => {
      setBirdBottom(birdBottom => birdBottom - gravity)
    }, 30)

    return () => {
      clearInterval(gameTimerId)
    }

  } 
}, [birdBottom])


// jump
const jump = () => {
  if(!isGameOver && (birdBottom < screenHeight))  
  {
    setBirdBottom(birdBottom => birdBottom + 50)
    console.log('jumped')
  }
}



//start first obstacles 
useEffect(() => {
  if(obstaclesLeft > - obstacleWidth) {
    obstaclesLeftTimerId = setInterval(() => {
      setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
    }, 30)
    return () => {
      clearInterval(obstaclesLeftTimerId)
    }
  } else {
    setObstaclesLeft(screenWidth)
    setObstaclesNegHeight(- Math.random() *100)
    setScore(score => score + 1)
  }

}, [obstaclesLeft])   


//start second obstacles
useEffect(() => {
  if(obstaclesLeftTwo > - obstacleWidth) {
    obstaclesLeftTimerIdTwo = setInterval(() => {
      setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
    }, 30)
    return () => {
      clearInterval(obstaclesLeftTimerIdTwo)
    }
  } else {
    setObstaclesLeftTwo(screenWidth)
    setObstaclesNegHeightTwo(- Math.random() *100)
    setScore(score => score + 1)
  }

}, [obstaclesLeftTwo])

//check for collisions

useEffect (() => {
  if (
  ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30)  || 
  birdBottom > (obstaclesNegHeight + obstacleHeight + gap - 30))  && 
  
  (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30)
  )
  ||  
  ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30)  || 
  birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap - 30))  && 
  (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30)
  ) )
    {
      console.log('game over')
      gameOver()
      
    }
})

const gameOver = () => {
  clearInterval(gameTimerId)
  clearInterval(obstaclesLeftTimerId)
  clearInterval(obstaclesLeftTimerIdTwo)
  setIsGameOver(true)
}

const newGame = () => {
  RNRestart.Restart()
}


  return (


<TouchableWithoutFeedback onPress={jump} >
    <View style={styles.container}>
      {isGameOver && Alert.alert(`GAME OVER 	  |    Your Score is  ${score}`, "New game?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => newGame() }
      ] && <Text> Your Score is {score}</Text>
      )
      }

<ImageBackground source={bgSea} resizeMode="cover" style={styles.image}> 
     <Bird
        birdBottom={birdBottom}
        birdLeft={birdLeft}
     
     />

    <Obstacles
      color = {'#2E8B57'}
      obstaclesLeft = {obstaclesLeft}
      obstacleWidth = {obstacleWidth}
      obstacleHeight = {obstacleHeight}
      randomBottom = {obstaclesNegHeight}
      gap = {gap}
    />

    <Obstacles
      color = {'#228B22'}
      obstaclesLeft = {obstaclesLeftTwo}
      obstacleWidth = {obstacleWidth}
      obstacleHeight = {obstacleHeight}
      randomBottom = {obstaclesNegHeightTwo}
      gap = {gap}
    />
</ImageBackground>
    </View>
  </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: '100%'
  },
});
