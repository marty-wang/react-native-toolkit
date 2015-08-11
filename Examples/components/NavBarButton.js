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
                    { this._createIconElement(this.props.icon) }
                </TouchableOpacity>
            </View>
        );
    }

    _createIconElement(icon) {
        var segments = icon.split('|');
        var iconSource = segments[0];
        var iconName = segments[1];
        var Icon;

        switch(iconSource) {
            case 'ion':
                Icon = this._getIonIcon();
                break;
            case 'awesome':
            default:
                Icon = this._getAwesomeIcon();
                break;
        }

        return <Icon name={iconName} size={22} color={this.props.color} style={styles.icon} />
    }

    _getAwesomeIcon() {
        if (!this._awesomeIcon) {
            this._awesomeIcon = require('react-native-vector-icons/FontAwesome');
        }
        return this._awesomeIcon;
    }

    _getIonIcon() {
        if (!this._ionIcon) {
            this._ionIcon = require('react-native-vector-icons/Ionicons');
        }
        return this._ionIcon;
    }
}

var styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        padding: 6
    }

});

module.exports = NavBarButton;