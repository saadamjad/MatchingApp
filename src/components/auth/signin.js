import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
  TextInput,
  Image,
  AsyncStorage,
} from 'react-native';

import {EventRegister} from 'react-native-event-listeners';
import CountryPicker from 'react-native-country-picker-modal';
import {colors, images} from '../../constants/theme';

import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from 'react-native-dialog';
import Toast from 'react-native-toast-message';

const {height: deviceHeight, width: deviceWidth} = Dimensions.get('screen');
export default class SigninCmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmaiForm: true,
      cca2: 'PK',
      phone: '',
      email: 'saad@gmail.com',
      password: '12345678',
      type: 'email',
      showSpinner: false,
      showAlert: false,
      errorMsg: '',
      errorTitle: '',
    };
  }

  handleCancel() {
    this.setState({showAlert: false});
  }

  async checkValidation() {
    console.log('type: ', this.state.type);
    if (this.state.type == 'phone') {
      if (this.state.phone == '') {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Phone number field cannot be empty.',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          onShow: () => {},
          onHide: () => {},
        });
        return false;
      }
    } else {
      if (this.state.email == '') {
        console.log('email: ', this.state.email);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Email field cannot be empty.',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          onShow: () => {},
          onHide: () => {},
        });
        return false;
      }
    }

    if (this.state.password == '') {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Password field cannot be empty.',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
      });
      return false;
    } else return true;
  }
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('checkUserLoggedin', 'login');
    } catch (error) {}
  };

  signin = async () => {
    const validation = await this.checkValidation();
    console.log(validation);
    if (validation) {
      this.setState({showSpinner: true});
      const data = {
        phone: this.state.phone,
        email: this.state.email,
        password: this.state.password,
        type: this.state.type,
      };
      axios
        .post('https://api.matchelitemuslim.com/api/login-post', data)
        .then(async res => {
          this.setState({showSpinner: false});
          console.log(res.data);
          if (res.data.status) {
            const user = await AsyncStorage.setItem(
              'userData',
              JSON.stringify(res.data),
            );

            const user_type = await AsyncStorage.setItem(
              'user_type',
              res.data.user.user_type,
            );
            this.props.navigation.navigate('SideMenuNavigator');

            AsyncStorage.setItem('checkUserLoggedin', 'login');
          } else
            this.setState({
              showAlert: true,
              errorMsg: res.data.message,
              errorTitle: 'Error!!',
            });
        })
        .catch(error => {
          this.setState({showSpinner: false});
          console.log('error', error);
          this.setState({
            showAlert: true,
            errorMsg: 'Something went wrong. ' + error,
            errorTitle: 'Error!!',
          });
        });
    }
  };

  render() {
    return (
      <View style={styles.viewStyles}>
        <ImageBackground
          source={images.loginBg}
          resizeMode="cover"
          style={styles.imageView}>
          <View style={styles.loginView}>
            <View style={styles.loginTxtView}>
              <Text style={styles.loginHeading}>Login</Text>
              <Text style={styles.loginSubHeading}>
                Log in to see who’s new in {'\n'} your area!
              </Text>
            </View>
            <View style={styles.loginFormView}>
              {this.state.isEmaiForm == true ? (
                <View style={[styles.inputFldView, styles.mb2]}>
                  <Image source={images.emailIcon} />
                  <TextInput
                    placeholder="Email"
                    value={this.state.email}
                    placeholderTextColor="#fff"
                    keyboardType="email-address"
                    style={styles.inputFld}
                    onChangeText={text =>
                      this.setState({email: text}, console.log('email', text))
                    }
                  />
                </View>
              ) : (
                <View style={[styles.inputFldView, styles.mb2]}>
                  <CountryPicker
                    withAlphaFilter={true}
                    withCallingCode={true}
                    withFilter={true}
                    countryCode={this.state.cca2}
                    onSelect={value => {
                      this.setState({
                        cca2: value.cca2,
                      });
                    }}
                    cca2={this.state.cca2}
                    translation="eng"
                  />
                  <TextInput
                    keyboardType="phone-pad"
                    placeholder="Phone"
                    value={this.state.phone}
                    placeholderTextColor="#fff"
                    style={styles.inputFld}
                    onChangeText={text =>
                      this.setState({phone: text}, console.log('phone', text))
                    }
                  />
                </View>
              )}
              <View style={styles.inputFldView}>
                <Image source={images.passwordIcon} />
                <TextInput
                  secureTextEntry
                  placeholder="Password"
                  value={this.state.password}
                  placeholderTextColor="#fff"
                  style={styles.inputFld}
                  onChangeText={text =>
                    this.setState(
                      {password: text},

                      console.log('password', text),
                    )
                  }
                />
              </View>
              {/* <View>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#fff"
                  style={styles.inputFld}                 
                />
              </View> */}
              <View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('updatepassword')
                  }>
                  <Text style={[styles.forgotPswd, styles.mb2]}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={this.signin}
                  // onPress={() =>
                  //   this.props.navigation.navigate('SideMenuNavigator')
                  // }
                >
                  <Text style={styles.loginBtnTxt}>Login</Text>
                </TouchableOpacity>
              </View>
              {/* <View>
                {
                  this.state.isEmaiForm == true ? 
                    <TouchableOpacity onPress={()=>{ this.setState({ isEmaiForm:false, type:'phone' }) }}>
                      <Text style={[styles.registerWith, styles.mb2 ]}>Login with phone number</Text>
                    </TouchableOpacity> : 
                    <TouchableOpacity onPress={()=>{ this.setState({ isEmaiForm:true, type:'email' }) }}>
                      <Text style={[styles.registerWith, styles.mb2 ]}>Login with Email</Text>
                    </TouchableOpacity>
                }
              </View> */}
            </View>
            <View style={styles.otherLoginView}>
              <View style={styles.orLoginView}>
                <View style={styles.loginSeparator} />
                <View style={styles.orLoginTextView}>
                  <Text style={styles.orlogintxt}>Or Login With</Text>
                </View>
                <View style={styles.loginSeparator} />
              </View>
              <View style={styles.socialLoginView}>
                <TouchableOpacity style={styles.fbView}>
                  <Image source={images.fbIcon} style={styles.fbImg} />
                  <Text style={styles.socialColor}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.googleView}>
                  <Image source={images.googleIcon} style={styles.googleImg} />
                  <Text style={styles.socialColor}>Google</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
        <StatusBar translucent backgroundColor="transparent" />

        <View style={styles.horizontal}>
          <Spinner
            textContent={'Loading...'}
            animation="fade"
            textStyle={styles.spinnerTextStyle}
            visible={this.state.showSpinner}
          />
        </View>
        <Dialog.Container visible={this.state.showAlert}>
          <Dialog.Title>{this.state.errorTitle}</Dialog.Title>
          <Dialog.Description>{this.state.errorMsg}</Dialog.Description>
          <Dialog.Button
            color="#58c4b7"
            bold
            label="Okay"
            onPress={this.handleCancel.bind(this)}
          />
        </Dialog.Container>

        <Toast ref={ref => Toast.setRef(ref)} />
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c3e0e3',
  },
  imageView: {
    height: deviceHeight,
    width: deviceWidth,
  },
  loginView: {
    flex: 1,
    // justifyContent:'center',
    // alignItems:'center',
    backgroundColor: 'rgba(255,24,34,0.31)',
    paddingHorizontal: 30,
  },
  loginTxtView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginHeading: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  loginSubHeading: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1,
  },
  inputFldView: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputFld: {
    marginLeft: 10,
    color: '#fff',
    width: deviceWidth - 130,
  },
  mb2: {
    marginBottom: 15,
  },
  forgotPswd: {
    marginTop: 10,
    textAlign: 'right',
    color: '#fff',
    textDecorationLine: 'underline',
  },
  loginBtn: {
    width: deviceWidth - 60,
    backgroundColor: '#ff1822',
    padding: 10,
    borderRadius: 30,
  },
  registerWith: {
    marginTop: 15,
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    textDecorationLine: 'underline',
  },
  loginBtnTxt: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
  },
  otherLoginView: {
    flex: 1,
  },
  orLoginView: {
    flex: 0.5,
    flexDirection: 'row',
    marginTop: 20,
  },
  loginSeparator: {
    flex: 1,
    backgroundColor: '#fff',
    height: 1,
    marginTop: 10,
    marginHorizontal: 10,
  },
  // orLoginTextView:{
  //   marginTop:10,
  // },
  orlogintxt: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    // marginTop:10,
  },
  socialLoginView: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fbView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3145b6',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  fbImg: {
    width: 12,
    height: 20,
  },
  googleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#242424',
    padding: 10,
    borderRadius: 20,
  },
  googleImg: {
    width: 20,
    height: 20,
  },
  socialColor: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 10,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  horizontal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
};
