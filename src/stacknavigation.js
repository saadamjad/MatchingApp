import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  AsyncStorage,
} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {color, images} from './constants/theme';

import Splash from './components/splash';

import SigninCmp from './components/auth/signin';
import SignupCmp from './components/auth/signup';
import SignupGetStartedCmp from './components/auth/signupGetStarted';

import HomeCmp from './components/main/home';
import ChatCmp from './components/main/chat';
import InnerChatCmp from './components/main/innerChat';
import FaqCmp from './components/main/faq';
import BlogsCmp from './components/main/blogs';
import EditProfileCmp from './components/main/editProfile';
import FilterCmp from './components/main/filter';
import WishlistCmp from './components/main/wishlist';
import MatchesCmp from './components/main/matches';
import AboutCmp from './components/main/about';
import WhyUsCmp from './components/main/whyUs';
import SuccessStoriesCmp from './components/main/SuccessStories';
import matchesSuggestionCmp from './components/main/matchesSuggestion';
import CardCmp from './components/main/card';
import ResetPasswordCmp from './components/main/resetPassword';
import InviteFriendsCmp from './components/main/inviteFriends';
import SubscriptionPlansCmp from './components/main/subscriptionplans';
import SubscriptionPlansCmp1 from './components/auth/subscriptionplans';
import ProfileCmp from './components/main/profile';
import InterestedPeopleInYou from './components/main/interestedPeopleInYou';
import YouinterestedinPeople from './components/main/YouinterestedinPeople';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Allfriend from './components/main/allfriends';
import updatepassword from './components/auth/updatepassword';
import SideMenuNavigator from './drawernavigation';
import Bottomtab from './bottomtab';

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

const StackChat = createStackNavigator();
function ChatStack() {
  return (
    <StackChat.Navigator initialRouteName="Chat">
      <StackChat.Screen
        name="Chat"
        component={ChatCmp}
        options={navOptionHandler}
      />
      <StackProfile.Screen
        name="innerChat"
        component={InnerChatCmp}
        options={navOptionHandler}
      />
    </StackChat.Navigator>
  );
}

const StackProfile = createStackNavigator();
function ProfileStack() {
  return (
    <StackProfile.Navigator initialRouteName="Profile">
      <StackProfile.Screen
        name="Profile"
        component={ProfileCmp}
        options={navOptionHandler}
      />
      <StackProfile.Screen
        name="EditProfile"
        component={EditProfileCmp}
        options={navOptionHandler}
      />
    </StackProfile.Navigator>
  );
}
function WishlistStack() {
  return (
    <StackProfile.Navigator initialRouteName="Wishlist">
      <StackProfile.Screen
        name="Wishlist"
        component={WishlistCmp}
        options={navOptionHandler}
      />
      <StackProfile.Screen
        name="Filter"
        component={FilterCmp}
        options={navOptionHandler}
      />
      <StackProfile.Screen
        name="innerChat"
        component={InnerChatCmp}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="Profile1"
        component={ProfileCmp}
        options={navOptionHandler}
      />
    </StackProfile.Navigator>
  );
}
function InviteFriendsStack() {
  return (
    <StackProfile.Navigator initialRouteName="Invite Friends">
      <StackProfile.Screen
        name="Invite Friends"
        component={InviteFriendsCmp}
        options={navOptionHandler}
      />
      <StackProfile.Screen
        name="Filter"
        component={FilterCmp}
        options={navOptionHandler}
      />
      <StackProfile.Screen
        name="innerChat"
        component={InnerChatCmp}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="Profile1"
        component={ProfileCmp}
        options={navOptionHandler}
      />
    </StackProfile.Navigator>
  );
}
function SubscribePlanStack() {
  return (
    <StackProfile.Navigator initialRouteName="subscribePlan">
      <StackProfile.Screen
        name="subscribePlan"
        component={SubscriptionPlansCmp}
        options={navOptionHandler}
      />
      <StackProfile.Screen
        name="Filter"
        component={FilterCmp}
        options={navOptionHandler}
      />
      <StackProfile.Screen
        name="innerChat"
        component={InnerChatCmp}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="Profile1"
        component={ProfileCmp}
        options={navOptionHandler}
      />
    </StackProfile.Navigator>
  );
}
function FaqStack() {
  return (
    <StackProfile.Navigator initialRouteName="faq">
      <StackProfile.Screen
        name="faq"
        component={FaqCmp}
        options={navOptionHandler}
      />
      <StackProfile.Screen
        name="Filter"
        component={FilterCmp}
        options={navOptionHandler}
      />
      <StackProfile.Screen
        name="innerChat"
        component={InnerChatCmp}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="Profile1"
        component={ProfileCmp}
        options={navOptionHandler}
      />
    </StackProfile.Navigator>
  );
}
function AboutStack() {
  return (
    <StackProfile.Navigator initialRouteName="About">
      <StackProfile.Screen
        name="About"
        component={AboutCmp}
        options={navOptionHandler}
      />
      <StackProfile.Screen
        name="Filter"
        component={FilterCmp}
        options={navOptionHandler}
      />
      <StackProfile.Screen
        name="innerChat"
        component={InnerChatCmp}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="Profile1"
        component={ProfileCmp}
        options={navOptionHandler}
      />
    </StackProfile.Navigator>
  );
}

function matchesSuggestionStack() {
  return (
    <StackProfile.Navigator initialRouteName="matchesSuggestionCmp">
      <StackProfile.Screen
        name="matchesSuggestionCmp"
        component={matchesSuggestionCmp}
        options={navOptionHandler}
      />
      <StackProfile.Screen
        name="Filter"
        component={FilterCmp}
        options={navOptionHandler}
      />
      <StackProfile.Screen
        name="innerChat"
        component={InnerChatCmp}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="Profile1"
        component={ProfileCmp}
        options={navOptionHandler}
      />
    </StackProfile.Navigator>
  );
}

function interestedPeopleInYou() {
  return (
    <StackMatches.Navigator initialRouteName="InterestedPeopleInYou">
      <StackMatches.Screen
        name="InterestedPeopleInYou"
        component={InterestedPeopleInYou}
        options={navOptionHandler}
      />

      <StackProfile.Screen
        name="innerChat"
        component={InnerChatCmp}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="Profile1"
        component={ProfileCmp}
        options={navOptionHandler}
      />
    </StackMatches.Navigator>
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
const StackMatches = createStackNavigator();
function MatchesStack() {
  return (
    <StackMatches.Navigator initialRouteName="Matches">
      <StackMatches.Screen
        name="Matches"
        component={MatchesCmp}
        options={navOptionHandler}
      />
      <StackMatches.Screen
        name="Filter"
        component={FilterCmp}
        options={navOptionHandler}
      />
      <StackProfile.Screen
        name="innerChat"
        component={InnerChatCmp}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="Profile1"
        component={ProfileCmp}
        options={navOptionHandler}
      />
    </StackMatches.Navigator>
  );
}
const stack = createStackNavigator();
export default class App extends React.Component {
  stat = {
    logged: true,
  };
  componentDidMount() {
    this._retrieveData();
  }
  _retrieveData = async () => {
    AsyncStorage.getItem('checkUserLoggedin').then(res => {
      console.log('check user====== -', res);

      if (res == 'login') {
        this.setState({
          logged: true,
        });
      }
    });
  };

  render() {
    return (
      <NavigationContainer>
        <stack.Navigator initialRouteName="Auth">
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
  }
}
