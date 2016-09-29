import React, {
    Component
} from 'react';
import {
	Navigator,
	View
} from 'react-native';

export default class Navigation extends Component {
	constructor(props) {
        super(props);
        this.state = {
            component: this.props.component,
        };
    }
	render (){
		return (
			<Navigator 
				initialRoute={{name:'', component: this.state.component, index:0}}
				configureScene={(route)=>{return Navigator.SceneConfigs.PushFromRight;}}
				renderScene={(route, navigator)=>{
					let Component = route.component;
					return (
						<View style={{flex:1}}>
							<Component navigator={navigator} route={route} {...route.passProps}/>
						</View>
					);
				}}/>
		);
	}
};