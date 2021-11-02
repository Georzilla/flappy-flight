import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Bird from './components/Bird';
import Obstacles from './components/obstacles';


export default function App() {
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState(screenHeight/2)
  
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 + 50)
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0)
  
  const obstacleWidth = 60
  const obstacleHeight = 360
  const gap = 170


  const gravity = 3
  let gameTimerId
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo

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
console.log(birdBottom)

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
  }

}, [obstaclesLeftTwo])



  return (
    <View style={styles.container}>
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

    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
