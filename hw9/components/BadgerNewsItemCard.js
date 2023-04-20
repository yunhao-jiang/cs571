import React from "react";
import {Image, Text, StyleSheet, Dimensions} from "react-native";
import BadgerCard from "./BadgerCard";

function BadgerNewsItemCard(props) {
    return <>
        <BadgerCard>
            <Image source={{uri: props.img}} style={styles.image}/>
            <Text style={styles.title}>{props.title}</Text>
        </BadgerCard>
    </>
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: screenHeight * 0.25,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        marginTop: 5,
        color: '#2a2a2a',
    }
})
export default BadgerNewsItemCard;
