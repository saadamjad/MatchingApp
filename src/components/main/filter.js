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
  AsyncStorage,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Header} from '../common';
import {colors, images} from '../../constants/theme';
import RangeSlider from 'rn-range-slider';
const {height: deviceHeight, width: deviceWidth} = Dimensions.get('screen');
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faMale,
  faFemale,
  faUserCheck,
  faUserPlus,
  faCommentDots,
  faArrowLeft,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import Toast from 'react-native-toast-message';

import Axios from 'axios';

export default class SignupCmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      isEmaiForm: true,
      array: [],
      country: '',
      gender: 'm',
      maxHeight: '',
      minHight: '',
      religious: '',
      education: '',
      maritalStatus: '',
      maxAge: '',
      minAge: '',
      access_token: '',
      searchFilterItems: [],
      showfilteredItems: false,
    };
  }

  componentDidMount = async () => {
    console.log('start component');
    const user = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(user);
    // const loggedInUserID = userData.user.id;
    const access_token = userData.access_token;
    console.log('access_token', access_token);
    this.setState({
      access_token: access_token,
    });
    this._GetALLCOUNTRIES();
  };

  _GetALLCOUNTRIES = async () => {
    const user = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(user);
    console.log('userdata', userData);
    const loggedInUserID = userData.user.id;
    const access_token = userData.access_token;
    console.log('access_token', access_token);
    // console.log('loggedInUserID', loggedInUserID);
    let headers = {
      headers: {
        Authorization: access_token,
      },
    };

    const url = ' https://api.matchelitemuslim.com/api/countries';
    let i;
    let dummyArray = [];
    Axios.get(url, headers).then(res => {
      let responseArray = res.data.countries;

      for (i = 0; i < responseArray.length; i++) {
        console.log('res', responseArray[i].name, 'loop', i);
        dummyArray.push(responseArray[i]);
      }
      this.setState(
        {
          array: dummyArray,
        },
        () => console.log('dummyarray', this.state.array),
      );
    });
  };
  // UNSAFE_componentWillMount() {
  //   BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     this.handleBackButtonClick,
  //   );
  // }
  // handleBackButtonClick = () => {
  //   this.props?.navigation?.navigate('Matches');
  // };

  updateCountry = country => {
    this.setState({country});
  };
  updateReligious = religious => {
    this.setState({religious});
  };
  updateEdcation = education => {
    console.log('updateEdcation', education);
    this.setState({education});
  };
  updateMaritalStatus = maritalStatus => {
    this.setState({maritalStatus});
  };
  _ApiCall = (
    country,
    gender,
    maxHeight,
    minHight,
    religious,
    education,
    maritalStatus,
    maxAge,
    minAge,
  ) => {
    let url = 'https://api.matchelitemuslim.com/api/filter';
    let data = {
      country: country,
      gender: gender,
      maxHeight: maxHeight,
      minHeight: minHight,
      religious: religious,
      education: education,
      maritalStatus: maritalStatus,
      maxAge: maxAge,
      minAge: minAge,
    };

    this.setState({
      loader: true,
    });
    let headers = {
      headers: {
        Authorization: this.state.access_token,
      },
    };

    Axios.post(url, data, headers)
      .then(res => {
        let responseArray = res.data.collection.data;
        this.setState(
          {
            searchFilterItems: responseArray,
            showfilteredItems: true,
            loader: false,
          },
          () => console.log('responseArray==', this.state.searchFilterItems),
        );
      })
      .catch(error => {
        console.log('error', error);
        this.setState({
          showfilteredItems: false,
          loader: false,
        });
      });
  };

  addFriend = async id => {
    console.log('id', id);
    this.setState({showSpinner: true});

    const user = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(user);
    console.log('user', userData.user.id);
    let headers = {
      headers: {
        Authorization: userData.access_token,
      },
    };
    const data = {
      to: userData.user.id,
      from: id,
      status: 'sent',
    };
    const URL = 'https://api.matchelitemuslim.com/api/send-interest';
    Axios.post(URL, data, headers).then(
      resposne => {
        this.setState({showSpinner: false});
        console.log(resposne.data);
        if (!resposne.data.status)
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'You have Already sent request',
            text2: resposne.data.message,
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        else {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Success',
            text2: 'Successfuly sent friend request.',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });

          this.setState({
            isFriend: true,
            // collection: {...collection, friendRequestSent: true},
          });
        }
      },
      error => {
        this.setState({showSpinner: false});
        console.log(error);
      },
    );
  };

  renderFlatListFooter = () => {
    return (
      <>
        {this.state.isLoading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <TouchableOpacity activeOpacity={0.5} onPress={this.onEndReached}>
            <Text
              style={{
                width: '100%',
                height: 30,
                backgroundColor: 'red',
                color: 'white',
                textAlign: 'center',
                marginBottom: 10,
                textAlignVertical: 'center',
              }}>
              Show more...
            </Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  _ApplyFilter = () => {
    let {
      country,
      gender,
      maxHeight,
      minHight,
      religious,
      education,
      maritalStatus,
      maxAge,
      minAge,
    } = this.state;

    this._ApiCall(
      country,
      gender,
      maxHeight,
      minHight,
      religious,
      education,
      maritalStatus,
      maxAge,
      minAge,
    );
  };

  render() {
    if (
      this.state.searchFilterItems.length < 1 ||
      !this.state.showfilteredItems
    ) {
      return (
        <SafeAreaView style={{flex: 1}}>
          <Header
            name={'Filter'}
            navigation={this.props.navigation}
            backBtn={true}
          />
          {this.state.loader ? (
            <ActivityIndicator size="large" color={colors.headerColor} />
          ) : (
            <ScrollView style={styles.signp}>
              <View style={[styles.inputFldView, styles.mb2]}>
                {/* <Text style={styles.labelTt}> ssss{this.state.array} </Text> */}
                <Picker
                  style={styles.pickerStyle}
                  selectedValue={this.state.country}
                  onValueChange={this.updateCountry}>
                  {this.state.array.length > 0
                    ? this.state.array.map((item, i) => {
                        // console.log('item====', item);
                        return (
                          <Picker.Item label={item.name} value={item.id} />
                        );
                      })
                    : null}
                </Picker>
              </View>

              <View style={styles.genderView}>
                <View>
                  <Text style={styles.genderTxt}>Genders</Text>
                </View>

                <View style={styles.genderIcons}>
                  <TouchableOpacity
                    style={
                      this.state.gender == 'm'
                        ? [styles.selectedIcon, styles.mr5]
                        : [styles.deSelectedIcon, styles.mr5]
                    }
                    onPress={() => {
                      this.setState({gender: 'on'});
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
                      this.setState({gender: 'off'});
                    }}>
                    <FontAwesomeIcon
                      icon={faFemale}
                      color={this.state.gender == 'f' ? '#fff' : '#ff1822'}
                      size={28}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.inputFldView1, styles.mb2]}>
                <Text style={styles.labelTt}>Age</Text>

                <View style={{paddingHorizontal: 20}}>
                  <RangeSlider
                    style={{width: '100%', height: 60}}
                    gravity={'center'}
                    min={18}
                    max={50}
                    blankColor="#ccc"
                    selectionColor="#ff1822"
                    onValueChanged={(low, high, fromUser) => {
                      console.log('minAge', low, 'maxAge', high);
                      this.setState({minAge: low, maxAge: high});
                    }}
                  />
                </View>
              </View>

              <View style={[styles.inputFldView1, styles.mb2]}>
                <Text style={styles.labelTt}>Height</Text>

                <View style={{paddingHorizontal: 20}}>
                  <RangeSlider
                    style={{width: '100%', height: 60}}
                    gravity={'center'}
                    min={4}
                    max={10}
                    step={1}
                    blankColor="#ccc"
                    selectionColor="#ff1822"
                    onValueChanged={(minHight, maxHeight) => {
                      console.log('minHight', minHight, 'maxHeight', maxHeight);
                      this.setState({minHight: minHight, maxHeight: maxHeight});
                    }}
                  />
                </View>
              </View>

              <View style={[styles.inputFldView, styles.mb2]}>
                <Text style={styles.labelTt}>Religious</Text>
                {console.log('religios', this.state.religious)}
                <Picker
                  style={styles.pickerStyle}
                  selectedValue={this.state.religious}
                  onValueChange={this.updateReligious}>
                  <Picker.Item
                    label="Select religion"
                    value="Select religion"
                  />
                  <Picker.Item label="Religious" value="Religious" />
                </Picker>
              </View>

              <View style={[styles.inputFldView, styles.mb2]}>
                <Text style={styles.labelTt}>education</Text>
                {console.log('edcation', this.state.edcation)}

                <Picker
                  style={styles.pickerStyle}
                  selectedValue={this.state.education}
                  onValueChange={value =>
                    this.setState(
                      {
                        education: value,
                      },
                      () => console.log('test', this.state.education),
                    )
                  }>
                  <Picker.Item label="Bachelors" value="Bachelors" />
                  <Picker.Item
                    label="Primary (Elementary) School"
                    value="Primary (Elementary) School"
                  />
                </Picker>
              </View>

              <View style={[styles.inputFldView, styles.mb2]}>
                <Text style={styles.labelTt}>Marital Status</Text>
                {console.log('maritalStatus', this.state.maritalStatus)}

                <Picker
                  style={styles.pickerStyle}
                  selectedValue={this.state.maritalStatus}
                  onValueChange={this.updateMaritalStatus}>
                  <Picker.Item label="Single" value="Single" />
                  <Picker.Item label="married" value="married" />
                </Picker>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.sendBtn}
                  onPress={() => this._ApplyFilter()}>
                  <Text style={styles.signUpBtnTxt}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              backgroundColor: colors.headerColor,
              borderBottomColor: colors.ligthGrey,
              borderBottomWidth: 0.5,
              elevation: 1,
            }}>
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
              onPress={() =>
                this.setState({
                  showfilteredItems: false,
                })
              }>
              <FontAwesomeIcon
                icon={faArrowLeft}
                size={24}
                color={colors.ligth}
              />
            </TouchableOpacity>
            <View
              style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white'}}>Matchessss </Text>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
              // onPress={() => {
              //   navigation.navigate('Filter');
              // }}
              >
                {/* <FontAwesomeIcon icon={faSearch} size={24} color="#fff" /> */}
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            ref={ref => (this.flatList = ref)}
            ListFooterComponent={this.renderFlatListFooter}
            showsVerticalScrollIndicator={false}
            data={
              this.state.searchFilterItems ? this.state.searchFilterItems : []
            }
            // renderItem={this.renderFlatListData}
            keyExtractor={(item, index) => item.toString()}
            renderItem={({item, index, separators}) => (
              console.log('item=>', item.profile_pic),
              (
                <TouchableOpacity
                  onPress={() =>
                    this.props?.navigation?.navigate('Profile1', {
                      data: item,
                      profilePic:
                        'https://api.matchelitemuslim.com/' + item.profile_pic,
                    })
                  }
                  key={item.key}>
                  <View style={styles.reglarUserView}>
                    <View style={{paddingHorizontal: 10}}>
                      <View style={[styles.vipUserInner1, styles.mb]}>
                        <View style={styles.vipImageView}>
                          <TouchableOpacity
                            onPress={() =>
                              this.props?.navigation?.navigate('Profile1', {
                                data: item,
                                // ,
                                // profilePic:
                                //   'https://api.matchelitemuslim.com/' +
                                //   item.profile_pic,
                              })
                            }
                            style={{overflow: 'hidden'}}>
                            <Image
                              source={{
                                uri:
                                  'data:image/png;base64,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',

                                // 'https://api.matchelitemuslim.com/' +
                                // item.profile_pic,
                              }}
                              defaultSource={require('../../assets/noImage.png')}
                              style={styles.regularImageDimension}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={[styles.vipContentView, styles.pt10]}>
                          <View style={styles.nameView}>
                            <Text style={styles.vipName}>{item.UserName}</Text>
                            {item.Gender == 'off' ? (
                              <FontAwesomeIcon
                                icon={faFemale}
                                color="red"
                                size={18}
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faMale}
                                color="blue"
                                size={18}
                              />
                            )}
                          </View>
                          <View>
                            <Text style={styles.vipAge}>{item.Age} years</Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Image
                              style={{marginRight: 5, width: 11, height: 16}}
                              source={images.locationIcon}
                            />
                            <Text style={styles.vipLighTxt}>{item.state}</Text>
                          </View>
                          <View style={styles.vipEduView}>
                            <Text style={styles.vipDrakTxt}>Educations: </Text>
                            <Text style={styles.vipLighTxt}>
                              {item.education
                                ? item.education.length <= 10
                                  ? item.education
                                  : item.education.substring(0, 15) + '...'
                                : 'N/A'}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <View style={styles.vipEduView}>
                              <Text style={styles.vipDrakTxt}>Sect: </Text>
                              <Text style={styles.vipLighTxt}>Shia </Text>
                            </View>
                            <View style={styles.socialView}>
                              <TouchableOpacity
                                style={{
                                  padding: 7,
                                  backgroundColor: '#ed145b',
                                  borderRadius: 30,
                                  marginRight: 7,
                                }}
                                onPress={() => this.addFriend(item.id)}>
                                {/* {this.state.isFriend ? (
                                <Image
                                  source={require('../../assets/correct.jpg')}
                                  style={{width: 20, height: 20}}
                                />
                              ) : ( */}
                                <FontAwesomeIcon
                                  icon={faUserPlus}
                                  color="#fff"
                                  size={20}
                                />
                                {/* )} */}
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() =>
                                  this.props?.navigation?.navigate('innerChat')
                                }
                                style={{
                                  padding: 7,
                                  backgroundColor: '#49c858',
                                  borderRadius: 30,
                                }}>
                                <FontAwesomeIcon
                                  icon={faCommentDots}
                                  color="#fff"
                                  size={20}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            )}
          />
        </SafeAreaView>
      );
    }
  }
}
const styles = {
  reglarUserView: {
    flex: 3,
    backgroundColor: '#ebebeb',
    marginTop: 10,
  },
  vipUserInner1: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    // elevation: 2,
  },
  mb: {
    marginBottom: 10,
  },
  vipImageView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  regularImageDimension: {
    width: 120,
    height: 125,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  vipContentView: {
    flex: 1,
    paddingLeft: 0,
  },
  pt10: {
    padding: 10,
    paddingLeft: 0,
  },
  nameView: {
    flexDirection: 'row',
  },
  vipName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  vipAge: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  vipLighTxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    flexWrap: 'wrap',
  },
  vipEduView: {
    flexDirection: 'row',
    flex: 1,
  },
  vipDrakTxt: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  socialView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 30,
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontalActivity: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  labelTt: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    paddingLeft: 20,
    textTransform: 'uppercase',
  },
  pickerStyle: {
    // height: 50,
    width: 370,
    marginLeft: -25,
    color: '#242424',
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
  },
  headerView: {
    flex: 1,
    flexDirection: 'row',
    zIndex: 2,
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
  inputFldView: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderRadius: 30,
    // paddingHorizontal:20,
  },
  inputFldView1: {
    borderRadius: 30,
    // borderBottomWidth:1,
    // borderBottomColor:'#000',
    // paddingHorizontal:20,
  },
  inputFld: {
    marginLeft: 15,
    color: '#000',
    width: deviceWidth - 120,
  },
  mb2: {
    marginBottom: 15,
  },
  mr5: {
    marginRight: 5,
  },
  signUpBtn: {
    width: deviceWidth - 60,
    backgroundColor: '#ff1822',
    padding: 10,
    borderRadius: 30,
    marginTop: 10,
  },
  sendBtn: {
    // width:deviceWidth-60,
    backgroundColor: '#ff1822',
    padding: 10,
    // borderRadius:30,
    marginTop: 10,
    marginBottom: 20,
  },
  signUpBtnTxt: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
  },
  signp: {
    flex: 6,
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  genderView: {
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  genderTxt: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    textTransform: 'uppercase',
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
    height: 48,
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
};
