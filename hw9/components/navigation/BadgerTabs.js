import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import NewsFeedStack from "./NewsFeedStack";

function BadgerTabs(props) {
    const BadgerNewsTab = createBottomTabNavigator();
    return <>
        <BadgerNewsTab.Navigator>
            <BadgerNewsTab.Screen name={"News"} component={NewsFeedStack}
                                  options={{
                                      title: "Articles", tabBarIcon: ({color, size, focused}) => (
                                          <Ionicons name="newspaper-outline"
                                                    color={focused ? "#c5050c" : color}
                                                    size={size}/>
                                      ), tabBarShowLabel: false, headerShown: false
                                  }}/>
            <BadgerNewsTab.Screen name={"Preferences"} component={BadgerPreferencesScreen}
                                  options={{
                                      tabBarIcon: ({color, size, focused}) => (
                                          <Ionicons name="settings-outline"
                                                    color={focused ? "#c5050c" : color}
                                                    size={size}/>
                                      ), tabBarShowLabel: false,
                                  }}/>
        </BadgerNewsTab.Navigator>
    </>
}

export default BadgerTabs;
