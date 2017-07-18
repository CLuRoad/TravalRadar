import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

class ProductCell extends Component {

	render() {
		return (
			<TouchableOpacity onPress = {this.props.onPress}>
				<View style={styles.container}>
					<View>
						<Image
							source={{uri:this.props.image}}
							style={styles.image}
						/>
					</View>
					<View style={styles.rightView}>
						<View style={{flexDirection:'row'}}>
							<Text style={styles.business}>{this.props.author}</Text>
							<Text style={styles.date}>{this.props.pubdate}</Text>
						</View>
						<View>
							<Text style={styles.title}>{this.props.title}</Text>
						</View>
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
		padding:12,
		backgroundColor:'white'
	},
	rightView:{
		paddingLeft:12,
		flex:1
	},
	flex:{
		flex:1
	},
	image:{
		width:118,
		height:90
	},
	business:{
		fontSize:12,
		color:'#C8C8C8',
		textAlign:'left',
		flex:1
	},
	date: {
		fontSize:12,
		color:'#C8C8C8',
		textAlign:'right',
		flex:1
	},
	title:{
		marginTop:12,
		fontSize:16
	}
});

module.exports = ProductCell;