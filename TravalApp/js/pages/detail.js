import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	WebView,
	StyleSheet
} from 'react-native';

class DetailPage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			title: ''
		};
	}

	static navigationOptions = ({navigation}) => ({
		title: navigation.state.params.title
	});

	componentWillMount() {

	}

	render() {
		var self = this;
		return (
			<View style={styles.container}>
				<WebView
					ref = {'https://www.baidu.com'}
					style = {styles.webView}
					source = {{uri:this.props.navigation.state.params.url}}
					onLoad = {(params)=>{
						self.props.navigation.setParams({
							title:params.nativeEvent.title
						});
					}}
				/>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1
	},
	webView: {
		flex:1
	}
});

module.exports = DetailPage;