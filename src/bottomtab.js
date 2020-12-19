import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  AsyncStorage,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import HomeCmp from './components/main/home';
import ChatCmp from './components/main/chat';
import InnerChatCmp from './components/main/innerChat';

import EditProfileCmp from './components/main/editProfile';
import FilterCmp from './components/main/filter';
import WishlistCmp from './components/main/wishlist';
import MatchesCmp from './components/main/matches';

import matchesSuggestionCmp from './components/main/matchesSuggestion';

import ProfileCmp from './components/main/profile';
import InterestedPeopleInYou from './components/main/interestedPeopleInYou';
import YouinterestedinPeople from './components/main/YouinterestedinPeople';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Allfriend from './components/main/allfriends';
// import YouShowedinterest from './components/main/YouinterestedinPeople'
import updatepassword from './components/auth/updatepassword';
const navOptionHandler = () => ({
  headerShown: false,
});
const StackHome = createStackNavigator();
//
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
        name="YouinterestedinPeople"
        component={YouinterestedinPeople}
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

const Tab = createBottomTabNavigator();
const Bottomtab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({})}
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#ccc',
        style: {
          backgroundColor: '#ff1822',
          paddingTop: 5,
          paddingBottom: 5,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, size, tintColor}) => (
            <Image
              source={require('./assets/icons/menu/home-icon.png')}
              style={{width: 30, height: 25, tintColor: color}}
              // style={[focused ? styles.drawerActive : styles.drawerInActive, { height: 25, width: 20 }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Find Friends"
        component={Allfriend}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./assets/icons/menu/find-match-icon.png')}
              style={{width: 30, height: 25, tintColor: color}}
              // style={[focused ? styles.drawerActive : styles.drawerInActive, { height: 25, width: 20 }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./assets/icons/menu/chat.png')}
              style={{width: 30, height: 25, tintColor: color}}
              // style={[focused ? styles.drawerActive : styles.drawerInActive, { height: 25, width: 20 }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={matchesSuggestionStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./assets/icons/menu/matches-icon.png')}
              style={{width: 35, height: 25, tintColor: color}}
              // style={[focused ? styles.drawerActive : styles.drawerInActive, { height: 25, width: 20 }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={EditProfileCmp}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./assets/icons/menu/profile-icon.png')}
              style={{width: 20, height: 20, tintColor: color}}
              // style={[focused ? styles.drawerActive : styles.drawerInActive, { height: 25, width: 20 }]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Bottomtab;
