import { Text } from "react-native";
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

function BadgerTabs(props) {
    const BadgerNewsTab = createBottomTabNavigator();
    return <>
        <BadgerNewsTab.Navigator>
            <BadgerNewsTab.Screen name={"News"} component={BadgerNewsScreen} options={{title:"Articles"}}/>
            <BadgerNewsTab.Screen name={"Preferences"} component={BadgerPreferencesScreen} />
        </BadgerNewsTab.Navigator>
    </>
}

export default BadgerTabs;
