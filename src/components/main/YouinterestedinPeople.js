import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  AsyncStorage,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from 'react-native-dialog';
import Filter from './filter';

import {colors, images} from '../../constants/theme';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUserCheck,
  faUserPlus,
  faCommentDots,
  faFemale,
  faTimes,
  faMale,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

import {Header} from '../common';
import {Value} from 'react-native-reanimated';

export default class MatchesCmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: '',
      collection: [],
      showAlert: false,
      showSpinner: false,
      isLoading: false,
      errorMsg: '',
      errorTitle: '',
      fliterIcon: true,
    };

    this._GetWishtlistData();
    this.props.navigation.addListener('willFocus', async () => {
      // this.getData();
    });
  }

  handleCancel() {
    this.setState({showAlert: false});
  }

  // async getData(i) {
  //   console.log('getData index: ', i);
  //   let URL;
  //   if (i == undefined) {
  //     URL = 'http://dev2.thebetatest.com/api/allusers';
  //   } else {
  //     URL = 'http://dev2.thebetatest.com/api/allusers?page=' + i;
  //   }

  //   const user = await AsyncStorage.getItem('userData');
  //   const access_token = JSON.parse(user).access_token;
  //   console.log(access_token);
  //   let headers = {
  //     headers: {
  //       Authorization: access_token,
  //     },
  //   };

  //   this.setState({showSpinner: true});
  //   axios
  //     .get(URL, headers)
  //     .then(async res => {
  //       this.setState({
  //         showSpinner: false,
  //         usersData: res.data,
  //         collection: res.data.collection.data,
  //       });
  //       console.log(res.data);
  //     })
  //     .catch(error => {
  //       console.log('error', error);
  //       this.setState({
  //         showSpinner: false,
  //         showAlert: true,
  //         errorMsg: 'Something went wrong. ' + error,
  //         errorTitle: 'Error!!',
  //       });
  //     });
  // }

  _GetWishtlistData = async anty => {
    const user = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(user);
    const access_token = userData.access_token;
    const loggedInUserID = userData.user.id;

    // const loggedInUserID = userData.user.id;
    // https://dev2.thebetatest.com/api/get-interest-users/131

    const URL = `https://dev2.thebetatest.com/api/get-interest-users/${loggedInUserID}`;
    console.log('===================', URL);
    const SECONDURL = `https://dev2.thebetatest.com/api/allusers`;

    // let access_token = userData.access_token;

    let headers = {
      headers: {
        Authorization: access_token,
      },
    };
    this.setState({
      isLoading: true,
    });
    axios.get(URL, headers).then(
      async response => {
        // console.log('res====', response.data);
        axios
          .get(SECONDURL, headers)
          .then(async Response => {
            // console.log('res====', response.data.collection.data);
            let keys = Object.keys(response?.data?.collection);
            let data = await keys.map(value => {
              return {...response?.data?.collection[value]};
            });
            let newData = [];
            await data.map(val => {
              Response?.data?.collection?.data.map(value => {
                console.log(val);
                if (val.to == value.id) {
                  newData.push(value);
                }
              });
            });
            this.setState({
              collection: newData,
              isLoading: false,
            });
          })
          .catch(err => {
            this.setState({
              isLoading: false,
            });
            console.log('PAHLY ERROR SOLVE KARO', err);
          });
        // console.log('HOGYA BE!!', data);
      },
      error => {
        console.log(error);
        this.setState({
          isLoading: false,
        });
      },
    );
  };

  removeFromList = id => {
    this.setState({
      collection: this.state.collection.filter(val => val.id !== id),
    });
  };

  deny = async id => {
    const user = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(user);
    const loggedInUserID = userData.user.id;
    const access_token = userData.access_token;
    this.setState({
      loader: true,
    });
    axios
      .post(
        `https://dev2.thebetatest.com/api/deny-interest`,
        {
          toId: loggedInUserID,
          fromId: id,
        },
        {
          headers: {Authorization: access_token},
        },
      )
      .then(async res => {
        this.setState({
          loader: false,
        });
        this.setState({showSpinner: false});
        this.removeFromList(id);
        alert('Remove Freind Successfullly');
        console.log('res is here for now check it out boy!!===', res.data);
        // this.setState({step: 1});
        // this.setState({
        //   chat: res.data?.fav,
        // });
      })
      .catch(error => {
        this.setState({
          loader: false,
        });
        this.setState({showSpinner: false});
        console.log('error', error);
        this.setState({
          showAlert: true,
          errorMsg: 'Something went wrong. ' + error,
          errorTitle: 'Error!!',
        });
      });
  };
  accept = async id => {
    const user = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(user);
    const loggedInUserID = userData.user.id;
    const access_token = userData.access_token;
    this.setState({
      loader: true,
    });
    axios
      .post(
        `https://dev2.thebetatest.com/api/accept-interest`,
        {
          toId: loggedInUserID,
          fromId: id,
        },
        {
          headers: {Authorization: access_token},
        },
      )
      .then(async res => {
        this.setState({
          loader: false,
        });
        this.setState({showSpinner: false});
        console.log('res is here for now check it out boy!!===', res.data);
        this.removeFromList(id);
        alert('Accept Freind Successfullly');
        // this.setState({step: 1});
        // this.setState({
        //   chat: res.data?.fav,
        // });
      })
      .catch(error => {
        this.setState({
          loader: false,
        });
        this.setState({showSpinner: false});
        console.log('error', error);
        this.setState({
          showAlert: true,
          errorMsg: 'Something went wrong. ' + error,
          errorTitle: 'Error!!',
        });
      });
  };

  isUserAlreadyFriend = async ThereIsClickableUserId => {
    const user = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(user);
    const access_token = userData.access_token;
    const thereIsOurId = userData.user.id;

    let headers = {
      headers: {
        Authorization: access_token,
      },
    };
    let isFriend = false;
    await axios
      .get(
        `https://dev2.thebetatest.com/api/get-friend-details/?user_id=${thereIsOurId}&person_id=${ThereIsClickableUserId}`,
        headers,
      )
      .then(async Response => {
        if (Response.data) {
          if (
            Response.data.collection.interest_to == 'sent' &&
            Response.data.collection.interest_from == 'sent'
          ) {
            isFriend = true;
          }
          // console.log('FULL SHOOT HY', Response.data.status);
          return true;
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false,
        });
        console.log('PAHLY ERROR SOLVE KARO', err);
      });
    return isFriend;
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Header
          name={'You Showed Interest in People'}
          navigation={this.props.navigation}
          // fliter="1"
        />

        {this.state.isLoading ? (
          <View style={{flex: 1, alignItems: 'center'}}>
            <ActivityIndicator color="red" size="large" />
          </View>
        ) : (
          <FlatList
            ref={ref => (this.flatList = ref)}
            showsVerticalScrollIndicator={false}
            data={this.state.collection ? this.state.collection : []}
            // renderItem={this.renderFlatListData}
            keyExtractor={(item, index) => item.toString()}
            renderItem={({item, index, separators}) => (
              console.log('item', item),
              (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Profile1', {
                      data: item,
                      profilePic:
                        'http://dev2.thebetatest.com/' + item.profile_pic,
                    })
                  }>
                  <View style={styles.reglarUserView}>
                    <View style={{paddingHorizontal: 10}}>
                      <View style={[styles.vipUserInner1, styles.mb]}>
                        <View style={styles.vipImageView}>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate('Profile1', {
                                data: item,
                                profilePic:
                                  'http://dev2.thebetatest.com/' +
                                  item.profile_pic,
                              })
                            }>
                            <Image
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
                            <Text style={styles.vipName}>{item.FirstName}</Text>
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
                          </View>
                          {!this.isUserAlreadyFriend(item.id) ? (
                            <TouchableOpacity
                              style={styles.chatBadgetContView}
                              disabled={true}>
                              <Text style={styles.greenColor}>
                                {'Request Sent'}
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() =>
                                this.props.navigation.navigate('innerChat', {
                                  id: item.id,
                                })
                              }
                              style={{
                                backgroundColor: '#49c858',
                                borderRadius: 30,
                                height: 30,
                                width: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <FontAwesomeIcon
                                icon={faCommentDots}
                                color="#fff"
                                size={20}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            )}
          />
        )}

        <View style={styles.horizontal}>
          <Spinner
            textContent={'Loading...'}
            animation="fade"
            textStyle={styles.spinnerTextStyle}
            visible={this.state.showSpinner}
          />
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />

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
      </SafeAreaView>
    );
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
  },
  mb: {
    marginBottom: 10,
  },
  vipImageView: {
    flex: 1,
  },
  regularImageDimension: {
    width: 140,
    height: 145,
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
  chatMainView: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderColor: '#c5c5c5',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
  },
  chatImageView: {flex: 1, alignItems: 'center', marginRight: 10},
  chatImageDimension: {width: 56, height: 56},
  chatTxtContView: {flex: 4, flexDirection: 'row'},
  chatTxtView: {flex: 4},
  chatHeading: {fontSize: 16, color: '#252525', fontFamily: 'Poppins-SemiBold'},
  chatLabel: {fontSize: 12, color: '#252525', fontFamily: 'Poppins-Regular'},
  chatBadgetContView: {flex: 2, alignItems: 'center', justifyContent: 'center'},
  chatBadget: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: '#ff1822',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatBadgetTxt: {fontSize: 11, fontFamily: 'Poppins-Medium', color: '#fff'},
  greenColor: {
    color: '#39b54a',
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
    textDecorationLine: 'underline',
  },
  redColor: {
    color: '#ff1822',
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
    textDecorationLine: 'underline',
  },
  locationcont: {flexDirection: 'row'},
  locationImg: {marginRight: 5, width: 11, height: 16},
};
