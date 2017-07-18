import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet
} from 'react-native';


import ArrowCell from '../segment/ArrowCell'

class UserIconCell extends Component {
	render() {
		return(
			<TouchableOpacity style={userCellStyles.container}>
				<View style={userCellStyles.imgBg}>
					<Image
						style={userCellStyles.img}
						source = {{uri:'http://p2.so.qhimgs1.com/bdr/_240_/t017d23f4e9708e2f4e.jpg'}}
					/>
				</View>
				<View style={userCellStyles.textBg}>
					<Text style={userCellStyles.name}>还珠格格0.4.0</Text>
					<Text style={userCellStyles.info}>大秦帝国~</Text>
				</View>
				<View style={userCellStyles.arrowBg}>
					<Image
						style={userCellStyles.arrow}
						source = {require('../../source/img/jiantou@2x.png')}
					/>
				</View>
			</TouchableOpacity>
		);
	}
}

var userCellStyles = StyleSheet.create({
	container: {
		flexDirection:'row',
		paddingTop:12,
		paddingBottom:12,
		backgroundColor:'white',
		height:90
	},
	imgBg:{
		marginLeft:15,
	},
	img: {
		height:70,
		width:70,
		borderRadius:35
	},
	textBg:{
		flex:1,
		flexDirection:'column',
		marginLeft:10
	},
	name:{
		fontSize:18,
		marginTop:12
	},
	info:{
		fontSize:15,
		color:'#B1B1B1',
		marginTop:10
	},
	arrowBg:{
		marginRight:15,
		width:15,
		justifyContent:'center',
		alignItems: 'center'
	},
	arrow:{
		
	}
});


class MinePage extends Component {
	
	static navigationOptions = {
		tabBarLabel:'我的',
		headerTitle:'我的信息',
		tabBarIcon: ({tintColor}) => (
			<Image
				source = {require('../../source/img/wode@2x.png')}
				style = {{width:26,height:26,tintColor:tintColor}}
			/>
		)
	}
	

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentWillMount() {

	}

	render() {
		return (
			<View style={styles.container}>
				<UserIconCell/>
				
				<View style={{marginTop:12}}>
					<ArrowCell
						title={'我的收藏'}
					/>
					<ArrowCell
						title={'我的评论'}
					/>
				</View>
				<View style={{marginTop:12}}>
					<ArrowCell
						title={'设置'}
					/>
				</View>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {

	},

});

module.exports = MinePage;