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

var ExampleList = require('./components/ExampleList.js');

class App extends React.Component {

	render() {
		return (
			<View style={styles.container}>
		    	<Navigator
		    		navigationBar={<NavigationBar />}
                	renderScene={this._renderScene}
                    initialRoute={{
                        component: ExampleList,
                        title: 'Examples'
                    }} />
            </View>
		);
	}

	_renderScene(route, navigator) {
		var props = Object.assign({}, { navigator: navigator }, route.passProps);
        return React.createElement(route.component, props);
	}

}

var styles = StyleSheet.create({

	container: {
		flex: 1
	},

});

module.exports = App;