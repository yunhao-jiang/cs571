import React, {useEffect, useState} from "react";
import {Image, SafeAreaView, ScrollView, Text, View} from "react-native";
import BadgerNewsItemCard from "../BadgerNewsItemCard";

function BadgerNewsScreen(props) {
    const [articles, setArticles] = useState({});
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        fetch("https://www.cs571.org/s23/hw9/api/news/articles", {
            method: 'GET',
            headers: {
                "X-CS571-ID": "bid_7d85b4cff564a5dc11dd"
            }
        }).then(res => res.json()).then(data => {
            setArticles(data)
            setLoaded(true)
        })
    }, [])
    return <>
        <SafeAreaView backgroundColor='white' style={{flexDirection: 'row'}}>
            <Image
                source={{uri: 'https://brand.wisc.edu/content/uploads/2016/11/Bucky-Badger-233x300.jpg'}}
                style={{height: 45, width: 35, marginBottom: 10, marginLeft: 22, marginRight: 10}}/>
            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                marginTop: 13,
                color: '#423f38',
                fontStyle: 'italic'
            }}>Badger News</Text>
        </SafeAreaView>
        <ScrollView style={{backgroundColor: 'gainsboro', paddingTop: 7}}>
            {
                loaded ? articles.map((article) => {
                    return <BadgerNewsItemCard key={article.id} {...article}/>
                }) : <Text>Loading...</Text>
            }
        </ScrollView>
    </>
}

export default BadgerNewsScreen;
