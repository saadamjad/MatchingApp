import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  AsyncStorage,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import SigninCmp from './components/auth/signin';
import SignupCmp from './components/auth/signup';
import SignupGetStartedCmp from './components/auth/signupGetStarted';

import HomeCmp from './components/main/home';
import ChatCmp from './components/main/chat';
import InnerChatCmp from './components/main/innerChat';

import FilterCmp from './components/main/filter';
import WishlistCmp from './components/main/wishlist';

import SubscriptionPlansCmp1 from './components/auth/subscriptionplans';
import ProfileCmp from './components/main/profile';
import InterestedPeopleInYou from './components/main/interestedPeopleInYou';
import YouinterestedinPeople from './components/main/YouinterestedinPeople';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Allfriend from './components/main/allfriends';
import updatepassword from './components/auth/updatepassword';
import SideMenuNavigator from './drawernavigation';

import Bottomtab from './bottomtab';
import {toHtml} from '@fortawesome/fontawesome-svg-core';

const navOptionHandler = () => ({
  headerShown: false,
});

const StackAuth = createStackNavigator();
function AuthStack() {
  return (
    <StackAuth.Navigator initialRouteName="SignupGetStartedCmp">
      <StackAuth.Screen
        name="GetStarted"
        component={SignupGetStartedCmp}
        options={navOptionHandler}
      />
      <StackAuth.Screen
        name="Signin"
        component={SigninCmp}
        options={navOptionHandler}
      />
      <StackAuth.Screen
        name="SubscribePlan"
        component={SubscriptionPlansCmp1}
        options={navOptionHandler}
      />
      <StackAuth.Screen
        name="Signup"
        component={SignupCmp}
        options={navOptionHandler}
      />
      <StackAuth.Screen
        name="updatepassword"
        component={updatepassword}
        options={navOptionHandler}
      />
    </StackAuth.Navigator>
  );
}

const StackHome = createStackNavigator();
function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen
        name="Home"
        component={HomeCmp}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="Profile1"
        component={ProfileCmp}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="innerChat"
        component={InnerChatCmp}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="YouShowedinterest"
        component={YouShowedinterest}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="InterestedPeopleInYou"
        component={InterestedPeopleInYou}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="WishlistCmp"
        component={WishlistCmp}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="Filter"
        component={FilterCmp}
        options={navOptionHandler}
      />
    </StackHome.Navigator>
  );
}

const stackYoushowedinterest = createStackNavigator();
function YouShowedinterest() {
  return (
    <stackYoushowedinterest.Navigator initialRouteName="YouinterestedinPeople">
      <stackYoushowedinterest.Screen
        name="YouinterestedinPeople"
        component={YouinterestedinPeople}
        options={navOptionHandler}
      />

      <stackYoushowedinterest.Screen
        name="innerChat"
        component={InnerChatCmp}
        options={navOptionHandler}
      />
      <stackYoushowedinterest.Screen
        name="Profile1"
        component={ProfileCmp}
        options={navOptionHandler}
      />
    </stackYoushowedinterest.Navigator>
  );
}

const stack = createStackNavigator();
export default class App extends React.Component {
  state = {
    logged: true,
    show: false,
  };
  componentDidMount() {
    this._retrieveData();
  }
  _retrieveData = async () => {
    AsyncStorage.getItem('checkUserLoggedin').then(res => {
      // console.log('check user======>>> -', res);
      if (res == 'login') {
        console.log('uajan pe ');
        this.setState({
          show: true,
          value: res,
        });
      } else {
        this.setState({
          show: true,
        });
      }
    });
  };

  _Auth = value => {
    console.log('auth', value);
    return (
      <NavigationContainer>
        {console.log('if', this.state.logged)}
        <stack.Navigator
          initialRouteName={value == 'login' ? 'SideMenuNavigator' : 'Auth'}>
          <stack.Screen
            name="Auth"
            component={AuthStack}
            options={navOptionHandler}
          />
          <stack.Screen
            name="HomeStack"
            component={HomeStack}
            options={navOptionHandler}
          />
          <stack.Screen
            name="SideMenuNavigator"
            component={SideMenuNavigator}
            options={navOptionHandler}
          />
          <stack.Screen
            name="Bottomtab"
            component={Bottomtab}
            options={navOptionHandler}
          />
        </stack.Navigator>
      </NavigationContainer>
    );
  };
  _SiderBar = () => {
    console.log('side');

    return (
      <NavigationContainer>
        {console.log('if', this.state.logged)}
        <stack.Navigator initialRouteName={'Auth'}>
          <stack.Screen
            name="Auth"
            component={AuthStack}
            options={navOptionHandler}
          />
          <stack.Screen
            name="HomeStack"
            component={HomeStack}
            options={navOptionHandler}
          />
          <stack.Screen
            name="SideMenuNavigator"
            component={SideMenuNavigator}
            options={navOptionHandler}
          />
          <stack.Screen
            name="Bottomtab"
            component={Bottomtab}
            options={navOptionHandler}
          />
        </stack.Navigator>
      </NavigationContainer>
    );
  };
  render() {
    return this.state.show ? this._Auth(this.state.value) : null;
  }
}
