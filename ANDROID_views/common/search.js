import React, {
	Component
} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity
} from 'react-native';

import Util from './util';
const W = Util.size.width - 40;

export default class Search extends Component {
	/*父子组件通信，首先*/
	constructor(props) {
		super(props);
		this.state = {
			searchStatus: this.props.status
		};
		this._setSearch = this._setSearch.bind(this);
	}

	_setSearch(val) {
		this.setState({
			searchStatus: val
		});
	}

	render() {
		return (
    		<View style={styles.container}>
				<Text style={[styles.title]}>搜索</Text>
				<TextInput style={styles.input} autoFocus={true} onBlur={this.props.onPress}/>
				<View style={styles.btns}>
					<TouchableOpacity style={styles.button}>
						<Text style={{color:'#fff'}} onPress={this.props.onPress}>取消</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={{color:'#fff'}}>确定</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: W,
		zIndex: 9,
		height: 150,
		backgroundColor: '#003333',
		top: 0,
		left: 20
	},
	flex_1: {
		flex: 1,
	},
	title: {
		color: '#fff',
		fontSize: 18,
		marginLeft: 20,
		marginTop: 18,
	},
	input: {
		position: 'absolute',
		height: 39,
		width: W - 40,
		marginTop: 10,
		marginLeft: 20,
		color: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: '#fff',
	},
	btns: {
		flexDirection: 'row',
		height: 30,
		width: W / 3,
		marginTop: 60,
		position: 'absolute',
		right: 10,
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});