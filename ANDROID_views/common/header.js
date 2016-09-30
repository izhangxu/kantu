import React, {
	Component
} from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native';

import Util from './util';
import LeftIcon from './left_icon';
const {
    width,
    height
} = Util.size;
export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this._pop = this._pop.bind(this);
	}
	render() {
		let obj = this.props.initObj,
			HeaderStyle = this.props.HeaderStyle;
		return (
			<View style={[styles.header, styles.row, HeaderStyle]}>
				<TouchableOpacity style={[styles.row, styles.center]} onPress={this._pop}>
					<LeftIcon/>
					<Text style={styles.fontFFF}>{obj.backName}</Text>
				</TouchableOpacity>
				<View style={[styles.title]}>
					<Text style={[styles.fontFFF, styles.titlePos]} numberOfLines={1}>{obj.title}</Text>
				</View>
			</View>
		);
	}

	_pop() {
		this.props.navigator.pop();
	}
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row'
	},
	header: {
		height: 50,
		backgroundColor: 'rgba(0,0,0,0.8)',
	},
	fontFFF: {
		color: '#fff',
		fontSize: 17,
		fontWeight: 'bold'
	},
	title: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	titlePos: {
		marginRight: 20	
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});