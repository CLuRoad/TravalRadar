import React, {Component, PropTypes} from 'react';
import {
	View,
	Text,
	Image,
	requireNativeComponent,
	StyleSheet,
} from 'react-native';

var PhotoBrowser = requireNativeComponent('PhotoBrowserView', null);
PhotoBrowser.propTypes = {
    /**
    * 属性类型，其实不写也可以，js会自动转换类型
    */
    autoScrollTimeInterval: PropTypes.number,
    imageURLStringsGroup: PropTypes.array,
    autoScroll: PropTypes.bool,

    onClickBanner: PropTypes.func
};

class Box extends Component {

	

	static navigationOptions = {
		tabBarLabel:'宝箱',
		headerTitle:'轻松片刻',
		tabBarIcon: ({tintColor}) => (
			<Image
				source = {require('../../source/img/sousuo@2x.png')}
				style = {{width:26,height:26,tintColor:tintColor}}
			/>
		)
	}

	constructor(props) {
		super(props);
		this.state = {
			imageUrlArry:["http://p0.so.qhimgs1.com/t015f5f08ed49f4e1a0.jpg",
                                              "http://p0.so.qhimgs1.com/t0137b9cd0efd645450.jpg",
                                              "http://p0.so.qhimgs1.com/t0137b9cd0efd645450.jpg"]
		};
	}


	_requestImageData() {
		var url = 'http://image.baidu.com/channel/listjson?pn=0&rn=50&tag1=美女&tag2=全部&ie=utf8&width=750'
		fetch(url,{
			method:'GET'
		})//请求URL、请求选项
		.then((response) => response.json()) //把response转为json
        .then((responseData) => { // 上面的转好的json
            var data = responseData.data || [];
            var imageArr = data.map((obj)=>(obj.image_url));

            this.setState({
            	imageUrlArry: imageArr
            });


        })
		.catch(err => { //请求出错
		//do somthing
		});
	}
	componentDidMount() {
		this._requestImageData();
	}

	render() {
		return (
			<View style={styles.container}>
				<PhotoBrowser
					style={styles.photoBrowser}
					imageURLStringsGroup={this.state.imageUrlArry}
				/>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container:{
		flex:1
	},
	photoBrowser: {
		flex:1
	}

});


module.exports = Box;