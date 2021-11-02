import React from 'react';
import { View} from 'react-native';

const Obstacles = ({color, obstaclesLeft, obstacleHeight, obstacleWidth, gap }) => {
    

    return(
        <>
            <View style={{
                position: color,
                backgroundColor: 'red',
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: 0 + obstacleHeight + gap,
            }}/>


            <View style={{
                position: 'absolute',
                backgroundColor: 'blue',
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: 0,
            }}/>

        </>
    )
}

export default Obstacles