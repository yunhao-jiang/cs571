import {Button, Text, View, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import BadgerBakedGood from "./BadgerBakedGood";

export default function BadgerBakery() {
    const [bakeryItems, setBakeryItems] = useState({})
    const [bakeryKeys, setBakeryKeys] = useState([])
    const [prevDisabled, setPrevDisabled] = useState(true)
    const [nextDisabled, setNextDisabled] = useState(false)
    const [currIndex, setCurrIndex] = useState(0)
    const [cart, setCart] = useState({})
    const [quantity, setQuantity] = useState(0)
    const [minusDisabled, setMinusDisabled] = useState(true)
    const [plusDisabled, setPlusDisabled] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        fetch("https://www.cs571.org/s23/hw8/api/bakery/items", {
            method: "GET", headers: {
                "X-CS571-ID": "bid_7d85b4cff564a5dc11dd"
            }
        }).then(res => res.json()).then(json => {
            setBakeryItems(json)
            setBakeryKeys(Object.keys(json))
            setLoaded(true)
        })
    }, [])

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
    })

    useEffect(() => {
        // Check PREV and NEXT buttons
        if (currIndex === 0) setPrevDisabled(true)
        else setPrevDisabled(false)
        if (currIndex === bakeryKeys.length - 1) setNextDisabled(true)
        else setNextDisabled(false)
        // Set quantity from cart, 0 if not in cart
        cart[bakeryKeys[currIndex]] !== undefined ? setQuantity(cart[bakeryKeys[currIndex]]) : setQuantity(0)
    }, [currIndex])

    useEffect(() => {
        if (loaded) {
            // Add to cart once quantity changed
            if (quantity >= 0) {
                setCart({...cart, [bakeryKeys[currIndex]]: quantity})
            }
        }
    }, [quantity])

    useEffect(() => {
        if (loaded) {
            if (quantity === 0) setMinusDisabled(true)
            else setMinusDisabled(false)
            if (quantity === bakeryItems[bakeryKeys[currIndex]].upperBound) setPlusDisabled(true)
            else setPlusDisabled(false)
        }
    }, [quantity, currIndex])


    return <View>
        <Text style={{alignSelf: "center"}}>Welcome to Badger Bakery!</Text>
        <View style={styles.button}>
            <Button disabled={prevDisabled} onPress={() => setCurrIndex(currIndex - 1)}
                    title="PREV"/>
            <Button disabled={nextDisabled} onPress={() => setCurrIndex(currIndex + 1)}
                    title="NEXT"/>
        </View>
        <BadgerBakedGood key={bakeryKeys[currIndex]}
                         name={bakeryKeys[currIndex]} {...bakeryItems[bakeryKeys[currIndex]]}/>
        <View style={styles.button}>
            <Button disabled={minusDisabled} onPress={() => setQuantity(quantity - 1)} title="-"/>
            <Text>{quantity}</Text>
            <Button disabled={plusDisabled} onPress={() => setQuantity(quantity + 1)} title="+"/>
        </View>
        <Text style={{alignSelf: 'center'}}>Order Total: ${calcTotal().toFixed(2)}</Text>
        <Button onPress={submitOrder} title="SUBMIT ORDER" disabled={calcTotal() === 0}/>
    </View>
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
