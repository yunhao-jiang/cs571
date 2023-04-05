import {Text, View, Image, StyleSheet} from "react-native";
import React from "react";


export default function BadgerBakedGood(props) {


    return <View style={styles.container}>
        <Image source={{uri: props.img}} style={{width: 150, height: 150}}/>
        <Text style={{fontSize: 30}}>{props.name}</Text>
        <Text> </Text>
        <Text
            style={styles.text}>${(props.price) === undefined ? 0 : (props.price).toFixed(2)}</Text>
        <Text style={styles.text}>You can order up to {props.upperBound} units!</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text: {
        fontSize: 17,
    }
})
