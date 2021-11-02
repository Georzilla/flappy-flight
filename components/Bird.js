import React from 'react';
import { View, ViewBase, ViewComponent } from 'react-native';


const Bird = ({birdBottom, birdLeft}) => {
    const birdWidth = 50
    const birdHeight = 50

    return (

    <View style= {{

            position: 'absolute',
            backgroundColor: 'indigo',
            width: birdWidth,
            height: birdHeight,
            borderRadius: 50,
            left: birdLeft - (birdWidth/2),
            bottom: birdBottom - (birdHeight/2),
        }} />
        )
    
}


export default Bird


