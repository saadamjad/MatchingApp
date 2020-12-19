import React, {Component} from 'react';
import {View, Text, SafeAreaView, Dimensions} from 'react-native';
import {Header} from '../common';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
export default class resetPasswordCmp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        {/* <Header name={'Reset Password'} navigation={this.props.navigation} /> */}
        <Header
          name={'Reset Password'}
          navigation={props.navigation}
          // search={true}
        />
        <View style={styles.cont}>
          <View style={styles.cPasswordView}>
            <Text style={styles.cPassTxt}>Current Password</Text>
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="#000"
              style={styles.inputFld}
            />
          </View>
          <View style={styles.cPasswordView}>
            <Text style={styles.cPassTxt}>New Password</Text>
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="#000"
              style={styles.inputFld}
            />
          </View>
          <View style={styles.cPasswordView}>
            <Text style={styles.cPassTxt}>Confirm New Password</Text>
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="#000"
              style={styles.inputFld}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#ff1822',
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                UPDATE PASSWORD
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = {
  cont: {flex: 1, padding: 10},
  cPasswordView: {marginBottom: 10},
  cPassTxt: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#242424',
    marginLeft: 10,
  },
  inputFld: {
    marginLeft: 10,
    color: '#242424',
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#242424',
  },
};
