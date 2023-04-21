import {createNativeStackNavigator} from "@react-navigation/native-stack";
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerNewsDetailScreen from "../screens/BadgerNewsDetailScreen";

function NewsFeedStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="NewsFeed" component={BadgerNewsScreen}
                          options={{headerShown: false}}/>
            <Stack.Screen name="NewsDetails" component={BadgerNewsDetailScreen}
                          options={{headerShown: true, title: 'Article', headerTintColor:'#c5050c'}}/>
        </Stack.Navigator>
    );
}

export default NewsFeedStack;
