import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const {
    width,
    height
} = Dimensions.get('window');
const SLIDE = require('../../images/slide.png');
const SEARCH = require('../../images/search.png');
const CAMERA = require('../../images/camera.png');
const SET = require('../../images/set.png');
const SELECT = require('../../images/select.png');
const SHARE = require('../../images/share.png');
const DELETE = require('../../images/delete.png');

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _setPic(name) {
        switch (name) {
            case 'search':
                uri = SEARCH;
                break;
            case 'set':
                uri = SET;
                break;
            case 'camera':
                uri = CAMERA;
                break;
            case 'slide':
                uri = SLIDE;
                break;
            case 'select':
                uri = SELECT;
                break;
            case 'share':
                uri = SHARE;
                break;
            case 'delete':
                uri = DELETE;
                break;
        }
        return uri;
    }

    render() {
        let list = this.props.data,
            uri = null;
            // alert(list)
        return (
            <View style={styles.wrap}>
                <View style={styles.footer}>
	                {list.map(function(current, index, list){
	                	return (
	                		<TouchableOpacity style={styles.touch} key={index} onPress={this.props.click.bind(this, current)}>
                        		<Image source={this._setPic(current)} style={{height: 30, width: 30}} />
                   	 		</TouchableOpacity>
	                	)
	                }.bind(this))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        width: width,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        bottom: 0,
        paddingTop: 5
    },
    footer: {
        flexDirection: 'row',
    },
    touch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});