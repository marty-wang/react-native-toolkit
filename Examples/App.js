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
var ExampleTitle = require('./components/ExampleTitle');

class App extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Navigator
                    navigationBar={<NavigationBar />}
                    renderScene={this._renderScene}
                    initialRoute={{
                        statusBarStyle: 'default',
                        component: ExampleList,
                        leftButton: {
                            component: NavBarButton,
                            passProps: {
                                icon: 'awesome|bars',
                                onPress: this._onMenuPressed.bind(this)
                            }
                        },
                        customTitle: {
                            component: ExampleTitle
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