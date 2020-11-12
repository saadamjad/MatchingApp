import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {colors, images} from '../../constants/theme';
import {EventRegister} from 'react-native-event-listeners';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAlignJustify,
  faArrowLeft,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

const Header = ({name, navigation, fliter, backBtn, search, drawer}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        backgroundColor: colors.headerColor,
        borderBottomColor: colors.ligthGrey,
        borderBottomWidth: 0.5,
        elevation: 1,
      }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {backBtn == true ? (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              // EventRegister.emit('isLoggedIn', 'ChatScreen');
              navigation?.goBack();
            }}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={24}
              color={colors.ligth}
            />
          </TouchableOpacity>
        ) : drawer == false ? null : (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.openDrawer()}>
            <FontAwesomeIcon
              icon={faAlignJustify}
              size={24}
              color={colors.ligth}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.headerHeading}>{name}</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {fliter == 1 ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Filter');
            }}>
            <Image style={{width: 28, height: 26}} source={images.fliterIcon} />
          </TouchableOpacity>
        ) : null}
        {search == true ? (
           <TouchableOpacity
           onPress={() => {
             navigation.navigate('Filter');
           }}>
          <FontAwesomeIcon icon={faSearch} size={24} color="#fff" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
const styles = {
  headerHeading: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'poppins-Medium',
  },
};

export {Header};
