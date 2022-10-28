import React from 'react';
import {Image , View, StyleSheet} from 'react-native';


const Bird = ({birdBottom, birdLeft}) => {
    const birdWidth = 50
    const birdHeight = 50

    return (

    <View style= {{

            position: 'absolute',
            width: birdWidth,
            height: birdHeight,
            borderRadius: 80,
            left: birdLeft - (birdWidth/2),
            bottom: birdBottom - (birdHeight/2),
        }} >
           <Image
        style={styles.fish}
        source={{
          uri: 'https://i.imgur.com/bapBqsu.png',
        }}
      /> 
        </View>

        
        )
    
}
const styles = StyleSheet.create({
    
    fish: {
      flex: 1,
      justifyContent: "center",
      width: '100%'
    },
  });

export default Bird


