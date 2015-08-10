'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    PixelRatio,
} = React;

var EmptyView = require('./EmptyView.js');

class ExampleList extends React.Component {

    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows(['<NavigationBar>', 'More to come...']),
        };
    }

    render() {
        return (
            <View style={styles.listContainer}>
                <ListView
                  style={styles.list}
                  dataSource={this.state.dataSource}
                  renderRow={this._renderRow.bind(this)} />
            </View>
        );
    }

    _renderRow(rowData) {
        var self = this;

        return (
            <View style={styles.rowContainer}>
                <TouchableHighlight onPress={self._onRowPressed.bind(self, rowData)}>
                    <View style={styles.row}>
                        <Text style={styles.rowTitleText}>{rowData}</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.separator} />
            </View>
        );
    }

    _onRowPressed(rowData) {
        this.props.navigator.push({
            component: EmptyView,
            passProps: {
                message: "hello world"
            },
            title: "This is a very very very long title that will be truncated!",
        });
    }

}

var styles = StyleSheet.create({

    listContainer: {
        flex: 1,
        paddingTop: 44
    },

    list: {
        backgroundColor: '#eeeeee',
    },

    rowContainer: {
        backgroundColor: '#eaeaea'
    },

    row: {
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
    },

    rowTitleText: {
        fontSize: 17,
        fontWeight: '500',
    },

    separator: {
        height: 1 / PixelRatio.get(),
        backgroundColor: '#bbbbbb',
    },

});

module.exports = ExampleList;