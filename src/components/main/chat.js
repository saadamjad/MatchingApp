import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

import {EventRegister} from 'react-native-event-listeners';
import {colors, images} from '../../constants/theme';
import {Header} from '../common';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import { ScrollView } from 'react-native-gesture-handler';

export default class ChatCmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: [
        // {id: 0, image: images.chatSender1Icon, badget: 3},
        // {id: 1, image: images.chatSender2Icon, badget: 2},
        // {id: 2, image: images.chatSender1Icon, badget: 3},
        // {id: 3, image: images.chatSender2Icon, badget: 0},
        // {id: 4, image: images.chatSender1Icon, badget: 3},
        // {id: 5, image: images.chatSender2Icon, badget: 2},
        // {id: 6, image: images.chatSender1Icon, badget: 3},
        // {id: 7, image: images.chatSender2Icon, badget: 0},
        // {id: 8, image: images.chatSender1Icon, badget: 3},
        // {id: 9, image: images.chatSender2Icon, badget: 2},
        // {id: 10, image: images.chatSender1Icon, badget: 3},
      ],
    };
  }

  async componentDidMount() {
    const user = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(user);
    const loggedInUserID = userData.user.id;
    const access_token = userData.access_token;
    this.setState({
      loader: true,
    });
    axios
      .post(
        `http://dev2.thebetatest.com/api/show-all-chat`,
        {
          user_id: loggedInUserID,
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
        // this.setState({step: 1});
        this.setState({
          chat: res.data?.users,
        });
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
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Header
          name={'Chat'}
          navigation={this.props.navigation}
          search={true}
        />
        <ScrollView>
          {this.state.loader ? (
            <ActivityIndicator color="red" size="large" />
          ) : (
            this.state?.chat.length > 0 &&
            this.state.chat.map((val, i) => {
              return (
                <TouchableOpacity
                  // onPress={() => EventRegister.emit('isLoggedIn', 'Chat')}
                  onPress={() =>
                    this.props.navigation.navigate('innerChat', {
                      id: val.id,
                      userName: val.UserName,
                    })
                  }
                  key={i}
                  style={styles.chatMainView}>
                  <View style={styles.chatImageView}>
                    <View style={styles.chatImageDimension}>
                      <Image
                        style={styles.chatImageDimension}
                        source={val.profile_pic}
                      />
                    </View>
                  </View>

                  <View style={styles.chatTxtContView}>
                    <View style={styles.chatTxtView}>
                      <Text style={styles.chatHeading}>@{val.UserName}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
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
    borderBottomColor: '#c5c5c5',
    borderBottomWidth: 2,
  },
  chatImageView: {
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
    // borderWidth: 0.6,
  },
  chatImageDimension: {width: 56, height: 56, borderWidth: 1, borderRadius: 56},
  chatTxtContView: {flex: 4, flexDirection: 'row'},
  chatTxtView: {flex: 4, justifyContent: 'center'},
  chatHeading: {fontSize: 16, color: '#252525', fontFamily: 'Poppins-SemiBold'},
  chatLabel: {fontSize: 12, color: '#252525', fontFamily: 'Poppins-Regular'},
  chatBadgetContView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  chatBadget: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: '#ff1822',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatBadgetTxt: {fontSize: 11, fontFamily: 'Poppins-Medium', color: '#fff'},
};
