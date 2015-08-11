'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
    StatusBarIOS,
} = React;

class BackButton extends React.Component {

    render() {
        var self = this;
        var backArrow = "❮";

        return (
            <View style={styles.backButton}>
                <TouchableOpacity onPress={self._onPress.bind(self)}>
                    <Text style={[styles.backArrow, {color: this.props.color}]}>
                        { backArrow }
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    _onPress() {
        this.props.navigator.pop();
    }

}

class CrossFade extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            front: {
                opacity: new Animated.Value(1)
            },
            back: {
                opacity: new Animated.Value(0)
            }
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                { this._createAnimatedView(this.props.backElement, this.state.back.opacity) }
                { this._createAnimatedView(this.props.frontElement, this.state.front.opacity) }
            </View>
        );
    }

    start() {
        var state = this.state;
        var duration = this.props.duration || 300;

        var createAnimation = (property, toValue) => {
            return Animated.timing(
                property,
                {
                    toValue: toValue,
                    duration: duration
                }
            );
        };

        state.front.opacity.setValue(0);
        state.back.opacity.setValue(1);

        var animations = [
            createAnimation(state.front.opacity, 1),
            createAnimation(state.back.opacity, 0),
        ];

        Animated
            .parallel(animations, {stopTogether: false})
            .start((result) => {
                if (!result.finished) {
                    // coerce the end values if animations are not finished.
                    state.front.opacity.setValue(1);
                    state.back.opacity.setValue(0);
                }
            });
    }

    _createAnimatedView(element, opacity) {
        if (!element) {
            return null;
        }

        return (
            <Animated.View style={[styles.child, {opacity: opacity}]}>
                {element}
            </Animated.View>
        );
    }

}

var navBarPropTypes = {
    barStyle: React.PropTypes.object, // any css style valid for View
    titleStyle: React.PropTypes.object, // any css style valid for Text
    backButtonColor: React.PropTypes.string,
};

var navBarDefaultProps = {};

// route props types
//
// title: React.PropTypes.string
// customTitle: { component: React.PropTypes.element, passProps: React.PropTypes.object }
// leftButton: { component: React.PropTypes.element, passProps: React.PropTypes.object }
// rightButton: { component: React.PropTypes.element, passProps: React.PropTypes.object }
// backButton: { component: React.PropTypes.element, passProps: React.PropTypes.object }
// barStyle: React.PropTypes.object
// titleStyle: React.PropTypes.object
// statusBarStyle: React.PropTypes.string

class NavigationBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            route: null,
            prevRoute: null
        };
    }

    render() {
        var elements = this._createElements(this.state.route);
        var prevElements = this._createElements(this.state.prevRoute);

        return (
            <View style={[styles.container, this.props.barStyle, this.state.route && this.state.route.barStyle]}>
                <View style={styles.left}>
                    { <CrossFade ref="leftCrossFade" frontElement={elements.left} backElement={prevElements.left} /> }
                </View>
                <View style={styles.middle}>
                    { <CrossFade ref="middleCrossFade" frontElement={elements.middle} backElement={prevElements.middle} /> }
                </View>
                <View style={styles.right}>
                    { <CrossFade ref="rightCrossFade" frontElement={elements.right} backElement={prevElements.right} /> }
                </View>
            </View>
        );
    }

    componentWillMount() {
        var navigationContext = this.props.navigator.navigationContext;

        this._listeners = [
            navigationContext.addListener('willfocus', this._onWillFocus.bind(this)),
            navigationContext.addListener('didfocus', this._onDidFocus.bind(this)),
        ];
    }

    componentWillUnmount() {
        this._listeners && this._listeners.forEach(listener => listener.remove());
    }

    _createElements(route) {
        return {
            left: route ? this._createLeftElement(route) : null,
            middle: route ? this._createMiddleElement(route) : null,
            right: route ? this._createRightElement(route) : null
        }
    }

    _createLeftElement(route) {
        var canBack = this.props.navigator.state.routeStack.indexOf(route) > 0;
        var leftButton = route.leftButton;

        if (leftButton) {
            return this._createCustomElement(leftButton);
        } else if (canBack) {
            let backButton = {
                component: BackButton,
                passProps: { color: this.props.backButtonColor || (this.props.titleStyle && this.props.titleStyle.color) || (route.titleStyle && route.titleStyle.color) }
            };
            return this._createCustomElement(route.customBackButton || backButton);
        } else {
            return null;
        }
    }

    _createMiddleElement(route) {
        var customTitle = route.customTitle;

        if (customTitle) {
            return this._createCustomElement(customTitle);
        } else {
            return (
                <View>
                    <Text style={[styles.title, this.props.titleStyle, route.titleStyle]} numberOfLines={1}>
                        { route.title }
                    </Text>
                </View>
            );
        }
    }

    _createRightElement(route) {
        var rightButton = route.rightButton;

        if (rightButton) {
            return this._createCustomElement(rightButton);
        } else {
            return null;
        }
    }

    _createCustomElement(custom) {
        return React.createElement(
            custom.component,
            Object.assign({}, { navigator: this.props.navigator }, custom.passProps)
        );
    }

    _onWillFocus(event) {
        this._onWillFocusCalled = true;

        var route = event.data.route;

        if (route && route.statusBarStyle) {
            StatusBarIOS.setStyle(route.statusBarStyle);
        }

        this.setState({
            route: route,
            prevRoute: this.state.route
        });

        this.refs.leftCrossFade.start();
        this.refs.middleCrossFade.start();
        this.refs.rightCrossFade.start();
    }

    _onDidFocus(event) {
        if (this._onWillFocusCalled) {
            return;
        }

        var route = event.data.route;

        if (route && route.statusBarStyle) {
            StatusBarIOS.setStyle(route.statusBarStyle);
        }

        this.setState({
            route: route
        });
    }

}

NavigationBar.propTypes = navBarPropTypes;

NavigationBar.defaultProps = navBarDefaultProps;

var styles = StyleSheet.create({

    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        paddingTop: 20,
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#d0d0d0',
    },

    left: {
        width: 40,
        justifyContent: 'center',
    },

    middle: {
        flex: 1,
        justifyContent: 'center',
    },

    right: {
        width: 40,
        justifyContent: 'center',
    },

    child: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },

    backButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    backArrow: {
        fontSize: 22,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
    },

    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }

});

module.exports = NavigationBar;