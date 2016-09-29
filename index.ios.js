import React, { Component } from 'react';

import {
    AppRegistry,
    CameraRoll,
    Image,
    ListView,
    StyleSheet,
    View,
    Alert,
    Text,
    ScrollView
} from 'react-native';

var photoParams = {
    first: 4,
    groupTypes: 'All',
    assetType: 'Photos'
};

var kantu = React.createClass({
    getInitialState: function(){
        return {
            photos: null
        };
    },

    componentWillMount: function(){
        var self = this,
            edges, photos=[];
        CameraRoll.getPhotos(photoParams, function(data){
            console.log(data);
            edges = data.edges;
            for (var name in edges) {
                photos.push(edges[i].node.image.uri);
            }
            self.setState({
                photos: photos
            });
        }, function(){
            Alert.alert('提示', '获取图片失败', [
                {
                    text: '确定', 
                    onPress: () => console.log('ok')
                }
            ]);
        });
    },

    render: function(){
        var photos = this.state.photos || [],
            photosView = [];
        for (var i = 0; i < 4; i += 2) {
            photosView.push(
                <View style={styles.row}>
                    <View style={styles.flex_1}>
                        <Image resizeMode="stretch" style={[styles.imgHeight, styles.m5]} source={{uri: photos[i]}}/>
                    </View>
                    <View style={styles.flex_1}>
                        <Image resizeMode="stretch" style={[styles.imgHeight, styles.m5]} source={{uri: photos[parseInt(i) + i]}}/>
                    </View>
                </View>
            );
        }
        return (
            <ScrollView>
                <View style={[{marginTop: 20}]}>
                    {photosView}
                </View>
            </ScrollView>
        );
    }
});

var styles = StyleSheet.create({
    flex_1: {
        flex: 1
    },
    m5: {
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1,
        borderColor:'#ddd'
    },
    row: {
        flexDirection: 'row'
    },
    imgHeight: {
        height: 120
    }
});

AppRegistry.registerComponent('kantu', () => kantu);
