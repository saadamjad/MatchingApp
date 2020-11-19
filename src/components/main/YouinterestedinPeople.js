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
  faMale,
} from '@fortawesome/free-solid-svg-icons';

import {Header} from '../common';
import {
  faAlignJustify,
  faArrowLeft,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

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
      this.getData();
    });
  }

  handleCancel() {
    this.setState({showAlert: false});
  }

  async getData(i) {
    console.log('getData index: ', i);
    let URL;
    if (i == undefined) {
      URL = 'http://dev2.thebetatest.com/api/allusers';
    } else {
      URL = 'http://dev2.thebetatest.com/api/allusers?page=' + i;
    }

    const user = await AsyncStorage.getItem('userData');
    const access_token = JSON.parse(user).access_token;
    console.log(access_token);
    let headers = {
      headers: {
        Authorization: access_token,
      },
    };

    this.setState({showSpinner: true});
    axios
      .get(URL, headers)
      .then(async res => {
        this.setState({
          showSpinner: false,
          usersData: res.data,
          collection: res.data.collection.data,
        });
        console.log(res.data);
      })
      .catch(error => {
        console.log('error', error);
        this.setState({
          showSpinner: false,
          showAlert: true,
          errorMsg: 'Something went wrong. ' + error,
          errorTitle: 'Error!!',
        });
      });
  }

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
    const URL = 'http://dev2.thebetatest.com/api/send-interest';
    axios.post(URL, data, headers).then(
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
  addUser(i) {
    console.log('it', i);
    return (
      <View
        style={{
          padding: 8,
          backgroundColor: '#ed145b',
          borderRadius: 30,
          justifyContent: 'center',
          marginRight: 7,
        }}>
        <FontAwesomeIcon icon={faUserPlus} color="#fff" size={20} />
      </View>
    );
  }

  friendRequestSent() {
    return (
      <View
        style={{
          padding: 8,
          backgroundColor: '#aeadad',
          borderRadius: 30,
          justifyContent: 'center',
          marginRight: 7,
        }}>
        <FontAwesomeIcon icon={faUserCheck} color="#fff" size={20} />
      </View>
    );
  }

  _GetWishtlistData = async anty => {
    const user = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(user);
    const access_token = userData.access_token;
    const loggedInUserID = userData.user.id;

    // const loggedInUserID = userData.user.id;
    const URL = `https://dev2.thebetatest.com/api/get-interest-users/${loggedInUserID}`;
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

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Header
          name={'You Showed Interest In'}
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
                <View
                  key={item.key}
                  onPress={() => this.addFriend(item)}
                  onShowUnderlay={separators.highlight}
                  onHideUnderlay={separators.unhighlight}>
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
                                  this.props.navigation.navigate('innerChat')
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
                </View>
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
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
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
};
