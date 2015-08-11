'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} = React;

class Scene extends React.Component {

    render() {
        var self = this;

        var highlights = [
            "Custom navigation bar style per scene, including text color, background color, bottom border, shadow and etc",
            "Custom title, left, right and back components of the navigation bar per scene",
            "Crossfade effect on the navigation bar during scene transition",
            "Adjustable status bar style to match with the navigation bar style"
        ];

        var highlightElements = highlights.map((highlight) => {
            return (
                <View>
                    <Text style={styles.highlight}>{highlight}</Text>
                    <View style={{height:1, backgroundColor: 'white'}}></View>
                </View>
            );
        });

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={self._onBackPressed.bind(self)}>
                    <View style={styles.backContainer}>
                        <Text style={{fontSize: 22}}>Back to Examples List</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.highlights}>
                    <Text style={styles.highlightTitle}>Highlights:</Text>
                    { highlightElements }
                </View>
            </View>
        );
    }

    _onBackPressed() {
        this.props.navigator.pop();
    }

}

var styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 64,
        backgroundColor: '#eeeeee'
    },

    backContainer: {
        padding: 10,
    },

    highlights: {
        flex: 1,
        backgroundColor: '#a6a6a6',
        padding: 10
    },

    highlightTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
        paddingBottom: 4
    },

    highlight: {
        marginVertical: 4,
        color: 'white'
    }

});

module.exports = Scene;