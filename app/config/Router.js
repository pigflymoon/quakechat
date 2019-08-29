import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    createAppContainer,
    createBottomTabNavigator, createStackNavigator, NavigationScreenProp, NavigationState,
} from 'react-navigation';
import QuakesList from '../screens/QuakesList';
const MainTab = createStackNavigator({
    Home: {
        navigationOptions: {
            title: 'Welcome',
        },
        params: { banner: 'Home Screen' },
        path: '/',
        screen: QuakesList,
    },

});
const TabNavigator = createBottomTabNavigator({
    MainTab: {
        navigationOptions: {
            tabBarIcon: ({
                             tintColor,
                             focused,
                         }) => (
                <Ionicons
                    name={focused ? 'ios-home' : 'ios-home'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
            tabBarLabel: 'Home',
        },
        path: '/',
        screen: MainTab,
    },

},{
    backBehavior: 'history',
    tabBarOptions: {
        activeTintColor: '#e91e63',
    },
});

const AppContainer = createAppContainer(TabNavigator);
export default AppContainer;