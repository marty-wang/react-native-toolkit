'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');

class NavBarButton extends React.Component {

    render() {
        var self = this;

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={self.props.onPress}>
                    <Icon name={this.props.icon} size={22} style={styles.icon}/>
                </TouchableOpacity>
            </View>
        );
    }

}

var styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    icon: {
        padding: 6,
    }

});

module.exports = NavBarButton;