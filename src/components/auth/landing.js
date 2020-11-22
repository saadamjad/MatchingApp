import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class LandingCmp extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return(
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Main')}>
        <Text>Hello LandingCmp</Text>
      </TouchableOpacity>
    )
  }
}