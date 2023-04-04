import {Button, Text, View} from "react-native";
import {useEffect, useState} from "react";
import BadgerBakedGood from "./BadgerBakedGood";

export default function BadgerBakery() {
    const [bakeryItems, setBakeryItems] = useState({})
    const [bakeryKeys, setBakeryKeys] = useState([])
    const [prevDisabled, setPrevDisabled] = useState(true)
    const [nextDisabled, setNextDisabled] = useState(false)
    const [currentItem, setCurrentItem] = useState(0)

    useEffect(() => {
        fetch("https://www.cs571.org/s23/hw8/api/bakery/items", {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_7d85b4cff564a5dc11dd"
            }
        }).then(res => res.json()).then(json => {
            setBakeryItems(json)
            setBakeryKeys(Object.keys(json))
            console.log(bakeryKeys)
        })
    }, [])

    const prevItem = (() => {
        if(currentItem === 1) setPrevDisabled(true)
        if(currentItem === bakeryKeys.length - 1) setNextDisabled(false)
        setCurrentItem(currentItem - 1)
    })

    const nextItem = (() => {
        if(currentItem === bakeryKeys.length - 2) setNextDisabled(true)
        if(currentItem === 0) setPrevDisabled(false)
        setCurrentItem(currentItem + 1)
    })


    return <View>
        <Text style={{alignSelf: "center"}}>Welcome to Badger Bakery!</Text>
        <Button disabled={prevDisabled} onPress={prevItem} title="PREV"/>
        <Button disabled={nextDisabled} onPress={nextItem} title="NEXT"/>
        <BadgerBakedGood key={bakeryKeys[currentItem]}
                         name={bakeryKeys[currentItem]} {...bakeryItems[bakeryKeys[currentItem]]}/>
    </View>
}
