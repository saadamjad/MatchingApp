import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  CheckBox,
  Picker,
  ScrollView,
  BackHandler,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {colors, images} from '../../constants/theme';

import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from 'react-native-dialog';
import Toast from 'react-native-toast-message';
import CountryPicker from 'react-native-country-picker-modal';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Header} from '../common';

import {EventRegister} from 'react-native-event-listeners';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMale, faFemale} from '@fortawesome/free-solid-svg-icons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {height: deviceHeight, width: deviceWidth} = Dimensions.get('screen');
export default class SignupCmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      isEmaiForm: true,
      country: '',
      state: '',
      city: '',
      gender: 'm',
      cca2: 'PK',
      email: '',
      code: '',
      filledCode: '',
    };
    // this.handleBackButton = this.handleBackButton.bind(this);
  }

  updateCountry = country => {
    console.log('this.state.country', this.state.country);
    this.setState({country});
  };
  updateState = state => {
    this.setState({state});
  };
  updateCity = city => {
    this.setState({city});
  };

  componentDidMount() {
    console.log(this.state.step);
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  // handleBackButton() {
  //   console.log('before: ', this.state.step);
  //   if (this.state.step != 0)
  //     this.setState({
  //       step: this.state.step - 1,
  //     });
  //   else this.props.navigation.pop();

  //   return true;
  // }

  _Signup = () => {
    // this.setState({showSpinner: true});

    console.log('signup');
    let email = this.state.email;
    let data = {
      email: this.state.email,
      type: 'email',
      country_code: '+92',
    };
    axios
      .post('https://api.matchelitemuslim.com/api/register-stepone', data)
      .then(async res => {
        // this.setState({showSpinner: false});
        console.log('res', res.data);
        if (res.data.status) {
          this.setState({code: res.data.code, step: 1});
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
  };

  header() {
    return (
      <View style={styles.headerView}>
        <View style={styles.getStartedView}>
          <TouchableOpacity
            onPress={() => {
              this.setState({step: 0});
            }}
            style={
              this.state.step == 0
                ? styles.selectedCircle
                : styles.notSelectedCircle
            }
            activeOpacity={0.8}>
            <Text
              style={
                this.state.step == 0
                  ? styles.selectedTxt
                  : styles.notSelectedTxt
              }>
              1
            </Text>
          </TouchableOpacity>
          <Text style={styles.headerLabel}>Get Started</Text>
        </View>

        <View style={styles.verificationView}>
          <TouchableOpacity
            onPress={() => {
              this.setState({step: 1});
            }}
            style={
              this.state.step == 1
                ? styles.selectedCircle
                : styles.notSelectedCircle
            }
            activeOpacity={0.8}>
            <Text
              style={
                this.state.step == 1
                  ? styles.selectedTxt
                  : styles.notSelectedTxt
              }>
              2
            </Text>
          </TouchableOpacity>
          <Text style={styles.headerLabel}>Verification</Text>
        </View>

        <View style={styles.signUpView}>
          <TouchableOpacity
            onPress={() => this.setState({step: 2})}
            style={
              this.state.step == 2
                ? styles.selectedCircle
                : styles.notSelectedCircle
            }
            activeOpacity={0.8}>
            <Text
              style={
                this.state.step == 2
                  ? styles.selectedTxt
                  : styles.notSelectedTxt
              }>
              3
            </Text>
          </TouchableOpacity>
          <Text style={styles.headerLabel}>Sign up</Text>
        </View>
      </View>
    );
  }

  getStarted() {
    if (this.state.step == 0) {
      return (
        <View style={styles.getStarted}>
          <View style={styles.EmailView}>
            <Text style={[styles.signUpLabel, styles.mb2]}>
              Sign Up With Email
            </Text>
            <View style={[styles.inputFldView, styles.mb1]}>
              <Image source={images.emailColorIcon} />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#000"
                keyboardType="email-address"
                style={styles.inputFld}
                onChangeText={text => this.setState({email: text})}
              />
            </View>
            <View style={styles.agreedView}>
              <CheckBox style={styles.checkbox} />
              <Text style={styles.agreedTxt}>
                I agree to the{' '}
                <Text style={styles.agreedtxtSelected}>Privacy Policy</Text> and{' '}
                <Text style={styles.agreedtxtSelected}>
                  Terms and Conditions.
                </Text>
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.signUpBtn}
                onPress={() => {
                  this.state.email == ''
                    ? alert('kindly enter Email')
                    : this._Signup();
                }}>
                <Text style={styles.signUpBtnTxt}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            {/* <View>
                  <TouchableOpacity onPress={()=>{ this.setState({ isEmaiForm:false }) }}>
                    <Text style={[styles.registerWith, styles.mb2 ]}>Register with phone number</Text>
                  </TouchableOpacity>
                </View> */}
          </View>
        </View>
      );
    }
  }

  verification() {
    if (this.state.step == 1) {
      return (
        <View style={styles.verification}>
          <View style={styles.verificationBox}>
            <Text style={styles.code}>Enter Code</Text>
            {/* <Text style={styles.code}> {this.state.code} </Text> */}
            <View style={{marginVertical: 25}}>
              <OTPInputView
                style={{height: 50, borderColor: colors.dark, borderRadius: 20}}
                pinCount={4}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code =>
                  this.setState({
                    filledCode: code,
                  })
                }
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.sendBtn}
                onPress={() => {
                  if (this.state.filledCode == this.state.code) {
                    this.setState({step: 2});
                  } else {
                    alert('code doesn"t Matched');
                  }
                }}>
                <Text style={styles.signUpBtnTxt}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={[styles.resend, styles.mb2]}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  signUp() {
    if (this.state.step == 2) {
      return (
        <View style={styles.signp}>
          <Text style={[styles.signUpLabel, {marginBottom: 5}]}>
            Accont Registration
          </Text>
          <Text style={[styles.signUpSubLabel]}>Meet Elite and Like</Text>
          <Text style={[styles.signUpSubLabel, {marginBottom: 15}]}>
            Minded Muslim Singles
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.inputFldView, styles.mb2]}>
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#000"
                style={styles.inputFld}
                onChangeText={text =>
                  this.setState(
                    {
                      firstName: text,
                    },
                    console.log('firstname', text),
                  )
                }
              />
            </View>
            <View style={styles.genderView}>
              <View>
                <Text>Select Gender</Text>
              </View>
              <View style={styles.genderIcons}>
                <TouchableOpacity
                  style={
                    this.state.gender == 'm'
                      ? [styles.selectedIcon, styles.mr5]
                      : [styles.deSelectedIcon, styles.mr5]
                  }
                  onPress={() => {
                    this.setState({gender: 'm'});
                  }}>
                  <FontAwesomeIcon
                    icon={faMale}
                    color={this.state.gender == 'm' ? '#fff' : '#ff1822'}
                    size={28}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    this.state.gender == 'f'
                      ? styles.selectedIcon
                      : styles.deSelectedIcon
                  }
                  onPress={() => {
                    this.setState({gender: 'f'});
                  }}>
                  <FontAwesomeIcon
                    icon={faFemale}
                    color={this.state.gender == 'f' ? '#fff' : '#ff1822'}
                    size={28}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <TextInput
                placeholder="Age"
                keyboardType="phone-pad"
                placeholderTextColor="#000"
                style={styles.inputFld}
                onChangeText={text =>
                  this.setState(
                    {
                      age: text,
                    },
                    console.log('age', text),
                  )
                }
              />
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#000"
                keyboardType="email-address"
                style={styles.inputFld}
                onChangeText={text =>
                  this.setState(
                    {
                      email: text,
                    },
                    console.log('email', text),
                  )
                }
              />
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              {console.log('this.state.country', this.state.country)}
              <Picker
                style={{height: 50, width: 280}}
                selectedValue={this.state.country}
                onValueChange={this.updateCountry}>
                <Picker.Item label="Country" value="Country" />
                <Picker.Item label="Pakistan" value="Pakistan" />
                <Picker.Item label="USA" value="USA" />
                <Picker.Item label="china" value="china" />
                <Picker.Item label="KSA" value="KSA" />
              </Picker>
              <Text style={styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{height: 50, width: 280}}
                selectedValue={this.state.state}
                onValueChange={this.updateState}>
                <Picker.Item label="State" value="State" />
                <Picker.Item label="Sindh" value="Sindh" />
                <Picker.Item label="Balochistan" value="Balochistan" />
              </Picker>
            </View>

            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{height: 50, width: 280}}
                selectedValue={this.state.city}
                onValueChange={this.updateCity}>
                <Picker.Item label="City" value="City" />
                <Picker.Item label="Karachi" value="Karachi" />
                <Picker.Item label="Hyderabad" value="Hyderabad" />
              </Picker>
            </View>

            <View style={[styles.inputFldView, styles.mb2]}>
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="#000"
                style={styles.inputFld}
                onChangeText={text =>
                  this.setState(
                    {
                      password: text,
                    },
                    console.log('Password', text),
                  )
                }
              />
            </View>

            <View style={[styles.inputFldView, styles.mb2]}>
              <TextInput
                secureTextEntry={true}
                placeholder="Confirm Password"
                placeholderTextColor="#000"
                style={styles.inputFld}
                onChangeText={text =>
                  this.setState(
                    {
                      confirmPassword: text,
                    },
                    console.log('confirmPassword', text),
                  )
                }
              />
            </View>

            <View>
              <TouchableOpacity style={styles.sendBtn} onPress={this.signup}>
                <Text style={styles.signUpBtnTxt}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }
  }

  signup = () => {
    // EventRegister.emit('isLoggedIn', 'Main');
  };

  handleCancel() {
    this.setState({showAlert: false});
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{height: 60, borderWidth: 0}}>
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="arrowleft" size={20} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.separator} />
          {this.header()}
          {this.getStarted()}
          {this.verification()}
          {this.signUp()}
          <StatusBar translucent backgroundColor="transparent" />

          {/* <View style={styles.horizontal}>
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
          </Dialog.Container> */}

          {/* <Toast ref={ref => Toast.setRef(ref)} /> */}
        </View>
      </SafeAreaView>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 30,
    marginTop: 10,
    backgroundColor: 'white',
  },
  headerView: {
    flex: 1,
    flexDirection: 'row',
    zIndex: 2,
  },
  selectedCircle: {
    width: 30,
    height: 30,
    padding: 10,
    backgroundColor: '#ff1822',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTxt: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  notSelectedCircle: {
    width: 30,
    height: 30,
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ff1822',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notSelectedTxt: {
    color: '#ff1822',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  getStartedView: {
    flex: 1,
    alignItems: 'center',
  },
  verificationView: {
    flex: 1,
    alignItems: 'center',
  },
  signUpView: {
    flex: 1,
    alignItems: 'center',
  },
  headerLabel: {
    marginTop: 5,
    color: '#1e1e1e',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  separator: {
    width: deviceWidth - 190,
    height: 1,
    backgroundColor: '#ff1822',
    position: 'absolute',
    right: 95,
    top: 42,
    zIndex: 1,
  },
  getStarted: {
    flex: 6,
    paddingvertical: 20,
  },
  inputFldView: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputFld: {
    marginLeft: 10,
    color: '#000',
    width: deviceWidth - 120,
    fontSize: 16,
  },
  mb2: {
    marginBottom: 15,
  },
  mb1: {
    marginBottom: 10,
  },
  mr5: {
    marginRight: 5,
  },
  signUpLabel: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  signUpSubLabel: {
    fontSize: 14,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  agreedView: {
    // marginTop:10,
    flexDirection: 'row',
  },
  agreedTxt: {
    marginTop: 7,
    color: '#1e1e1e',
    fontSize: 11,
    fontFamily: 'Poppins',
  },
  agreedtxtSelected: {
    color: '#ff1822',
  },
  signUpBtn: {
    width: deviceWidth - 60,
    backgroundColor: '#ff1822',
    padding: 10,
    borderRadius: 30,
    marginTop: 30,
  },
  sendBtn: {
    // width:deviceWidth-60,
    backgroundColor: '#ff1822',
    borderRadius: 30,
    width: '75%',
    alignSelf: 'center',
    padding: 10,

    marginVertical: 20,
    // marginTop: 10,
    // marginBottom: 20,
  },
  signUpBtnTxt: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
  },
  registerWith: {
    marginTop: 15,
    fontSize: 12,
    textAlign: 'center',
    color: '#ff1822',
    fontFamily: 'Poppins-SemiBold',
    textDecorationLine: 'underline',
  },
  resend: {
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
    color: '#ff1822',
    fontFamily: 'Poppins-SemiBold',
    textDecorationLine: 'underline',
  },
  verification: {
    flex: 6,
    paddingvertical: 20,
  },
  verificationBox: {
    borderWidth: 2,
    borderColor: '#ff1822',
    borderRadius: 20,
    padding: 20,
  },
  code: {
    textAlign: 'center',
    color: '#ff1822',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 10,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#000',
  },

  underlineStyleBase: {
    width: 50,
    height: 50,
    color: colors.dark,
    borderColor: colors.dark,
    fontSize: 18,
    borderRadius: 10,
  },

  underlineStyleHighLighted: {
    borderColor: 'red',
    borderWidth: 1,
  },

  signp: {
    flex: 6,
  },

  genderView: {
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  genderIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  genderIconDimension: {
    width: 52,
    height: 50,
  },
  fgenderIconDimension: {
    width: 52,
    height: 50,
  },
  selectedIcon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff1822',
    borderRadius: 48,
    borderWidth: 2,
    borderColor: '#fff',
  },
  deSelectedIcon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 48,
    borderWidth: 2,
    borderColor: '#ff1822',
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
