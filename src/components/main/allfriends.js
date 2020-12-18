// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   Image,
//   AsyncStorage,
//   ActivityIndicator,
//   TouchableHighlight,
// } from 'react-native';
// import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
// import Toast from 'react-native-toast-message';

// import axios from 'axios';
// import Spinner from 'react-native-loading-spinner-overlay';
// import Dialog from 'react-native-dialog';
// import Filter from './filter';

// import {colors, images} from '../../constants/theme';

// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {
//   faUserCheck,
//   faUserPlus,
//   faCommentDots,
//   faFemale,
//   faTimes,
//   faMale,
//   faCheck,
// } from '@fortawesome/free-solid-svg-icons';

// import {Header} from '../common';
// import {Value} from 'react-native-reanimated';

// export default class MatchesCmp extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userData: '',
//       collection: [],
//       showAlert: false,
//       showSpinner: false,
//       isLoading: false,
//       errorMsg: '',
//       errorTitle: '',
//       fliterIcon: true,
//     };
//   }

//   render() {
//     return (
//       <SafeAreaView style={{flex: 1}}>
//         <Header
//           name={'Your Friends '}
//           navigation={this.props.navigation}
//           // fliter="1"
//         />
//         <Text style={{textAlign: 'center'}}> Backend API NOT READY YET </Text>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = {
//   reglarUserView: {
//     flex: 3,
//     backgroundColor: '#ebebeb',
//     marginTop: 10,
//   },
//   vipUserInner1: {
//     flex: 1,
//     flexDirection: 'row',
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,
//     elevation: 2,
//   },
//   mb: {
//     marginBottom: 10,
//   },
//   vipImageView: {
//     flex: 1,
//   },
//   regularImageDimension: {
//     width: 140,
//     height: 145,
//     borderTopLeftRadius: 10,
//     borderBottomLeftRadius: 10,
//   },
//   vipContentView: {
//     flex: 1,
//     paddingLeft: 0,
//   },
//   pt10: {
//     padding: 10,
//     paddingLeft: 0,
//   },
//   nameView: {
//     flexDirection: 'row',
//   },
//   vipName: {
//     fontFamily: 'Poppins-Bold',
//     fontSize: 16,
//   },
//   vipAge: {
//     fontFamily: 'Poppins-Medium',
//     fontSize: 12,
//   },
//   vipLighTxt: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: 12,
//     flexWrap: 'wrap',
//   },
//   vipEduView: {
//     flexDirection: 'row',
//     flex: 1,
//   },
//   vipDrakTxt: {
//     fontFamily: 'Poppins-SemiBold',
//     fontSize: 12,
//   },
//   socialView: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginLeft: 30,
//   },
//   spinnerTextStyle: {
//     color: '#FFF',
//   },
//   horizontal: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   horizontalActivity: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 10,
//   },
// };

import React, {PureComponent} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

import {Header} from '../common';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHeart,
  faUserPlus,
  faEye,
  faFemale,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {colors, images} from '../../constants/theme';
import CountryPicker from 'react-native-country-picker-modal';
import Swiper from 'react-native-swiper';

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
      collection: [],
      isLoading: false,
    };
  }

  whatsApp() {
    return (
      <View style={{padding: 7, backgroundColor: '#49c858', borderRadius: 30}}>
        <FontAwesomeIcon icon={faCommentDots} color="#fff" size={20} />
      </View>
    );
  }

  addUser() {
    return (
      <View
        style={{
          padding: 7,
          backgroundColor: '#ed145b',
          borderRadius: 30,
          marginRight: 7,
        }}>
        <FontAwesomeIcon icon={faUserPlus} color="#fff" size={20} />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Header
          name={'Matches Suggestion'}
          navigation={this.props.navigation}
        />
        <View style={styles.vipUserView}>
          <Swiper
            style={styles.wrapper}
            // showsButtons={true}
            showsPagination={false}
            prevButton={
              <Text style={{color: '#000', fontSize: 40, fontWeight: 'bold'}}>
                ‹
              </Text>
            }
            nextButton={
              <Text style={{color: '#000', fontSize: 40, fontWeight: 'bold'}}>
                ›
              </Text>
            }>
            {[0, 1, 2].map(val => (
              <View style={styles.vipUserInner}>
                <View
                  style={{
                    flex: 1,
                    paddingRight: 0,
                    borderRadius: 10,
                    backgroundColor: '#f6f6f6',
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 2,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Profile1', {data: {}})
                    }
                    style={styles.vipImageView}>
                    <Image
                      source={images.vipUserIcon}
                      style={styles.vipImageDimension}
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

                      <View style={{flexDirection: 'row'}}>
                        <Image
                          style={{marginRight: 5, width: 11, height: 16}}
                          source={images.locationIcon}
                        />
                        <Text style={styles.vipLighTxt}>New York, USA </Text>
                        {/* <Image style={{ marginLeft:5, width:30, height:16 }} source={images.flagIcon} /> */}
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
                      <View style={styles.vipEduView}>
                        <Text style={styles.vipDrakTxt}>Education: </Text>
                        <Text style={styles.vipLighTxt}>Masters </Text>
                      </View>
                      <View style={styles.vipEduView}>
                        <Text style={styles.vipDrakTxt}>Sect: </Text>
                        <Text style={styles.vipLighTxt}>Shia </Text>
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
        </View>
        <View
          style={{paddingHorizontal: 25, marginTop: 10, flexDirection: 'row'}}>
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

        <Text> Yhan pe all users wali api lagegi </Text>
      </SafeAreaView>
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
    flex: 0.6,
    marginTop: 10,
  },
  reglarUserView: {
    flex: 3,
    // backgroundColor:'#ebebeb',
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
    elevation: 2,
  },
  vipImageView: {flex: 1},
  // vipImageDimension:{ width:120 , height:150, borderRadius:10 },
  vipImageDimension: {width: '100%', height: '100%', borderRadius: 10},
  regularImageDimension: {
    width: 140,
    height: 145,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  vipContentView: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 0,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: '100%',
  },
  nameView: {flexDirection: 'row'},
  pt10: {padding: 10, paddingLeft: 10},
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
  vipEduView: {flexDirection: 'row', flex: 1},
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
};
