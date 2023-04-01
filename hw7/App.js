import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from "react";

export default function App() {
    const [input, setInput] = useState("")
    const [total, setTotal] = useState(0)

    return (
        <View style={styles.container}>
            <Text>Your total is {total}</Text>
            <TextInput onChangeText={setInput} placeholder="Enter a number" value={input}
                       keyboardType={"numbers-and-punctuation"} style={styles.input}/>
            <Button title="Add" onPress={() => {setTotal(total + Number(input));setInput("")}}> </Button>
            <Button title="Reset" onPress={() => {
                setTotal(0);
                setInput("");
            }}> </Button>
            <StatusBar style="auto"/>
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    }
});
