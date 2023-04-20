import React, {useEffect, useState} from "react";
import {ScrollView, Text} from "react-native";
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
        <ScrollView style={{backgroundColor: 'gainsboro', paddingTop:7}}>
        {
            loaded ? articles.map((article) => {
                return <BadgerNewsItemCard key={article.id} {...article}/>
            }) : <Text>Loading...</Text>
        }
        </ScrollView>
    </>
}

export default BadgerNewsScreen;
