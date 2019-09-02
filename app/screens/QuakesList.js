import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator,StyleSheet } from "react-native";
import FlatListDemo from '../components/FlatListDemo';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#ecf0f1',
    },
});

class QuakesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };
    }



    render() {
        return (
            <View style={styles.container}>
                <FlatListDemo />
            </View>
        );
    }
}

export default QuakesList;