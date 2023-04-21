import {useEffect, useState} from "react";
import {Dimensions, Image, ScrollView, StyleSheet, Text} from "react-native";

function BadgerNewsDetailScreen(props) {
    props = props.route.params;
    const [article, setArticle] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch(`https://www.cs571.org/s23/hw9/api/news/articles/${props.id}`, {
            method: 'GET',
            headers: {
                "X-CS571-ID": "bid_7d85b4cff564a5dc11dd"
            }
        }).then(res => res.json()).then(data => {
            setArticle(data)
            setLoaded(true)
            console.log(data)
        })
    }, [])
    return <>
        <ScrollView style={{backgroundColor: '#f5f2e8'}}>
            <Image source={{uri: props.img}} style={styles.image}/>
            <Text style={styles.title}>{props.title}</Text>
            {
                loaded ? article.body.map((paragraph, index) => {
                    return <Text key={index} style={styles.text}>{paragraph}</Text>
                }) : <Text style={styles.loading}>Loading...</Text>
            }
        </ScrollView>
    </>
}

const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    image: {
        height: screenHeight * 0.25,
        margin: 10,
        marginTop: 13,
        borderRadius: 10,
    }, title: {
        margin: 15,
        fontSize: 25,
        marginTop: 5,
        color: '#423f38',
        lineHeight: 34,
        fontWeight: 'bold',
        fontFamily: 'Avenir Next',

    }, text: {
        marginHorizontal: 10,
        fontSize: 18,
        fontFamily: 'Avenir Next',
        padding: 8,
        color: '#423f38',
        fontWeight: '400',
    }, loading: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Avenir Next',
        fontWeight: 'bold',
        color: '#aba491',
    }
})
export default BadgerNewsDetailScreen;
