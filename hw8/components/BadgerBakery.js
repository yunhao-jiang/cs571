import {Button, Text, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import BadgerBakedGood from "./BadgerBakedGood";
import BakeryOrderContext from "../contexts/BakeryOrderContext";

export default function BadgerBakery() {
    const [bakeryItems, setBakeryItems] = useState({})
    const [bakeryKeys, setBakeryKeys] = useState([])
    const [prevDisabled, setPrevDisabled] = useState(true)
    const [nextDisabled, setNextDisabled] = useState(false)
    const [currentItem, setCurrentItem] = useState(0)
    const [cart, setCart] = useState({})
    const [quantity, setQuantity] = useState(0)
    const [minusDisabled, setMinusDisabled] = useState(true)
    const [plusDisabled, setPlusDisabled] = useState(false)

    useEffect(() => {
        fetch("https://www.cs571.org/s23/hw8/api/bakery/items", {
            method: "GET", headers: {
                "X-CS571-ID": "bid_7d85b4cff564a5dc11dd"
            }
        }).then(res => res.json()).then(json => {
            setBakeryItems(json)
            setBakeryKeys(Object.keys(json))
        })
    }, [])

    const prevItem = (() => {
        if (currentItem === 1) setPrevDisabled(true)
        if (currentItem === bakeryKeys.length - 1) setNextDisabled(false)
        setCurrentItem(currentItem - 1)
        setQuantity(0)
        setMinusDisabled(true)
        setPlusDisabled(false)
    })

    const nextItem = (() => {
        if (currentItem === bakeryKeys.length - 2) setNextDisabled(true)
        if (currentItem === 0) setPrevDisabled(false)
        setCurrentItem(currentItem + 1)
        setQuantity(0)
        setMinusDisabled(true)
        setPlusDisabled(false)
    })

    const minusItem = (() => {
        if (quantity === 1) setMinusDisabled(true)
        if (quantity === bakeryItems[bakeryKeys[currentItem]].upperBound) setPlusDisabled(false)
        setQuantity(quantity - 1)
    })

    const plusItem = (() => {
        if (quantity === bakeryItems[bakeryKeys[currentItem]].upperBound - 1) setPlusDisabled(true)
        if (quantity === 0) setMinusDisabled(false)
        setQuantity(quantity + 1)
    })

    const addToCart = (() => {
        const existingQuantity = cart[bakeryKeys[currentItem]]
        let afterQuantity = 0

        existingQuantity ? afterQuantity = existingQuantity + quantity : afterQuantity = quantity

        if (afterQuantity > bakeryItems[bakeryKeys[currentItem]].upperBound) {
            alert("You can only order up to " + bakeryItems[bakeryKeys[currentItem]].upperBound + " units of " + bakeryKeys[currentItem])
        } else {
            setCart({...cart, [bakeryKeys[currentItem]]: afterQuantity})

        }
        setQuantity(0)
        setMinusDisabled(true)
        setPlusDisabled(false)
    })


    const calcTotal = (() => {
        let total = 0
        Object.keys(cart).forEach((key) => {
            total += cart[key] * bakeryItems[key].price
        })
        return total
    })

    const submitOrder = (() => {
        fetch("https://www.cs571.org/s23/hw8/api/bakery/order", {
            method: "POST", headers: {
                "X-CS571-ID": "bid_7d85b4cff564a5dc11dd", "Content-Type": "application/json"
            }, body: JSON.stringify(cart)
        }).then(res => res.json()).then(json => {
            alert(json.msg)
        })
        setCart({})
        setQuantity(0)
        setMinusDisabled(true)
        setPlusDisabled(false)
    })


    return <View>
        <Text style={{alignSelf: "center"}}>Welcome to Badger Bakery!</Text>
        <Button disabled={prevDisabled} onPress={prevItem} title="PREV"/>
        <Button disabled={nextDisabled} onPress={nextItem} title="NEXT"/>
        <BadgerBakedGood key={bakeryKeys[currentItem]}
                         name={bakeryKeys[currentItem]} {...bakeryItems[bakeryKeys[currentItem]]}/>
        <Button disabled={minusDisabled} onPress={minusItem} title="-"/>
        <Text>{quantity}</Text>
        <Button disabled={plusDisabled} onPress={plusItem} title="+"/>
        <Button onPress={addToCart} title="ADD TO CART"/>
        <Text>Order Total: ${calcTotal().toFixed(2)}</Text>
        <Button onPress={submitOrder} title="SUBMIT ORDER" disabled={calcTotal() === 0}/>
    </View>
}
