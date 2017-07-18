
import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	Button,
	StyleSheet,
	TouchableOpacity,
	NativeModules

} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Home from './pages/home'
import Box from './pages/box'
import Mine from './pages/mine'


import Detail from './pages/detail'



const MainTabBar = TabNavigator(
	{
	  Home:{
	  	screen: Home
	  },
	  Box:{
	  	screen: Box
	  },
	  Mine:{
	  	screen: Mine
	  }
	},
	{

		tabBarOptions: {
			activeTintColor:'#45AFEA',
			labelStyle: {fontSize:11,marginBottom:6}
		},
		navigationOptions: ({navigation}) => ({
	      headerTitleStyle: {color:'white',fontSize:20},
	      headerStyle: {backgroundColor:'#45AFEA'},
	      
	      
	    })
	}
);


const App = StackNavigator({
	Home: {
		screen: MainTabBar
	},
	Detail: {
		screen: Detail
	}
},{

});

var styles = StyleSheet.create({
	
});

module.exports = App;

