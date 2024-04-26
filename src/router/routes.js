import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../views/SignIn";
import DashBoard from "../views/DashBoard";
import Register from "../views/Register"
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Stack = createNativeStackNavigator();

export default function Routes() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="DashBoard"
                component={DashBoard}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
