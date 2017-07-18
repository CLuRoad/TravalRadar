/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator
} from 'react-native';

import MainTabBar from './MainTabBar'
class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
      };
  }
  _renderScene(route, navigator) {
      let Component = route.component;
      return (
          <Component {...route.params} navigator={navigator}/>
      );
  }
  render() {
      return (
          <Navigator
              initialRoute={{
                  name: 'home',
                  component:MainTabBar
              }}
              renderScene={(e, i)=>this._renderScene(e, i)}
          />
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

module.exports = MainTabBar;
