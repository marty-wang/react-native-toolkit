'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    Navigator,
} = React;

var Toolkit = require('react-native-toolkit');
var {
    NavigationBar,
} = Toolkit;

var ExampleList = require('./components/ExampleList');
var NavBarButton = require('./components/NavBarButton');

class App extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Navigator
                    navigationBar={<NavigationBar />}
                    renderScene={this._renderScene}
                    initialRoute={{
                        component: ExampleList,
                        title: 'Examples',
                        leftButton: {
                            component: NavBarButton,
                            passProps: {
                                icon: 'bars',
                                onPress: this._onMenuPressed.bind(this)
                            }
                        }
                    }} />
            </View>
        );
    }

    _renderScene(route, navigator) {
        var props = Object.assign({}, { navigator: navigator }, route.passProps);
        return React.createElement(route.component, props);
    }

    _onMenuPressed() {
        alert("Menu pressed!");
    }

}

var styles = StyleSheet.create({

    container: {
        flex: 1
    },

});

module.exports = App;