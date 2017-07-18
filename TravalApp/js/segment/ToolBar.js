import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

class ToolButton extends Component {
	render() {
		return (
			<View style={ToolButtonStyles.container}>
				<TouchableOpacity>
					<Image
						source = {{uri:this.props.pic}}
						style = {ToolButtonStyles.image}
					/>				
				</TouchableOpacity>
				<Text style={ToolButtonStyles.title}>{this.props.title}</Text>
			</View>
		);
	}
}

var ToolButtonStyles = StyleSheet.create({
	container:{
		alignItems:'center',
		flex:1,
		flexDirection:'column',
		justifyContent:'center'
	},
	image:{
		width:48,
		height:48
	},
	title:{
		fontSize:16,
		marginTop:8
	}
});

class ToolBar extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	_renderButton() {
		var dataSource = this.props.dataSource || [''];
		var result =  dataSource.map((data, i)=>{
			return (
				<ToolButton title={data.title}
					pic= {data.pic}
					key = {i}
					url = {data.url}
				/>
			);
		})
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
		backgroundColor:'white',
		paddingTop:10,
		paddingBottom:10,
		flexDirection:'row'
	},
	flex:{
		flex:1
	}
});

module.exports = ToolBar;