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
import Stacknavigation from './stacknavigation';
const AppContainerStack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return <Stacknavigation navigation {...this.props} />;
  }
}
