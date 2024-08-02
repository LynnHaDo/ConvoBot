import { createStackNavigator } from "@react-navigation/stack";

import SettingsScreen from "../(settings)/settings";

const Stack = createStackNavigator();

export default function SettingsNavigator() {
    const SettingsComponent = () => <SettingsScreen title="Settings"/>
    return (
    <Stack.Navigator>
        <Stack.Screen
            name="SettingsScreen"
            component={SettingsComponent}
            options={{
                headerShown: false
            }}
        />
    </Stack.Navigator>
    )
}