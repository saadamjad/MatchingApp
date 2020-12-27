import React, {PureComponent} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
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
import Carousel, {Pagination} from 'react-native-snap-carousel';
const sliderWidth = Dimensions.get('window').width;
const itemWidth = Dimensions.get('window').width;

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
      loader: true,
      errorTitle: '',
      entries: [
        {
          images: require('../../assets/mainProfile.png'),
          userName: '@elena933',
          city: 'New York USA',
          Education: 'Masters',
          years: '22 yr',
          status: 'single',
          religion: 'shia',
        },
        {
          images: require('../../assets/mainProfile.png'),
          userName: '@elena933',
          city: 'New York USA',
          Education: 'Masters',
          years: '22 yr',
          status: 'single',
          religion: 'shia',
        },
        {
          images: require('../../assets/mainProfile.png'),
          userName: '@elena933',
          city: 'New York USA',
          Education: 'Masters',
          years: '22 yr',
          status: 'single',
          religion: 'shia',
        },
        {
          images: require('../../assets/mainProfile.png'),
          userName: '@elena933',
          city: 'New York USA',
          Education: 'Masters',
          years: '22 yr',
          status: 'single',
          religion: 'shia',
        },
      ],
    };
  }

  componentDidMount() {
    this.getData(2);
  }

  async getData(i) {
    console.log('getData index: ', i);
    // this.setState({showSpinner: true});
    let URL;

    URL = 'https://api.matchelitemuslim.com/api/allusers?page=' + i;
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
          loader: false,
        });
        // console.log(res.data);
      })
      .catch(error => {
        console.log('error', error);
        this.setState({
          loader: false,
        });
      });
  }
  _renderItem = ({item, index}) => {
    console.log('item', item);
    return (
      <View style={{flex: 1, marginVertical: 10}}>
        <View
          style={{
            height: '100%',
            width: '90%',
            borderWidth: 0.6,
            borderColor: 'gray',
            marginVertical: 10,
            borderRadius: 20,
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 1,
            // borderWidth: 1,
            overflow: 'hidden',
          }}>
          <ImageBackground
            source={item.images}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 20,
              justifyContent: 'flex-end',
              overflow: 'hidden',
            }}
            resizeMode="cover">
            <View
              style={{
                elevation: 2,

                width: '100%',
                backgroundColor: 'white',

                opacity: 0.9,
              }}>
              <View style={{width: '100%', borderWidth: 0}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginVertical: 2,
                    paddingHorizontal: 10,
                  }}>
                  {' '}
                  {item.userName}{' '}
                </Text>
                <View
                  style={{
                    // borderWidth: 1,
                    flexDirection: 'row',
                    // borderWidth: 1,
                    paddingVertical: 10,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 19,
                        fontWeight: 'bold',
                      }}>
                      {' '}
                      {item.city}{' '}
                    </Text>

                    <Text
                      style={{
                        color: 'black',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      {' '}
                      Education : {item.Education}{' '}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      {' '}
                      Sect: {item.religion}{' '}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      backgroundColor: 'white',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginVertical: 2,
                      }}>
                      {' '}
                      {item.years}{' '}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginVertical: 2,
                      }}>
                      {' '}
                      {item.status}{' '}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  };

  render() {
    return (
      <ScrollView
        style={{flex: 1, backgroundColor: 'white'}}
        contentContainerStyle={{flexGrow: 1}}>
        <Header
          name={'MATCHES SUGGESTIONS'}
          navigation={this.props.navigation}
          drawer={false}
          backgroundColor={'transparent'}
          textColor={'black'}
        />
        <View
          style={{
            height: 430,
            // flex: 0.6,
            // paddingVertical: 20,
            // borderWidth: 1,
            // marginTop: 20,
            // paddingHorizontal: 10,
            // borderWidth: 1,
          }}>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.entries}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            layout={'tinder'}
            layoutCardOffset={`9`}
          />
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
          {this.state.loader ? (
            <ActivityIndicator size={'large'} color={'red'} />
          ) : (
            this.state.collection &&
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
                                'https://api.matchelitemuslim.com/' +
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
            })
          )}
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
