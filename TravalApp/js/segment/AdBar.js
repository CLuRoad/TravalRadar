import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

class AdButton extends Component {
	render() {
		return (
			<View style={adButtonStyles.container}>
				<View style={{flex:1}}>
					<Text numberOfLines={1} style={adButtonStyles.title}>{this.props.title}</Text>
					<Text numberOfLines={1} style={adButtonStyles.detail}>{this.props.desc}</Text>
				</View>
				<View style={adButtonStyles.imageBg}>
					<Image
						source = {{uri:this.props.pic}}
						style={adButtonStyles.image}
					/>
				</View>
			</View>
		);
	}
}

var adButtonStyles = StyleSheet.create({
	container:{
		backgroundColor:'white',
		height:58,
		flexDirection:'row',
		marginTop:1,
		marginRight:1,
		flex:1
	},
	imageBg:{
		marginRight:12,
		justifyContent:'center',
	},
	image:{
		width:34,
		height:34
	},
	title:{
		fontSize:16,
		marginTop:12,
		marginLeft:12
	},
	detail:{
		fontSize: 11,
		marginTop:8,
		marginLeft:12,
		color:'#9B9B9B'
	}
});

class AdBar extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	_renderButton() {
		var dataSource = this.props.dataSource || [''];
		var result = [];

		var rowItem = [];
		for (var i = 0; i< dataSource.length; i++) {
			var data = dataSource[i];

			rowItem.push(
				<AdButton title={data.title}
					pic= {data.pic}
					key = {i}
					url = {data.url}
					desc = {data.desc}
				/>
			);

			if (i%2==1) {
				result.push(
					<View style={styles.rowItem} key={i}>
						{rowItem}
					</View>
				);

				rowItem = [];
			}
		}
		return result;

	}

	render() {
		return (
			<View style={styles.container}>
				{this._renderButton()}
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container:{
		flexDirection:'column',
		marginTop:10,
		marginRight:-1
	},
	rowItem:{
		flexDirection:'row',
	},
	flex:{
		flex:1
	}
});

module.exports = AdBar;