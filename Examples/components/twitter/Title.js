'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TextInput,
} = React;

var NavBarButton = require('../NavBarButton');

class Title extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchEnabled: false,
            searchText: ""
        };
    }

    render() {
        var self = this;

        if (!this.state.searchEnabled) {
            return (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{this.props.text}</Text>
                    </View>
                    <View style={styles.icon}>
                        <NavBarButton icon='awesome|search' color='white' onPress={self._onSearchPressed.bind(self)} />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchBox}
                        placeholder='Search...'
                        placeholderTextColor='#cccccc'
                        onChangeText={(text) => this.setState({searchText: text})}
                        value={this.state.searchText} />
                </View>
            );
        }
    }

    _onSearchPressed() {
        this.setState({
            searchEnabled: true
        });
    }

}

var styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    titleContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },

    icon: {
        width: 40,
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
    },

    searchContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },

    searchBox: {
        flex: 1,
        borderColor: 'transparent',
        borderRadius: 4,
        backgroundColor: '#437ea8',
        paddingHorizontal: 6,
        color: '#cccccc'
    }

});

module.exports = Title;