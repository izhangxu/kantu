import React, {
	Component
} from 'react';
import {
	AppRegistry
} from 'react-native';
import Navigation from './ANDROID_views/common/navigation';
import MainView from './ANDROID_views/views/main';

var kantu = React.createClass({
	render: function() {
		return (
			<Navigation component={MainView}/>
		);
	}
});

AppRegistry.registerComponent('kantu', () => kantu);