# React Native Toolkit

Stay tuned!

Feel adventurous? Check out examples and get started! :)

## Navigation bar

* Custom navigation bar style per scene, including text color, background color, bottom border, shadow and etc

* Custom title, left, right and back components of the navigation bar per scene"

* Crossfade effect on the navigation bar during scene transition

* Adjustable status bar style to match with the navigation bar style

```
// NavigationBar prop types
{
    barStyle: React.PropTypes.object, // any css style valid for View
    titleStyle: React.PropTypes.object, // any css style valid for Text
    backButtonColor: React.PropTypes.string,
}

// Route prop types
{
    title: React.PropTypes.string,
    customTitle: { component: React.PropTypes.element, passProps: React.PropTypes.object },
    leftButton: { component: React.PropTypes.element, passProps: React.PropTypes.object },
    rightButton: { component: React.PropTypes.element, passProps: React.PropTypes.object },
    backButton: { component: React.PropTypes.element, passProps: React.PropTypes.object },
    barStyle: React.PropTypes.object,
    titleStyle: React.PropTypes.object,
    statusBarStyle: React.PropTypes.string,
}
```

![Twitter style navigation bar](https://raw.githubusercontent.com/marty-wang/react-native-toolkit/master/Examples/Screenshots/twitter-navbar.gif)