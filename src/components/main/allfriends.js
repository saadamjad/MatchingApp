import React, {PureComponent} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';

import {Header} from '../common';
// import CountryPicker from 'react-native-country-picker-modal';
// import Swiper from 'react-native-swiper';

import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from 'react-native-dialog';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUserPlus,
  faCommentDots,
  faFemale,
  faMale,
  faTimes,
  faHeart,
  faStar,
  faThumbsUp,
  faEye,
  faUserCheck,
} from '@fortawesome/free-solid-svg-icons';
import {colors, images} from '../../constants/theme';
import CountryPicker from 'react-native-country-picker-modal';
import Swiper from 'react-native-swiper';
import YouTube from 'react-native-youtube';
import {ScrollView} from 'react-native-gesture-handler';

export default class HomeCmp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cca2: 'PK',
      cca21: 'PK',
      cca22: 'PK',
      cca23: 'PK',
      cca24: 'PK',
      usersData: '',
      vipUserData: [],
      collection: [],
      blockUserData: [],
      isLoading: false,
      errorMsg: 'a',
      errorTitle: '',
    };
  }

  componentDidMount() {
    this.getData(2);
  }

  async getData(i) {
    console.log('getData index: ', i);
    // this.setState({showSpinner: true});
    let URL;

    URL = 'http://dev2.thebetatest.com/api/allusers?page=' + i;
    const user = await AsyncStorage.getItem('userData');
    const access_token = JSON.parse(user).access_token;
    // console.log(access_token)
    let headers = {
      headers: {
        Authorization: access_token,
      },
    };

    axios
      .get(URL, headers)
      .then(async res => {
        // console.log('Res=======', res.data.collection.data[0].user_type);
        this.setState({
          // showSpinner: false,
          usersData: res.data,
          collection: res.data.collection.data,
        });
        // console.log(res.data);
      })
      .catch(error => {
        // this.setState({showSpinner: false});
        console.log('error', error);
        this.setState({
          // showAlert: true,
          // errorMsg: 'Something went wrong. ' + error,
          // errorTitle: 'Error!!',
        });
      });
  }

  render() {
    return (
      <ScrollView
        style={{flex: 1, backgroundColor: 'white'}}
        contentContainerStyle={{flexGrow: 1}}>
        <Header name={'Find Friends'} navigation={this.props.navigation} />
        <View
          style={{
            height: 300,
            borderWidth: 0,
            marginTop: 20,
            paddingHorizontal: 10,
          }}>
          <Swiper showsPagination={false}>
            {[0, 1, 2].map(val => (
              <View style={styles.vipUserInner}>
                <View
                  style={{
                    paddingRight: 0,
                    borderRadius: 10,
                    backgroundColor: '#f6f6f6',
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 2,
                    flex: 1,
                    // borderWidth: 1,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Profile1', {data: {}})
                    }
                    style={styles.vipImageView}>
                    <ImageBackground
                      source={images.vipUserIcon}
                      style={styles.vipImageDimension}
                      // resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <View style={[styles.vipContentView, styles.pt10]}>
                    <View style={{flex: 1}}>
                      <View style={styles.nameView}>
                        <Text style={styles.vipName}>@elena45</Text>
                        <FontAwesomeIcon
                          icon={faFemale}
                          color="red"
                          size={18}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          borderWidth: 0,
                          paddingHorizontal: 20,
                        }}>
                        <Image
                          style={{marginRight: 5, width: 11, height: 16}}
                          source={images.locationIcon}
                        />
                        <Text style={styles.vipLighTxt}>New York, USA </Text>
                        <View
                          style={{
                            position: 'relative',
                            bottom: 5,
                            marginBottom: -10,
                          }}>
                          <CountryPicker
                            withAlphaFilter={true}
                            withCallingCode={true}
                            withFilter={true}
                            countryCode={this.state.cca2}
                            onSelect={value => {
                              this.setState({
                                cca2: value.cca2,
                                app,
                              });
                            }}
                            cca2={this.state.cca2}
                            translation="eng"
                          />
                        </View>
                      </View>
                      <View style={{paddingHorizontal: 20}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.vipDrakTxt}>Education: </Text>
                          <Text style={styles.vipLighTxt}>Masters </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.vipDrakTxt}>Religious: </Text>
                          <Text style={styles.vipLighTxt}>Shia </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}>
                      <View>
                        <Text style={styles.vipAge}>28 yrs</Text>
                      </View>
                      <View>
                        <Text style={styles.vipLighTxt}>Single</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </Swiper>
          <View
            style={{
              paddingHorizontal: 25,
              flexDirection: 'row',
              marginVertical: 10,
            }}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  backgroundColor: 'blue',

                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon icon={faHeart} color="#fff" size={26} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon icon={faUserPlus} color="#fff" size={26} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  backgroundColor: 'orange',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon icon={faEye} color="#fff" size={26} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  backgroundColor: 'grey',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon icon={faTimes} color="#fff" size={26} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flex: 1, borderWidth: 0}}>
          {this.state.collection &&
            this.state.collection.map((item, i) => {
              console.log('====', item.id);
              return (
                <TouchableOpacity
                  style={styles.reglarUserView}
                  onPress={() =>
                    this.props.navigation.navigate('Profile1', {
                      data: item,
                    })
                  }>
                  <View style={{paddingHorizontal: 10}}>
                    <View style={[styles.vipUserInner1, styles.mb]}>
                      <View style={styles.vipImageView}>
                        <TouchableOpacity>
                          <Image
                            resizeMode="contain"
                            source={{
                              uri:
                                'http://dev2.thebetatest.com/' +
                                item.profile_pic,
                            }}
                            defaultSource={require('../../assets/noImage.png')}
                            style={styles.regularImageDimension}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.vipContentView, styles.pt10]}>
                        <View style={styles.nameView}>
                          <Text style={styles.vipName}>@{item.UserName}</Text>
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
                          <Text style={styles.vipDrakTxt}>Education: </Text>
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
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
      </ScrollView>
    );
  }
}

const styles = {
  HomeView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    // backgroundColor:'#ddd',
  },
  statsView: {
    flex: 2,
    // padding: 10,
    paddingHorizontal: 10,
  },
  vipUserView: {
    flex: 2.8,
    marginBottom: 10,
  },
  reglarUserView: {
    flex: 3,
    backgroundColor: '#ebebeb',
    marginTop: 10,
  },
  statsTxt: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#1e1e1e',
    textAlign: 'center',
  },
  statsCardsView: {
    flex: 1,
    flexDirection: 'row',
  },
  statsCardView: {
    flex: 1,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  statsImg: {flex: 1, resizeMode: 'cover', justifyContent: 'center'},
  vipUserInner: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  vipUserInner1: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    // elevation: 2,
  },
  vipImageView: {flex: 1},
  vipImageDimension: {width: '100%', height: '100%'},
  regularImageDimension: {
    width: 120,
    height: 150,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  vipContentView: {flex: 1, paddingLeft: 0},
  nameView: {flexDirection: 'row'},
  pt10: {padding: 10, paddingLeft: 0},
  vipTxt: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#1e1e1e',
    textAlign: 'center',
    marginVertical: 5,
  },
  statsCardTxt: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
  statsHeading: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
  statsLabel: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 5,
  },
  vipName: {fontFamily: 'Poppins-Bold', fontSize: 16},
  imgSize: {width: 144, height: 145},
  vipAge: {fontFamily: 'Poppins-Medium', fontSize: 12},
  vipLighTxt: {fontFamily: 'Poppins-Regular', fontSize: 12, flexWrap: 'wrap'},
  vipEduView: {flexDirection: 'row', flex: 1, borderWidth: 0},
  socialView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 30,
  },
  vipDrakTxt: {fontFamily: 'Poppins-SemiBold', fontSize: 12},
  mb: {marginBottom: 10},
  pos: {position: 'relative', bottom: 5},
  socialIcon: {width: 20, height: 17},
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
  signupGSView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  swipCont: {alignItems: 'center', paddingHorizontal: 35},
  swipImg: {width: 75, height: 75, borderRadius: 75, marginBottom: 10},
  starCont: {flexDirection: 'row', marginBottom: 10},
  txtFormat: {color: '#878C9F', fontSize: 12, textAlign: 'center'},
};
