import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import {Header} from '../common';
import axios from 'axios';

import stripe from 'tipsi-stripe';
stripe.setOptions({
  publishableKey: 'pk_test_7bD8okAzqCQyHl2frPM4WFkB',
  merchantId: 'MERCHANT_ID', // Optional
  androidPayMode: 'test', // Android only
});

const App = props => {
  useEffect(() => {
    // addFriend();
    // sendData();
  }, []);
  let amount = props.route?.params?.amount;
  const [state, setState] = useState({
    cardHolderName: '',
    cardNumber: '',
    year: '',
    month: '',
    cvc: '',
  });
  const sendData = async () => {
    console.log('helo beta ', state);
    let month = Number(state.month);
    let year = Number(state.year);
    const options = {
      number: '4242 4242 4242 4242',
      expMonth: month,
      expYear: year,
      cvc: state.cvc,
      // optional
      name: state.cardHolderName,
      currency: 'usd',
    };

    stripe
      .createTokenWithCard(options)
      .then(res => {
        console.log('res', res);
        props.navigation.navigate('Signup', {
          amount: 29,
          stipePaymentToken: res.tokenId,
          // email
        });
      })
      .catch(error => {
        console.log('error=', error);
      });
  };

  const addFriend = async token => {
    const user = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(user);
    // console.log('user', userData.user.id);
    let headers = {
      headers: {
        Authorization: userData.access_token,
      },
    };
    const data = {
      amount: amount,
      stripeToken: 'sk_test_pUCRddWBVRQdOmUrE9DQJU0I',
      email: 'saad@gmail.com',
      phone: '223323232',
      password: '123554',
      verification_code: '1231',
      verify: '1',
      FirstName: 'saad',
      UserName: 'saad',
      Age: 20,
      Gender: 'on',
      country_id: '1',
      state_id: '1',
      city_id: '1',
      isactive: '1',
      profile_pic:
        'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg',
    };
    const URL = 'https://api.matchelitemuslim.com/api/payment';
    axios.post(URL, data, headers).then(
      resposne => {
        console.log('api response ', resposne.data);
      },
      error => {
        // this.setState({showSpinner: false});
        console.log('error', error);
      },
    );
  };
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
            onChangeText={text => {
              setState({...state, cardHolderName: text});
            }}
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
            onChangeText={text => {
              setState({...state, cardNumber: text});
            }}
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
          }}>
          <TextInput
            placeholder="Year"
            style={{
              width: 130,
              borderRadius: 50,
              paddingLeft: 10,
              height: 50,
              elevation: 1,
              backgroundColor: 'white',
            }}
            maxLength={4}
            onChangeText={text => {
              setState({...state, year: text});
            }}
          />
          <TextInput
            placeholder="Month"
            style={{
              width: 130,
              borderRadius: 50,
              paddingLeft: 10,
              height: 50,
              elevation: 1,
              backgroundColor: 'white',
            }}
            maxLength={4}
            onChangeText={text => {
              setState({...state, month: text});
            }}

            // keyboardType={'phone-pad'}
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
            onChangeText={text => {
              setState({...state, cvc: text});
            }}
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
          }}
          onPress={() => sendData()}>
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
          }}
          onPress={() => props.navigation.goBack()}>
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
