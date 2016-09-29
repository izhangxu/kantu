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
    TouchableOpacity,
    ScrollView,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';

import Search from '../common/search';
import Footer from '../common/footer';
import SetList from '../common/setList';
import PhotoList from './photo_list';
import CameraView from '../common/camera';
import Util from '../common/util';

const photoParams = {
    first: 999,
    // groupTypes: 'Album',
    assetType: 'All'
};
const {
    width,
    height
} = Util.size;

export default class Main extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            photos: [],
            searchStatus: 0,
            showSetList: 0,
            barText: ['search', 'camera', 'set'],
            dataSource: ds.cloneWithRows([
                '关于', '设置', '排序'
            ])
        };
        this._onPress = this._onPress.bind(this);
        this._toPhotoList = this._toPhotoList.bind(this);
    }

    componentDidMount() {
        let self = this,
            photos = [],
            m = {};
        CameraRoll.getPhotos(photoParams)
            .then(function(data) {
                AsyncStorage.setItem('photos', JSON.stringify(data), function(err){
                    if (err) {
                        Alert.alert('提示', '图片存储失败', [{
                            text: '确定',
                            onPress: () => console.log('ok')
                        }]);
                    }
                });
                let {
                    edges
                } = data;
                for (var i = 0; i < edges.length; i++) {
                    let node = edges[i].node;
                    let name = node.group_name;
                    if (m[name]) {
                        m[name].len++;
                    } else {
                        m[name] = {
                            uri: node.image.uri,
                            group_name: node.group_name
                        };
                        m[name].len = 1;
                    }
                    photos.push(m);
                }
                let jsonData = photos[photos.length - 1];
                photos = [];
                for (var n in jsonData) {
                    photos.push(jsonData[n]);
                }
                self.setState({
                    photos: photos
                });
            })
            .catch(function() {
                Alert.alert('提示', '获取图片失败', [{
                    text: '确定',
                    onPress: () => console.log('ok')
                }]);
            });
    }

    _toPhotoList (f) {
        this.props.navigator.push({
            component: PhotoList,
            passProps: {
                folder: f
            }
        });
    }

    _onPress(val) {
        if (this.state.showSetList != 0) {
            return this.setState({
                showSetList: 0
            });
        }
        switch (val) {
            case 'search':
                this.setState({
                    searchStatus: 1
                });
                break;
            case 'camera':
                this.props.navigator.push({
                    component: CameraView
                });
                break;
            case 'set':
                let status = this.state.showSetList === 0 ? 1 : 0;
                this.setState({
                    showSetList: status
                });
                break;
        }
    }

    render() {
        var photos = this.state.photos || [],
            photosView = [];
        return (
            <View style={[styles.bg, styles.flex_1]}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.wrap}>
                        {photos.map(function(currentPhoto, i, photos){
                            return (
                                <TouchableHighlight style={styles.item} key={i} onPress={this._toPhotoList.bind(this, photos[i].group_name)}>
                                    <View>
                                        <Image resizeMode="cover" style={styles.imgHeight} source={{uri: photos[i] && photos[i].uri}}/>    
                                        <View style={[styles.textDisc, styles.center]}>
                                            <Text style={{color: '#fff'}} numberOfLines={1}>{photos[i] && photos[i].group_name + '(' + photos[i].len + ')'}</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            )
                        }.bind(this))}
                    </View>
                </ScrollView>
                <Footer data={this.state.barText} click={this._onPress}/>
                {this.state.showSetList == 0 ? null : <SetList hideView={()=>{this.setState({showSetList: 0})}} data={this.state.dataSource}/>}
                {this.state.searchStatus == 0 ? null : <Search onPress={()=>{this.setState({searchStatus: 0})}}/>}
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
        height: 160,
        width: width / 2 - 3,
        marginLeft: 1,
        marginRight: 1,
        marginBottom: 2,
    },
    imgHeight: {
        height: 160
    },
    textDisc: {
        height: 30,
        width: width / 2 - 3,
        backgroundColor: 'rgba(0,0,0,0.7)',
        position: 'absolute',
        bottom: 0
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        position: 'absolute',
        bottom: 40,
        right: 2,
        width: 230,
        backgroundColor: '#003333'
    }
});