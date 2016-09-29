import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Platform,
	ListView,
	Alert,
	BackAndroid,
	TouchableWithoutFeedback
} from 'react-native';
import Header from '../common/header';
import Search from '../common/search';
import Footer from '../common/footer';
import SetList from '../common/setList';
import Util from '../common/util';
import Swiper from '../common/swiper_fix';

const {
    width,
    height
} = Util.size;

export default class Slide extends Component {
	constructor (props){
		super(props);
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.state = {
			photos: this.props.photos,
			swiperAutoPlay: this.props.swiperAutoPlay == 0 ? false : true,
			swiperFirstIndex: this.props.swiperFirstIndex || 0,
			swiperCurrentIndex: this.props.swiperFirstIndex || 0,
			showHeader: 0,
			showSetList: 0,
			barText: ['slide', 'share', 'delete', 'set'],
			dataSource: ds.cloneWithRows([
				'详情', '编辑', '移动到', '重命名图片', '设为'
			])
		};
		this._onPress = this._onPress.bind(this);
		this.onBackAndroid = this.onBackAndroid.bind(this);
		this._stopAutoPlay = this._stopAutoPlay.bind(this);
		this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
	}

	componentWillMount() {
		if (Platform.OS === 'android') {
			BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
		}
	}
	componentWillUnmount() {
		if (Platform.OS === 'android') {
			BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
		}
	}

	onBackAndroid () {
		const nav = this.props.navigator;
		const routers = nav.getCurrentRoutes();
		if (routers.length > 1) {
			nav.pop();
			return true;
		}
		return false;
	}

	_onPress(val) {
		let p = this.state.photos;
		if (this.state.showSetList != 0) {
			return this.setState({
				showSetList: 0
			});
		}
		switch (val) {
			case 'slide':
				this.setState({
					swiperAutoPlay: true,
					showHeader:0
				});
				break;
			case 'delete':
				let	currentIndex = this.state.swiperCurrentIndex,
					tit = '确定要删除这张照片吗？',
					newArr = [];
				Alert.alert('提示', tit, [{
					text: '取消'
				},
				{
					text: '确定',
					onPress: () => {
						p.map(function(cur, i){
							if (i != currentIndex) {
								newArr.push(cur);
							}
						});
						this.setState({
							photos: newArr
						});
					}
				}]);
				break;
			case 'set':
				let status = this.state.showSetList === 0 ? 1 : 0;
				this.setState({
					showSetList: status
				});
				break;
		}
	}

	_stopAutoPlay(index) {
		let showHeaderStatus = this.state.showHeader == 0 ? 1 : 0;
		if (this.state.swiperAutoPlay) {
			this.setState({
				swiperAutoPlay: false,
				swiperFirstIndex: index
			});
		}
		this.setState({
			showHeader: showHeaderStatus
		});
	}

	_onMomentumScrollEnd (e, state, context){
		this.setState({
			swiperCurrentIndex: state.index
		});
	}

	render (){
		return (
			<View style={styles.flex_1}>
				<Swiper showsPagination={false} autoplay={this.state.swiperAutoPlay} index={this.state.swiperFirstIndex} onMomentumScrollEnd={this._onMomentumScrollEnd}>
					{this.state.photos.map(function(current, index, photos){
						let {w, h} = {w: current.width, h: current.height};
						let newH = width / (w / h);
						let styleImg = {width: width, height: newH};
						return (
							<TouchableWithoutFeedback key={index} onPress={this._stopAutoPlay.bind(this, index)}>
						        <Image resizeMode="contain" style={[styleImg, styles.slide]} source={{uri: current && current.uri}}/>
						    </TouchableWithoutFeedback>
						)
					}.bind(this))}
				</Swiper>
				{
					this.state.showHeader == 0 ? null : <Header
	                navigator={this.props.navigator}
	                initObj={{
	                    backName: '图片'
	                }}
	                HeaderStyle={{position: 'absolute',top: 0,zIndex: 11, width: width}}
	                />
	            }
	            {this.state.showSetList == 0 ? null : <SetList hideView={()=>{this.setState({showSetList: 0})}} data={this.state.dataSource}/>}
	            {this.state.showHeader == 0 ? null : <Footer data={this.state.barText} click={this._onPress}/>}
			</View>
		)
	}
};

const styles = StyleSheet.create({
	flex_1: {
		flex: 1,
	},
	slide: {
		flex: 1,
		backgroundColor: '#000',
		justifyContent: 'center'
	}
});