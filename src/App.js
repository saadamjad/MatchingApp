import React from 'react';

import {SafeAreaView, AsyncStorage, View} from 'react-native';
import Stacknavigation from './stacknavigation';
import Splash from './components/splash';
export default class App extends React.Component {
  state = {
    timer: true,
  };
  componentDidMount() {
    this._Checking();
  }

  _Checking = () => {
    setTimeout(() => {
      this.setState({
        timer: false,
      });
    }, 3000);
  };
  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.timer ? (
          <Splash />
        ) : (
          <Stacknavigation navigation {...this.props} />
        )}
      </View>
    );
  }
}
