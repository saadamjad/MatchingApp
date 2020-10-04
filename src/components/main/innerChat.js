import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  BackHandler,
} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
import {colors, images} from '../../constants/theme';
import Slider from '@react-native-community/slider';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMicrophone, faPlay, faPause} from '@fortawesome/free-solid-svg-icons';

import {Header} from '../common';

export default class InnerChatCmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: true,
      sliderVal: 0,
      keyboardOpen: 0,
      time: '00:00',
      chat: [
        {
          id: 0,
          message:
            'Hi Lina How are you? where are you working? i wana meet you',
          sender: 0,
          time: '10:24 AM',
          time: '10:24 AM',
        },
        {
          id: 1,
          message: 'Hey Hetin I am Fine and what about you?',
          sender: 1,
          time: '10:25 AM',
        },
        {id: 2, message: 'I wana meet you', sender: 0, time: '10:25 AM'},
        {
          id: 3,
          message: 'when you free then call me',
          sender: 0,
          time: '10:28 AM',
        },
        {id: 4, message: 'Sure', sender: 1, time: '10:29 AM'},
        {id: 5, message: 'Thanks', sender: 0, time: '10:30 AM'},
      ],
    };
    this.setVal = this.setVal.bind(this);
  }
  UNSAFE_componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        this.setState({keyboardOpen: 1});
      },
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      e => {
        this.setState({keyboardOpen: 0});
      },
    );
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick = () => {
    EventRegister.emit('isLoggedIn', 'ChatScreen');
  };
  setVal() {
    if (this.state.play == false) {
      if (this.state.sliderVal < 10) {
        this.setState(
          {
            sliderVal: this.state.sliderVal + 1,
            time: '00:0' + parseInt(this.state.sliderVal + 1),
          },
          () => {
            setTimeout(() => {
              this.setVal();
            }, 900);
          },
        );
      } else {
        this.setState({
          sliderVal: 0,
          play: true,
          time: '00:00',
        });
      }
    }
  }
  playPause(status) {
    this.setState(
      {
        play: status,
      },
      () => {
        if (status == false) {
          this.setVal();
        }
      },
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Header
          name={'@Lina87'}
          navigation={this.props.navigation}
          backBtn={true}
          search={true}
        />
        <View style={{flex: 10}}>
          <ScrollView
            style={{marginHorizontal: 5}}
            ref={ref => {
              this.scrollView = ref;
            }}
            onContentSizeChange={() =>
              this.scrollView.scrollToEnd({animated: true})
            }>
            {this.state.chat.map((val, i) => {
              return (
                <View key={i} style={styles.chatMainView}>
                  <View
                    style={
                      val.sender == 0
                        ? styles.ChatBoxViewStart
                        : styles.ChatBoxViewEnd
                    }>
                    <View style={{flexDirection: 'row'}}>
                      {val.sender == 0 ? (
                        <Image
                          style={{marginRight: 5, width: 38, height: 38}}
                          source={images.boyWidget}
                        />
                      ) : null}
                      <View
                        style={
                          val.sender == 0
                            ? styles.senderChat
                            : styles.receiverChat
                        }>
                        <Text style={styles.chatHeading}>{val.message}</Text>
                      </View>
                      {val.sender == 1 ? (
                        <Image
                          style={{marginLeft: 5, width: 38, height: 38}}
                          source={images.boyWidget}
                        />
                      ) : null}
                    </View>
                    <View style={styles.chatBadgetContView}>
                      <Text
                        style={
                          val.sender == 0
                            ? styles.timeSender
                            : styles.timeReciver
                        }>
                        {val.time}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
            <View style={styles.chatMainView}>
              <View style={styles.ChatBoxViewStart}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{marginRight: 5, width: 38, height: 38}}
                    source={images.boyWidget}
                  />
                  <View style={styles.senderChat}>
                    <View style={{flexDirection: 'row', marginBottom: -5}}>
                      <View>
                        {this.state.play == true ? (
                          <TouchableOpacity
                            onPress={() => {
                              this.playPause(false);
                            }}>
                            <FontAwesomeIcon
                              icon={faPlay}
                              size={20}
                              color="#ff1822"
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              this.playPause(true);
                            }}>
                            <FontAwesomeIcon
                              icon={faPause}
                              size={20}
                              color="#ff1822"
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                      <View>
                        <Slider
                          style={{width: 200}}
                          value={this.state.sliderVal}
                          minimumValue={0}
                          maximumValue={10}
                          thumbTintColor="#fb5556"
                          minimumTrackTintColor="#fb5556"
                          maximumTrackTintColor="#000000"
                        />
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 8,
                            fontFamily: 'Poppins-Regular',
                            color: '#fb5556',
                          }}>
                          {this.state.time}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={
            this.state.keyboardOpen == 0
              ? styles.footerViewKeyboardClose
              : styles.footerViewKeyboardOpen
          }>
          <FontAwesomeIcon icon={faMicrophone} size={28} color="#ff1822" />
          <TextInput style={styles.textInputStyle} />
          <TouchableOpacity style={{justifyContent: 'center'}}>
            <Text style={styles.btnStyle}>SEND</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = {
  chatMainView: {flex: 1, flexDirection: 'row', padding: 10},
  ChatBoxViewStart: {flex: 1, alignItems: 'flex-start'},
  ChatBoxViewEnd: {flex: 1, alignItems: 'flex-end'},
  senderChat: {
    maxWidth: 250,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fb5556',
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#f2e6ea',
  },
  receiverChat: {
    maxWidth: 250,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#04b4fd',
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#d4e7ed',
  },
  timeSender: {
    fontSize: 12,
    fontFamily: 'Poppins-Reglar',
    color: '#594d4d',
    marginLeft: 45,
  },
  timeReciver: {
    fontSize: 12,
    fontFamily: 'Poppins-Reglar',
    color: '#594d4d',
    marginRight: 45,
  },
  footerViewKeyboardOpen: {
    flex: 1.5,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  footerViewKeyboardClose: {
    flex: 0.7,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  textInputStyle: {
    width: 250,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  btnStyle: {fontSize: 16, fontFamily: 'Poppins-SemiBold', color: '#ff1822'},
  chatImageView: {flex: 1, alignItems: 'center', marginRight: 10},
  chatImageDimension: {width: 56, height: 56},
  chatTxtContView: {flex: 4, flexDirection: 'row'},
  chatTxtView: {flex: 4},
  chatHeading: {fontSize: 14, color: '#252525', fontFamily: 'Poppins-Medium'},
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
