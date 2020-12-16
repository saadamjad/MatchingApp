import React, {Component} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native';

import {colors, images} from '../../constants/theme';
import {Header} from '../common';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import { ScrollView } from 'react-native-gesture-handler';
const URL = 'http://dev2.thebetatest.com/api/getwishlist';

export default class ChatCmp extends Component {
  // static navigationOptions ={
  // 	drawerIcon:(
  // 		<Image source={images.wishlistIcon} style={{ width:36, height:36 }} />
  // 	)
  // }
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      userData: {},
      requestSent: false,
      chat: [
        {id: 0, image: images.chatSender1Icon, request: 0},
        {id: 1, image: images.chatSender2Icon, request: 1},
        {id: 2, image: images.chatSender1Icon, request: 0},
        {id: 3, image: images.chatSender2Icon, request: 1},
        {id: 4, image: images.chatSender1Icon, request: 0},
        {id: 5, image: images.chatSender2Icon, request: 1},
        {id: 6, image: images.chatSender1Icon, request: 0},
        {id: 7, image: images.chatSender2Icon, request: 1},
        {id: 8, image: images.chatSender1Icon, request: 0},
        {id: 9, image: images.chatSender2Icon, request: 1},
        {id: 10, image: images.chatSender1Icon, request: 0},
      ],
      wishList: {},
      checkUser: {},
      alreadyInterest: false,
    };
  }

  componentDidMount = async () => {
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this._GetAsynUserData();
    });
  };

  _checkIfAlreadyFriend = async (
    access_token,
    loggedInUserId,
    wishlistUserId,
  ) => {
    console.log(
      'access_token,loggedInUserId,wishlistUserId',
      access_token,
      loggedInUserId,
      wishlistUserId,
    );
    let headers = {
      headers: {
        Authorization: access_token,
      },
    };
    let data = {
      from: loggedInUserId,
      to: wishlistUserId,
    };
    // const data = {from: JSON.parse(user).user.id, to: this.state.data.id};
    // console.log(data);

    const URL = 'http://dev2.thebetatest.com/api/fav-int';

    return axios.post(URL, data, headers).then(
      response => {
        console.log(response.data);
        return response.data.collection.interest;
      },
      error => {
        console.log(error);
      },
    );
  };
  _GetAsynUserData = async () => {
    const user = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(user);
    console.log('user', userData);
    this.setState({userData: userData}, () =>
      this._GetWishtlistData(this.state.userData),
    );
  };
  _GetWishtlistData = async userData => {
    console.log('userData====', userData);
    let access_token = userData.access_token;
    let loggedInUserId = userData.user.id;

    let headers = {
      headers: {
        Authorization: access_token,
      },
    };
    axios.get(URL, headers).then(
      async response => {
        console.log('Api response', response.data);
        var i;
        let fav_users = response.data.fav_users.length;
        var wishlistUserId;
        let fav_users_data = response.data.fav_users;

        if (fav_users == 0) {
          console.log('no data ');
          this.setState({
            message: 'No user addded in wishlist',
          });
        } else {
          for (i = 0; i < fav_users; i++) {
            console.log('loop', i);
            wishlistUserId = response.data.fav_users[i].id;
            console.log(
              'fav_users',
              fav_users,
              'wishlistUserId',
              wishlistUserId,
            );
            let is = await this._checkIfAlreadyFriend(
              access_token,
              loggedInUserId,
              wishlistUserId,
            );
            fav_users_data[i].interest = is;
          }
          //   let data = {
          //     wishlistUserId,
          //   };
          this.setState(
            {
              wishList: {...response.data, fav_users: fav_users_data},
              // wishList: response.data,
            },
            () => console.log('state=====', this.state.wishList.fav_users),
          );
        }
      },
      error => {
        console.log(error);
      },
    );
  };
  _SendInterest = async (toID, fromID) => {
    console.log('_SendInterest', 'toId', toID, 'fromId', fromID);
    const URL = 'http://dev2.thebetatest.com/api/send-interest';
    let access_token = this.state.userData.access_token;
    console.log('access_token', access_token);

    let headers = {
      headers: {
        Authorization: access_token,
      },
    };
    let data = {
      to: toID,
      from: fromID,
      status: 'sent',
    };
    axios.post(URL, data, headers).then(
      response => {
        console.log(response.data);
        let status = response.data.status;
        if (status) {
          this.setState({
            requestSent: status,
          });
          alert('sent');
        }
      },
      error => {
        console.log('e', error);
      },
    );
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Header
          name={'Wishlist'}
          navigation={this.props.navigation}
          // search={true}
        />
        <ScrollView>
          {this.state.wishList?.fav_users?.map((item, i) => {
            // console.log('item', item);
            let profilePic = 'http://dev2.thebetatest.com/' + item.profile_pic;
            let toID = item.id;
            let fromID = this.state.userData.user.id;

            return (
              <View style={styles.chatMainView} key={i}>
                <View
                  style={{
                    width: '20%',
                    // borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 50,
                      width: 50,
                      //   borderWidth: 1,
                      borderRadius: 50,
                    }}>
                    <Image
                      style={styles.chatImageDimension}
                      source={{
                        uri: profilePic,
                      }}
                      style={{height: '100%', width: '100%'}}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <View style={styles.chatTxtContView}>
                  <View style={styles.chatTxtView}>
                    <Text style={styles.chatHeading}> {item.FirstName} </Text>
                    <View style={styles.locationcont}>
                      <Image
                        style={styles.locationImg}
                        source={images.locationIcon}
                      />
                      <Text style={styles.chatLabel}> {item.country} </Text>
                    </View>
                  </View>

                  {item.interest || this.state.requestSent ? (
                    <TouchableOpacity
                      style={styles.chatBadgetContView}
                      disabled={true}>
                      <Text style={styles.greenColor}>{'Request Sent'}</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.chatBadgetContView}
                      onPress={() => this._SendInterest(toID, fromID)}>
                      <Text style={styles.redColor}>{'Send Request'}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}
          <Text
            style={{
              color: 'red',
              textAlign: 'center',
              fontSize: 15,
              marginTop: 5,
            }}>
            {this.state.message}
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = {
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
