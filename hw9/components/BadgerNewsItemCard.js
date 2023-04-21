import React from "react";
import {Image, Text, StyleSheet, Dimensions} from "react-native";
import BadgerCard from "./BadgerCard";
import {useNavigation} from "@react-navigation/native";

function BadgerNewsItemCard(props) {

    const navigation = useNavigation();
    function handlePress() {
        navigation.push("NewsDetails", props);
    }

    return <>
        <BadgerCard onPress={handlePress}>
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
        marginTop: 8,
        color: '#2a2a2a',
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        lineHeight: 28,
    }
})
export default BadgerNewsItemCard;
