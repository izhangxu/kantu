import React, {
	Component
} from 'react';
import {
	ActivityIndicator,
	Dimensions,
	PixelRatio
} from 'react-native';

let Util = {
	pixel: 1 / PixelRatio.get(),

	size: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	},

	get: function(url, successCallback, failCallback) {
		fetch(url)
			.then((response) => response.text())
			.then((responseText) => {
				successCallback(JSON.parse(responseText));
			})
			.catch(function(err) {
				failCallback(err);
			});
	},

	inArray: function(cur, array) {
		if (!array.length) return false;
		for (var i = 0; i < array.length; i++) {
			if (cur === array[i]) {
				return true;
			}
		}
		return false;
	},

	loading: <ActivityIndicator  color="#3e00ff" style={{marginTop: 40}}/>
};

module.exports = Util;