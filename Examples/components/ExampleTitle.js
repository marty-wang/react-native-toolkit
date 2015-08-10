'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    Image,
} = React;

class ExampleTitle extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('image!react_logo')}
                    style={styles.logo} />
                <Text style={styles.text}>Examples</Text>
            </View>
        );
    }

}

var styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    logo: {
        width: 32,
        height: 32,
        borderRadius: 16
    },

    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    }

});

module.exports = ExampleTitle;