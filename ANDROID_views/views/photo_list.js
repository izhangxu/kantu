import React, {
	Component
} from 'react';
import {
	AppRegistry,
	CameraRoll,
	Image,
	ListView,
	StyleSheet,
	View,
	Alert,
	Text,
	ScrollView,
	TouchableHighlight,
	AsyncStorage
} from 'react-native';
import Header from '../common/header';
import Search from '../common/search';
import Footer from '../common/footer';
import SetList from '../common/setList';
import Util from '../common/util';
import Slide from './slide';

const photoParams = {
	first: 999,
	assetType: 'All'
};
const {
	width,
	height
} = Util.size;

export default class PhotoList extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.state = {
			photos: [],
			photosSelectedIndex: [],
			folder: this.props.folder,
			showSetList: 0,
			showSlide: 0,
			barText: ['slide', 'select', 'set'],
			dataSource: ds.cloneWithRows([
				'重新命名文件夹', '排序'
			])
		};
		this._onPress = this._onPress.bind(this);
		this._goSlideView = this._goSlideView.bind(this);
		this._handlePhotos = this._handlePhotos.bind(this);
		this.__pushInArray = this._pushInArray.bind(this);
	}

	componentDidMount() {
		let self = this;
		AsyncStorage.getItem('photos', function(err, result){
			if (err) {
				CameraRoll.getPhotos(photoParams)
					.then(function(data) {
						self._handlePhotos(data);
						AsyncStorage.setItem('photos', JSON.stringify(data), function(err){});
					})
					.catch(function() {
						Alert.alert('提示', '获取图片失败', [{
							text: '确定',
							onPress: () => console.log('ok')
						}]);
					});
			} else {
				self._handlePhotos(JSON.parse(result));
			}
		});
	}

	_handlePhotos (data) {
		let {
			edges
		} = data;
		let m = {};
		for (var i = 0; i < edges.length; i++) {
			let node = edges[i].node;
			let name = node.group_name;
			if (m[name]) {
				m[name].push({
					uri: node.image.uri,
					group_name: node.group_name,
					width: node.image.width,
					height: node.image.height
				});
			} else {
				m[name] = [{
					uri: node.image.uri,
					group_name: node.group_name,
					width: node.image.width,
					height: node.image.height
				}];
			}
		}
		this.setState({
			photos: m[this.state.folder]
		});
	}

	_onPress(val) {
		let	p = this.state.photos || [];
		if (this.state.showSetList != 0) {
			return this.setState({
				showSetList: 0
			});
		}
		switch (val) {
			case 'slide':
				this.props.navigator.push({
		            component: Slide,
		            passProps: {
		                photos: p
		            }
		        });
				break;
			case 'select':
				break;
			case 'delete':
				let	selectedIndex = this.state.photosSelectedIndex,
					count = selectedIndex.length,
					tit = '确定要删除这 ' + count + ' 张照片吗？',
					newArr = [];
				Alert.alert('提示', tit, [{
					text: '取消'
				},
				{
					text: '确定',
					onPress: () => {
						p.map(function(cur, i){
							if (!Util.inArray(i, selectedIndex)) {
								newArr.push(cur);
							}
						});
						this.setState({
							photos: newArr,
							photosSelectedIndex: []
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

	_goSlideView (p, i, pic){
		let arr = this.state.photosSelectedIndex,
			newArr = [];
		if (Util.inArray(i, arr)) {
			arr.map(function(cur, index, arr){
				if (cur != i) {
					newArr.push(cur);
				}
			});
			if (!newArr.length) {
				this.setState({
					barText: ['slide', 'select', 'set']
				});
			}
			return this.setState({
				photosSelectedIndex: newArr
			});
		}
		this.props.navigator.push({
            component: Slide,
            passProps: {
                photos: p,
                swiperFirstIndex: i,
                swiperAutoPlay: 0,
                pic: pic
            }
        });
	}

	_pushInArray(index){
		let arr = this.state.photosSelectedIndex;
		if (!Util.inArray(index, arr)) {
			arr.push(index);
		}
		this.setState({
			photosSelectedIndex: arr,
			barText: ['share', 'delete', 'set']
		});
	}

	render() {
		let folder = this.state.folder,
			photos = this.state.photos || [],
			photosSelectedIndex = this.state.photosSelectedIndex;
		return (
			<View style={[styles.bg, styles.flex_1]}>
				<Header
                navigator={this.props.navigator}
                initObj={{
                    backName: folder + '(' + photos.length + ')',
                    title: photosSelectedIndex.length ? '选中 ' + photosSelectedIndex.length : ''
                }}/>
                <ScrollView>
                    <View style={styles.wrap}>
                        {photos.map(function(currentPhoto, i, photos){
                            return (
                                <TouchableHighlight style={styles.item} key={i} onPress={this._goSlideView.bind(this, photos, i, photos[i])} onLongPress={this._pushInArray.bind(this, i)}>
                                    <View>
                                        <Image resizeMode="cover" style={styles.imgHeight} source={{uri: photos[i] && photos[i].uri}}/>    
                                        {!Util.inArray(i, this.state.photosSelectedIndex) ? null : <Image source={require('../../images/selected.png')} style={styles.item_selected}/>}
                                    </View>
                                </TouchableHighlight>
                            )
                        }.bind(this))}
                    </View>
                </ScrollView>
                <Footer data={this.state.barText} click={this._onPress}/>
                {this.state.showSetList == 0 ? null : <SetList hideView={()=>{this.setState({showSetList: 0})}} data={this.state.dataSource}/>}
            </View>
		);
	}
};

const styles = StyleSheet.create({
	bg: {
		width: width,
		backgroundColor: '#000',
	},
	flex_1: {
		flex: 1
	},
	wrap: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		marginLeft: 1
	},
	item: {
		height: 120,
		width: width / 3 - 4,
		marginLeft: 1,
		marginBottom: 1
	},
	imgHeight: {
		height: 120
	},
	item_selected: {
		height: 30,
        width: 30,
        position: 'absolute',
        bottom: 0,
        right: 0
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});