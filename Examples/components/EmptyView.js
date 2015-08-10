'use strict';

var React = require('react-native');
var {
	StyleSheet,
	Text,
	View,
} = React;

class EmptyView extends React.Component {

	render() {
		return (
			<View style={{flex: 1, paddingTop: 64, backgroundColor: "#eeeeee"}}>
				<Text>{ this.props.message }</Text>
			</View>
		);
	}

}

module.exports = EmptyView;