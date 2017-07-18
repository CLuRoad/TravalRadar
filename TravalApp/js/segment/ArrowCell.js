import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

class ArrowCell extends Component {

	render() {
		return (
			<TouchableOpacity onPress = {this.props.onPress}>
				<View style={styles.container}>
					<View style={styles.titleBg}>
						<Text style={styles.title}>
							{this.props.title}
						</Text>
					</View>
					<View style={styles.arrowBg}>
						<Image
							style={styles.arrow}
							source={require('../../source/img/jiantou@2x.png')}
						/>
					</View>
				</View>
			</TouchableOpacity>
			
		);
	}
}

var styles = StyleSheet.create({
	container:{
		flexDirection:'row',
		marginTop:1,
		paddingLeft:12,
		backgroundColor:'white',
		height:48,
	},
	titleBg:{
		flex:1,
		justifyContent:'center'
	},
	arrow:{
	},
	arrowBg:{
		marginRight:15,
		width:15,
		justifyContent:'center',
		alignItems: 'center'
	},
	title:{
		fontSize:16,
		color:'#616161'
	}
});

module.exports = ArrowCell;