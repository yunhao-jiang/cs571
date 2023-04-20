import { Pressable, StyleSheet, View } from "react-native";

export default function BadgerCard(props) {
    return <Pressable onPress={props.onPress} onLongPress={props.onLongPress}>
        <View style={[styles.card, props.style]}>
            {props.children}
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        marginHorizontal: 12,
        marginVertical: 7,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    }
})
