import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Header} from '../common';

const App = props => {
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header
        name={'Subscription Plans'}
        navigation={props.navigation}
        search={true}
      />
      <View
        style={{
          width: '80%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#222',
            borderRadius: 30,
            marginVertical: 10,
            width: '100%',
            height: 50,
            elevation: 1.5,
            alignItems: 'center',
            marginVertical: 20,
            backgroundColor: '#fff',
          }}>
          <TextInput
            placeholder="Name on Card"
            placeholderTextColor="#000"
            style={{width: '100%', marginLeft: 15}}
          />
        </View>

        {/* ============Card Number============ */}

        <View
          style={{
            borderWidth: 1,
            borderColor: '#222',
            borderRadius: 30,
            width: '100%',
            height: 50,
            alignItems: 'center',
            elevation: 1.5,
            backgroundColor: '#fff',
          }}>
          <TextInput
            placeholder="Enter Card Number"
            placeholderTextColor="#000"
            keyboardType="number-pad"
            style={{width: '100%', marginLeft: 15}}
          />
        </View>
        {/* ==========Cards Images Row========== */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '58%',
            alignSelf: 'center',
            justifyContent: 'space-evenly',
            marginVertical: 10,
            marginTop: 20,
            //   backgroundColor: 'red',
          }}>
          <TouchableOpacity style={{height: 20, width: 32, marginLeft: 3}}>
            {/* <Image
              source={require('../../images/card1.png')}
              resizeMode={'cover'}
              style={{height: '100%', width: '100%'}}
            /> */}
          </TouchableOpacity>

          <TouchableOpacity style={{height: 20, width: 32, marginLeft: 3}}>
            {/* <Image
              source={require('../../images/card2.png')}
              resizeMode={'cover'}
              style={{height: '100%', width: '100%'}}
            /> */}
          </TouchableOpacity>

          <TouchableOpacity style={{height: 20, width: 32, marginLeft: 3}}>
            {/* <Image
              source={require('../../images/card3.png')}
              resizeMode={'cover'}
              style={{height: '100%', width: '100%'}}
            /> */}
          </TouchableOpacity>

          <TouchableOpacity style={{height: 20, width: 35, marginLeft: 3}}>
            {/* <Image
              source={require('../../images/card4.png')}
              resizeMode={'cover'}
              style={{height: '100%', width: '100%'}}
            /> */}
          </TouchableOpacity>
        </View>

        {/* ==========Expiry & CVV Row========== */}

        <Text
          style={{
            color: '#222',
            fontWeight: 'bold',
            fontSize: 17,
            marginVertical: 10,
          }}>
          Expiration Date
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            zIndex: 10000,
          }}>
          <DropDownPicker
            items={[
              {label: 'January', value: 'JAN'},
              {label: 'Feburary', value: 'FEB'},
              {label: 'March', value: 'MAR'},
              {label: 'April', value: 'APR'},
              {label: 'May', value: 'MAY'},
              {label: 'June', value: 'JUN'},
              {label: 'Jully', value: 'JUL;'},
              {label: 'August', value: 'AUG'},
              {label: 'September', value: 'SEP'},
              {label: 'October', value: 'OCT'},
              {label: 'November', value: 'NOV'},
              {label: 'December', value: 'DEC'},
            ]}
            containerStyle={{width: 130, borderRadius: 50, height: 50}}
            dropDownStyle={{backgroundColor: 'white', borderRadius: 30}}
            arrowColor="#ff1822"
            // style={{borderRadius:30}}
            placeholder="Month"
            // itemStyle={{}}
          />
          <DropDownPicker
            items={[
              {label: 'January', value: 'JAN'},
              {label: 'Feburary', value: 'FEB'},
              {label: 'March', value: 'MAR'},
              {label: 'April', value: 'APR'},
              {label: 'May', value: 'MAY'},
              {label: 'June', value: 'JUN'},
              {label: 'Jully', value: 'JUL;'},
              {label: 'August', value: 'AUG'},
              {label: 'September', value: 'SEP'},
              {label: 'October', value: 'OCT'},
              {label: 'November', value: 'NOV'},
              {label: 'December', value: 'DEC'},
            ]}
            containerStyle={{width: 130, borderRadius: 50, height: 50}}
            dropDownStyle={{backgroundColor: 'teal', borderRadius: 30}}
            arrowColor="#ff1822"
            // style={{borderRadius:30}}
            placeholder="Year"
            // itemStyle={{}}
          />
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#272727',
            borderRadius: 30,
            elevation: 1.5,
            width: '100%',
            height: 50,
            marginVertical: 20,
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <TextInput
            placeholder="Security Code"
            placeholderTextColor="#000"
            keyboardType="number-pad"
            style={{width: '80%'}}
          />
        </View>

        {/* ==========Buttons========== */}

        <TouchableOpacity
          style={{
            height: 50,
            width: '100%',
            backgroundColor: '#ff1822',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 15,
            elevation: 4,
          }}>
          <Text
            style={{
              color: '#FFF',
              fontWeight: 'bold',
              fontSize: 22,
              letterSpacing: 3,
            }}>
            PAY
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 50,
            width: '100%',
            backgroundColor: '#1e1e1e',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
            elevation: 4,
          }}>
          <Text
            style={{
              color: '#FFF',
              fontWeight: 'bold',
              fontSize: 22,
              letterSpacing: 0.5,
            }}>
            CANCEL
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
