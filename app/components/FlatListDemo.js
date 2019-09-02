import React, {Component} from "react"
import {FlatList, View, Image, Text, ActivityIndicator, TextInput, Dimensions} from "react-native"

const {width, height} = Dimensions.get("window")

export default class FlatListDemo extends Component {
    state = {
        loading: false,
        data: [],
        page: 1,
        seed: 1,
        error: false,
        refreshing: false,
        filteredData: []
    }

    inputSearch = "";

    componentDidMount () {
        this.setState({ loading: true }, () => this.makeRemoteRequest());
    }

    makeRemoteRequest = async () => {
        const { page, seed } = this.state;
        const url = `https://api.geonet.org.nz/quake?MMI=3`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            this.setState(
                {
                    data:
                        page === 1 ? data.features : [...this.state.data, ...data.features],
                    error: data.error || null,
                    loading: false,
                    refreshing: false
                },
                () => this.searchFilterFunction("")
            );
        } catch (error) {
            this.setState({ error, loading: false });
        }
    };

    _renderItem = ({item}) => (
        <View
            style={{
                flexDirection: "row",
                flex: 1
            }}>

            <View style={{ justifyContent: "center", marginLeft: 5 }}>

                <Text>Magnitude: {item.properties.magnitude}</Text>
                <Text>Depth: {item.properties.depth}</Text>
                <Text>Locality: {item.properties.locality}</Text>
            </View>


        </View>
    )

    keyExtractor = (item, index) => `key${index}`;


    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    renderHeader = () => {
        return (
            <View
                style={{ alignItems: "center", padding: 10, backgroundColor: "#fff" }}
            >
                <TextInput
                    style={{
                        flex: 1,
                        width: width / 1.1,
                        borderWidth: 1,
                        borderRadius: 15
                    }}
                    underlineColorAndroid={"transparent"}
                    placeholder={"Search"}
                    onChangeText={text => this.searchFilterFunction(text)}
                    value={this.inputSearch}
                />
                {this.inputSearch.length > 0 && (
                    <Text>{this.state.filteredData.length} items found</Text>
                )}
            </View>
        );
    };

    searchFilterFunction = text => {
        this.inputSearch = text;
        const newData = this.state.data.filter(item => {
            const itemData = `${item.properties.locality.toUpperCase()}}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({ filteredData: newData });
    };

    handleOnEndReached = info => {
        if (info.distanceFromEnd >= -10) {
            this.inputSearch.length === 0 &&
            !this.state.loading &&
            this.setState(
                (state, props) => {
                    return { loading: true, page: state.page + 1 };
                },
                () => this.makeRemoteRequest()
            );
        }
    };

    renderFooter = () => {
        if (this.state.loading && this.state.data.length !== 0) {
            return (
                <View
                    style={{
                        paddingVertical: 20,
                        borderTopWidth: 1,
                        borderColor: "#CED0CE",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <ActivityIndicator animating size={"large"} />
                </View>
            );
        }
        return null;
    };

    handleRefresh = () => {
        this.setState({ refreshing: true, seed: Math.random(), page: 1 }, () =>
            this.makeRemoteRequest()
        );
    };

    render(){
        return(
            <FlatList
                data={this.state.filteredData}
                renderItem={this._renderItem}
                keyExtractor={this.keyExtractor}
                ListEmptyComponent={<ActivityIndicator animating size={"large"} />}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                onEndReachedThreshold={0.9}
                onEndReached={this.handleOnEndReached}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
            />
        )
    }
}