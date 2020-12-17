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

  _GetWishtlistData = async anty => {
    const user = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(user);
    const access_token = userData.access_token;
    const loggedInUserID = userData.user.id;
    const URL = `https://dev2.thebetatest.com/api/interest-users/${loggedInUserID}`;
    console.log('===================', URL);
    const SECONDURL = `https://dev2.thebetatest.com/api/allusers`;

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
                if (val.from == value.id) {
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

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Header
          name={'Interested People In you'}
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
                                onPress={() => this.deny(item.id)}>
                                {/* {this.state.isFriend ? (
                                <Image
                                  source={require('../../assets/correct.jpg')}
                                  style={{width: 20, height: 20}}
                                />
                              ) : ( */}
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  color="#fff"
                                  size={20}
                                />
                                {/* )} */}
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => this.accept(item.id)}
                                style={{
                                  padding: 7,
                                  backgroundColor: '#49c858',
                                  borderRadius: 30,
                                }}>
                                <FontAwesomeIcon
                                  icon={faCheck}
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
