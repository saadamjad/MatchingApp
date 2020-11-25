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
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Header
          name={'Your Friends '}
          navigation={this.props.navigation}
          // fliter="1"
        />
        <Text style={{textAlign: 'center'}}> Backend API NOT READY YET </Text>
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
