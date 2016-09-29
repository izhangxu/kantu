import React, {
    Component
} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image
} from 'react-native';
import Util from './util';

export default class LeftIcon extends Component{
	render (){
		return (
			<View>
				<Image source={require('../../images/arrow-left.png')} style={{width: 30, height: 30, marginLeft:10, marginRight: 30}}/>
			</View>
		);
	}
};
