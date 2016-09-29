import React, {
	Component
} from 'react';
import {
	AppRegistry,
	ListView,
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native';

import Util from './util';
const {
    width,
    height
} = Util.size;

export default class SetView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: this.props.data
		};
	}

	render() {
		return (
            <TouchableOpacity style={styles.wrap} activeOpacity={1} onPress={this.props.hideView}>
                <ListView style={styles.list}
                  dataSource={this.state.dataSource}
                  renderRow={(rowData) => <TouchableOpacity style={styles.item}><Text style={styles.tex}>{rowData}</Text></TouchableOpacity>}
                />
            </TouchableOpacity>
		);
	}
};

const styles = StyleSheet.create({
	list: {
		position: 'absolute',
		zIndex: 99,
		width: 230,
		bottom:0,
		right:2,
		backgroundColor: '#003333'
	},
	item: {
		flex: 1,
		paddingLeft: 20,
	},
	wrap: {
		flex: 1,
		position: 'absolute',
		bottom: 40,
		top:0,
		right: 0,
		width: width,
		backgroundColor: 'rgba(0,0,0,0)'
	},
	tex: {
		color: '#fff',
		height: 40,
		textAlignVertical: 'center',
		fontSize: 18
	}
});