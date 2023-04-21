import { useCallback, useEffect, useState } from "react";
import { Alert, Switch, Text, View } from "react-native";
import BadgerCard from "./BadgerCard";

function BadgerPreferenceSwitch(props) {

    const [isOn, setIsOn] = useState(props.initVal ?? true)

    useEffect(() => props.handleToggle(props.prefName, isOn), [isOn]);

    const toggle = useCallback(() => setIsOn(prev => !prev), [setIsOn]);

    const showHint = useCallback(() => Alert.alert('Help', isOn ? 
        `Toggle off to hide content related to ${props.prefName}!`
        : 
        `Toggle on to show content related to ${props.prefName}!`)
    );

    return <BadgerCard onPress={showHint} style={{ marginTop: 8, marginLeft: 8, marginRight: 8 }}>
        <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 6}}>{props.prefName.toUpperCase()}</Text>
            <Switch
                trackColor={{true: 'darksalmon', false: 'lightgrey'}}
                thumbColor={isOn ? '#c5050c' : 'grey'}
                onValueChange={toggle}
                value={isOn}
                style={{justifyContent: 'right', marginLeft: 'auto'}}
            />
        </View>
    </BadgerCard>
}

export default BadgerPreferenceSwitch;
