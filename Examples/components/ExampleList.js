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

var EmptyView = require('./EmptyView');
var NavBarButton = require('./NavBarButton');

var TwitterTitle = require('./twitter/Title');
var TwitterScene = require('./twitter/Scene');

class ExampleList extends React.Component {

    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        var items = [{
            id: 'twitter',
            label: 'Twitter style navigation bar',
        }, {
            id: 'more',
            label: 'More to come...'
        }];

        this.state = {
            dataSource: ds.cloneWithRows(items),
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
                        <Text style={styles.rowTitleText}>{rowData.label}</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.separator} />
            </View>
        );
    }

    _onRowPressed(rowData) {
        var route;

        switch(rowData.id) {
            case 'twitter':
                route = {
                    statusBarStyle: 'light-content',
                    component: TwitterScene,
                    passProps: {
                        message: rowData.label
                    },
                    customTitle: {
                        component: TwitterTitle,
                        passProps: {
                            text: 'Home'
                        }
                    },
                    barStyle: {
                        backgroundColor: '#60B5F0'
                    },
                    titleStyle: {
                        color: 'white',
                        fontSize: 22,
                    },
                    leftButton: {
                        component: NavBarButton,
                        passProps: {
                            icon: 'awesome|user-plus',
                            color: 'white',

                        }
                    },
                    rightButton: {
                        component: NavBarButton,
                        passProps: {
                            icon: 'awesome|pencil',
                            color: 'white',
                        }
                    }
                };
                break;
        }

        route && this.props.navigator.push(route);
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