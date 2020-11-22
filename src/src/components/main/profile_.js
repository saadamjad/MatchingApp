import React, {Component} from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import {Header} from '../common';

export default class ProfileCmp extends Component {

	render() {
		return(
			<SafeAreaView style={{flex:1}}>
        <Header name={'Find Match'} navigation={this.props.navigation} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text>ProfileCmp!</Text>
					<Text>Hello ProfileCmp</Text>
				</View>
      </SafeAreaView>
		)
	}
}