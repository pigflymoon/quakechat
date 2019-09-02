import React, {Component} from 'react';
import {
    AppState,
    AsyncStorage
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";

import AppContainer from './config/Router';

export default class TabsContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isConnected: false,
            currentScreen: 'QuakesList',

        };

    }


    render() {
        return (<AppContainer/>
        )
    }
}