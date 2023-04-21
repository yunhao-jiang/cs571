import React, {useContext, useEffect, useState} from "react";
import {Image, SafeAreaView, ScrollView, Text} from "react-native";
import BadgerNewsItemCard from "../BadgerNewsItemCard";
import BadgerPreferencesContext from "../../contexts/BadgerPreferencesContext";

function BadgerNewsScreen(props) {
    const [articles, setArticles] = useState({});
    const [loaded, setLoaded] = useState(false)
    const [prefs, setPrefs] = useContext(BadgerPreferencesContext)

    useEffect(() => {
        fetch("https://www.cs571.org/s23/hw9/api/news/articles", {
            method: 'GET',
            headers: {
                "X-CS571-ID": "bid_7d85b4cff564a5dc11dd"
            }
        }).then(res => res.json()).then(data => {
            setArticles(data)
            setLoaded(true)
            setPrefs(data.reduce((acc, article) => {
                let tagListToAdd = {}
                for (const tag of article.tags) {
                    if (!acc[tag]) {
                        tagListToAdd[tag] = true
                    }
                }
                return {...acc, ...tagListToAdd}
            }, {}))
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
                loaded ? articles.filter((article) => {
                            for (const tag of article.tags) {
                                if (!prefs[tag]) {
                                    return false
                                }
                            }
                            return true
                        }
                    ).map((article) => <BadgerNewsItemCard key={article.id} {...article}/>) :
                    <Text>Loading...</Text>
            }
        </ScrollView>
    </>
}

export default BadgerNewsScreen;
