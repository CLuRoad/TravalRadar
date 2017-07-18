import React, {Component} from 'react';
import {
	View,
	Text,
	Button,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

class SelectBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: 0
		};
	}

	componentWillMount() {

	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.buttonsBg}>
					<TouchableOpacity style={{flex:1}} onPress={()=>this.setState({selectedIndex:0})}>
						<Text style={[styles.button, 
							{backgroundColor: this.state.selectedIndex==0? 'white' : '#45AFEA'},
							{color: this.state.selectedIndex==0? '#45AFEA':'white'}]}>雷达推荐</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{flex:1}} onPress={()=>this.setState({selectedIndex:1})}>
						<Text style={[styles.button, 
							{backgroundColor: this.state.selectedIndex==1? 'white' : '#45AFEA'},
							{color: this.state.selectedIndex==1? '#45AFEA':'white'}]}>旅行锦囊</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container:{
		height:45,
		backgroundColor:'#45AFEA'
	},
	buttonsBg:{
		flex:1,
		marginLeft:30,
		marginRight:30,
		marginBottom:5,
		flexDirection:'row',
		borderColor:'white',
		borderWidth:1
	},
	button:{
		flex:1,
		textAlign:'center',
		fontSize:14,
		lineHeight: 45
	},

});

module.exports = SelectBar;