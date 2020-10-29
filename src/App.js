import * as React from 'react';
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
import FindMatchCmp from './components/main/findMatch';
import ProfileCmp from './components/main/profile';
import YoutubeCmp from './components/main/youtube';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faComments,
  faUser,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const navOptionHandler = () => ({
  headerShown: false,
});

function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={styles.safeViewCont}>
      <View style={styles.cont}>
        <View style={styles.imgViewCont}>
          <View style={styles.imgView}>
            <Image style={styles.imgSize} source={images.profileImgIcon} />
          </View>
        </View>
        <View style={styles.txtViewCont}>
          <View style={styles.txtView}>
            <View style={styles.txtViewCenter}>
              <Text style={styles.nameTxt}>@dwayne115</Text>
              <TouchableOpacity style={styles.vipBtn}>
                <Text style={styles.vipTxt}>VIP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('EditProfile')}
                style={styles.profileBtn}>
                <Text style={styles.profileTxt}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.5}} />
          </View>
        </View>
      </View>
      <View style={{flex: 3}}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <TouchableOpacity
          onPress={() => {
            console.log('helo');
            AsyncStorage.removeItem('checkUserLoggedin').then(res => {
              console.log('remove item done', res);
              props.navigation.navigate('Logout');
            });
          }}
          style={styles.profileBtn}>
          <Text style={styles.profileTxt}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

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
      {/* <StackHome.Screen name='ChatInner' component={InnerChatCmp} options={navOptionHandler}/>
      <StackHome.Screen name='ChatCmp' component={ChatCmp} options={navOptionHandler}/> */}
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
    </StackChat.Navigator>
  );
}

const StackFindMatch = createStackNavigator();
function FindMatchStack() {
  return (
    <StackFindMatch.Navigator initialRouteName="FindMatch">
      <StackFindMatch.Screen
        name="FindMatch"
        component={FindMatchCmp}
        options={navOptionHandler}
      />
    </StackFindMatch.Navigator>
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
    </StackMatches.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
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
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./assets/icons/menu/home-icon.png')}
              style={{width: 30, height: 25}}
              // style={[focused ? styles.drawerActive : styles.drawerInActive, { height: 25, width: 20 }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FindMatch"
        component={MatchesStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./assets/icons/menu/find-match-icon.png')}
              style={{width: 30, height: 25}}
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
              style={{width: 30, height: 25}}
              // style={[focused ? styles.drawerActive : styles.drawerInActive, { height: 25, width: 20 }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./assets/icons/menu/chat-filled-icon.png')}
              style={{width: 30, height: 25}}
              // style={[focused ? styles.drawerActive : styles.drawerInActive, { height: 25, width: 20 }]}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./assets/icons/menu/profile-icon.png')}
              style={{width: 30, height: 25}}
              // style={[focused ? styles.drawerActive : styles.drawerInActive, { height: 25, width: 20 }]}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

// const Logout = async () => {
//   console.log('helo');
//   await AsyncStorage.removeItem('checkUserLoggedin').then(res => {
//     console.log('remove item done', res);
//     return AuthStack;
//   });
// };
const Drawer = createDrawerNavigator();
function SideMenuNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="MenuTab"
      drawerContent={props => CustomDrawerContent(props)}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./assets/icons/menu/home.png')}
              style={[
                focused ? styles.drawerActive : styles.drawerInActive,
                {height: size, width: size},
              ]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Filter"
        component={FilterCmp}
        options={{
          title: '',
          // drawerIcon: ({focused, size}) => (
          //   <Image
          //     source={require('./assets/icons/menu/profile.png')}
          //     style={[
          //       focused ? styles.drawerActive : styles.drawerInActive,
          //       {height: 19, width: 20},
          //     ]}
          //   />
          // ),
        }}
      />
      <Drawer.Screen
        name="Find Match"
        component={MatchesCmp}
        options={{
          title: 'Find Matches',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./assets/icons/menu/find-match.png')}
              style={[
                focused ? styles.drawerActive : styles.drawerInActive,
                {height: 12, width: 20},
              ]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Wishlist"
        component={WishlistCmp}
        options={{
          title: 'Wishlist',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./assets/icons/menu/wishlist.png')}
              style={[
                focused ? styles.drawerActive : styles.drawerInActive,
                {height: 25, width: 20},
              ]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Interest"
        component={FaqCmp}
        options={{
          title: 'Interest',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./assets/icons/menu/faqs-icon.png')}
              style={[
                focused ? styles.drawerActive : styles.drawerInActive,
                {height: 21, width: 20},
              ]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Invite Friends"
        component={InviteFriendsCmp}
        options={{
          title: 'Invite Friends',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./assets/icons/menu/faqs-icon.png')}
              style={[
                focused ? styles.drawerActive : styles.drawerInActive,
                {height: 21, width: 20},
              ]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Subscribe Plan"
        component={SubscriptionPlansCmp}
        options={{
          title: 'Subscribe Plan',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./assets/icons/menu/subscription.png')}
              style={[
                focused ? styles.drawerActive : styles.drawerInActive,
                {height: 33, width: 20},
              ]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Faq"
        component={FaqCmp}
        options={{
          title: 'Faq',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./assets/icons/menu/faqs-icon.png')}
              style={[
                focused ? styles.drawerActive : styles.drawerInActive,
                {height: 21, width: 20},
              ]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutCmp}
        options={{
          title: 'About',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./assets/icons/menu/contact-us.png')}
              style={[
                focused ? styles.drawerActive : styles.drawerInActive,
                {height: 19, width: 20},
              ]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Why us"
        component={WhyUsCmp}
        options={{
          title: 'Why us',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./assets/icons/menu/contact-us.png')}
              style={[
                focused ? styles.drawerActive : styles.drawerInActive,
                {height: 19, width: 20},
              ]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Success Stories"
        component={SuccessStoriesCmp}
        options={{
          title: 'Success Stories',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./assets/icons/menu/contact-us.png')}
              style={[
                focused ? styles.drawerActive : styles.drawerInActive,
                {height: 19, width: 20},
              ]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Youtube"
        component={YoutubeCmp}
        options={{
          title: 'Youtube',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./assets/icons/menu/contact-us.png')}
              style={[
                focused ? styles.drawerActive : styles.drawerInActive,
                {height: 19, width: 20},
              ]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Matches Suggestion"
        component={matchesSuggestionCmp}
        options={{
          title: 'Matches Suggestion',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./assets/icons/menu/contact-us.png')}
              style={[
                focused ? styles.drawerActive : styles.drawerInActive,
                {height: 19, width: 20},
              ]}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          title: 'Logoutt',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./assets/icons/menu/log-out.png')}
              style={[
                focused ? styles.drawerActive : styles.drawerInActive,
                {height: 18, width: 20},
              ]}
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="EditProfile"
        component={EditProfileCmp}
        options={{
          title: '',
          drawerIcon: ({focused, size}) => null,
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={AuthStack}
        options={{
          title: '',
          drawerIcon: ({focused, size}) => null,
        }}
      />

      {/* <Drawer.Screen name="Subscribe Plan" component={SubscriptionPlansCmp} /> */}
      {/* <Drawer.Screen name="Wishlist" component={WishlistCmp} /> */}
      {/* <Drawer.Screen name="Faq" component={FaqCmp} />
      <Drawer.Screen name="Blogs" component={BlogsCmp} />
      <Drawer.Screen name="Invite Friends" component={InviteFriendsCmp} />
      <Drawer.Screen name="Add a card" component={CardCmp} />
      <Drawer.Screen name="Reset Password" component={ResetPasswordCmp} />
      <Drawer.Screen name="About" component={AboutCmp} /> */}
    </Drawer.Navigator>
  );
}

const AppContainerStack = createStackNavigator();
let listener;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: 'Splash',
    };
  }

  UNSAFE_componentWillMount() {
    listener = EventRegister.addEventListener('isLoggedIn', data => {
      console.log('EventRegister', data);
      this.setState(
        {
          isLoggedIn: data,
        },
        () => {
          console.log('state:', this.state.isLoggedIn);
        },
      );
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  render() {
    return (
      <NavigationContainer>
        <AppContainerStack.Navigator initialRouteName={this.state.isLoggedIn}>
          {this.state.isLoggedIn == 'Splash' ? (
            <AppContainerStack.Screen
              name="Splash"
              component={Splash}
              options={navOptionHandler}
            />
          ) : null}
          {this.state.isLoggedIn == 'Login' ? (
            <AppContainerStack.Screen
              name="Auth"
              component={AuthStack}
              options={navOptionHandler}
            />
          ) : null}
          {this.state.isLoggedIn == 'Main' ? (
            <AppContainerStack.Screen
              name="Main"
              component={SideMenuNavigator}
              options={navOptionHandler}
            />
          ) : null}
          {this.state.isLoggedIn == 'Chat' ? (
            <AppContainerStack.Screen
              name="Chat"
              component={InnerChatCmp}
              options={navOptionHandler}
            />
          ) : null}
          {this.state.isLoggedIn == 'ChatScreen' ? (
            <AppContainerStack.Screen
              name="Chat"
              component={ChatCmp}
              options={navOptionHandler}
            />
          ) : null}
        </AppContainerStack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = {
  safeViewCont: {backgroundColor: '#fff', flex: 1},
  cont: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffcadc',
    borderBottomColor: '#ff1822',
    borderWidth: 2,
  },
  imgViewCont: {flex: 2, justifyContent: 'center', alignItems: 'center'},
  imgView: {
    width: 74,
    height: 74,
    borderColor: '#fff',
    borderRadius: 74,
    borderWidth: 2,
  },
  imgSize: {width: 72, height: 72},
  txtViewCont: {flex: 3, justifyContent: 'center'},
  txtView: {flex: 1, flexDirection: 'row', justifyContent: 'center'},
  txtViewCenter: {flex: 1, justifyContent: 'center'},
  nameTxt: {fontSize: 14, fontFamily: 'Poppins-Medium', color: '#ff1822'},
  vipBtn: {
    backgroundColor: '#6fc713',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  vipTxt: {
    color: '#fff',
    fontFamily: 'Poppins-Mediuum',
    fontSize: 12,
    textAlign: 'center',
  },
  profileBtn: {
    borderRadius: 5,
    borderColor: '#1e1e1e',
    borderWidth: 1,
    padding: 5,
  },
  profileTxt: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#1e1e1e',
    textAlign: 'center',
  },
  txtViewScoll: {flex: 4, padding: 10},
  scrolViewCont: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 15,
  },
  scrolViewImg: {width: 36, height: 32, marginRight: 10},
  scrolViewTxt: {fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 5},
};
