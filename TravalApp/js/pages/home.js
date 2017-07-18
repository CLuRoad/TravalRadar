import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	ListView,
	RefreshControl,
	NativeModules,
	Button,
	TouchableOpacity
} from 'react-native';

import SelectBar from '../segment/SelectBar'
import ToolBar from '../segment/ToolBar'
import AdBar from '../segment/AdBar'
import ProductCell from '../segment/ProductCell'

var _adData = require('../../source/ad.json');
var _productData = require('../../source/travalData.json');

function _selectCity(city) {
	alert('敬请期待');
}

function _alertDeviceInfo() {
	var deviceInfoMgr = NativeModules.DeviceInfoManager;
	deviceInfoMgr.getDeviceInfo;

	deviceInfoMgr.finishBlock((error, deviceInfo) => {
		if (error) {
			console.error(error);	
		} else {
			alert(deviceInfo);
		}
	});
}

class Homepage extends Component {

	static navigationOptions = {
	    headerTitle: `旅行雷达`,
		tabBarLabel:'首页',
		tabBarIcon: ({tintColor}) => (
			<Image
				source = {require('../../source/img/shequ@2x.png')}
				style = {{width:26,height:26,tintColor:tintColor}}
			/>
		),
		headerRight: (<Button
      		title="出发城市"
      		onPress={_selectCity.bind(this,'朝阳')}
      		color= 'white'
      	/>),
        headerLeft: (
      	<TouchableOpacity onPress={_alertDeviceInfo.bind(this)}>
	      	<Image
	      		source={require('../../source/img/shequ@2x.png')}
	      		style= {{tintColor: 'white',marginLeft: 12}}
	      		onPress={()=>{alert('敬请期待')}}
	      	/>
        </TouchableOpacity>)
	}

	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		  this.state = {
		    dataSource: ds.cloneWithRows(_productData.Variables.data),
		    isRefreshing: false
		  };

	}

	componentWillMount() {


	}

	_renderProductCell() {
		var dataSource = _productData.Variables.data || [];
		var result = dataSource.map((data,i)=>(
			<ProductCell
				author = {data.author}
				id = {data.id}
				image = {data.image}
				pubdate = {data.pubdate}
				title = {data.title}
				url = {data.url}
				key = {i}
			/>
		));
		return result;
	}

	_onRefresh() {

	}

	_pushToDetailWithUrl(url) {
		const { navigate } = this.props.navigation;
		navigate('Detail',{url:url});
	}

	render() {

		return (
			<View style={styles.container}>
				<SelectBar/>
				<ScrollView 
					refreshControl = {
						<RefreshControl
							refreshing = {this.state.isRefreshing}
							onRefresh = {this._onRefresh}
							tintColor = "#1e1e1e"
							title = "松开立即刷新"
							titleColor = "#1e1e1e"
							progressBackgroundColor = '#ffff00'
						/>
					}
				>
					<ToolBar dataSource={_adData.Variables.myhome.func.link}/>
					<AdBar 
						dataSource={_adData.Variables.myhome.func.forum}
						onPress = {
							(url)=>{
								this._pushToDetailWithUrl.bind(this,url)
							}
						}
					/>
					<ListView
						dataSource = {this.state.dataSource}
						renderRow = {
							(rowData,i) => 
								<ProductCell
									author = {rowData.author}
									id = {rowData.id}
									image = {rowData.image}
									pubdate = {rowData.pubdate}
									title = {rowData.title}
									url = {rowData.url}
									key = {i}
									onPress = {this._pushToDetailWithUrl.bind(this,rowData.url)}
								/>
							
						}
					/>
				</ScrollView>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container:{
		flex:1,
	},
	headerLeft: {
		tintColor: 'white',
		marginLeft: 12
	}
});

module.exports = Homepage;