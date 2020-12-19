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
import Login from '../src/components/auth/signin';
import Bottomtab from './bottomtab';

const navOptionHandler = () => ({
  headerShown: false,
});

const CustomDrawerContent = props => {
  let array;

  const [state, setState] = React.useState({
    name: 'bbbbbbbb',
    vip: false,
    image: false,
  });
  React.useEffect(() => {
    getUserDetailsMc();
  }, []);

  const getUserDetailsMc = () => {
    AsyncStorage.getItem('userData', (err, res) => {
      if (err) {
      } else {
        let data = JSON.parse(res);
        // alert(data.username);
        console.log('data=', data);
        setState({
          ...state,
          name: data.user.username,
          vip: data.user.user_type == 'v',
          image: data.user.image ? data.user.image : false,
        });
      }
    });
  };
  return (
    <SafeAreaView style={styles.safeViewCont}>
      <View style={styles.cont}>
        <View style={styles.imgViewCont}>
          <View style={styles.imgView}>
            <Image
              style={styles.imgSize}
              source={{
                uri:
                  `http://dev2.thebetatest.com/${state.image}` &&
                  `http://dev2.thebetatest.com/${state.image}`,
              }}
            />
          </View>
        </View>
        <View style={styles.txtViewCont}>
          <View style={styles.txtView}>
            <View style={styles.txtViewCenter}>
              <Text style={styles.nameTxt}> @{state.name}</Text>
              {state.vip ? (
                <TouchableOpacity style={styles.vipBtn}>
                  <Text style={styles.vipTxt}>VIP</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.vipBtn}>
                  <Text style={styles.vipTxt}>REGULAR</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => props.navigation.navigate('EditProfile')}
                style={styles.profileBtn}>
                <Text style={styles.profileTxt}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={{flex: 3, borderWidth: 0}}>
        <View style={{flex: 1}}>
          {
            (array = [
              {
                title: 'Profile',
                name: 'ProfileStack',
              },
              {
                title: 'Find Match',
                name: 'MatchesStack',
              },
              {
                title: 'Wishlist',
                name: 'WishlistStack',
                type: 'FontAwesome',
              },
              {
                title: 'Interested People In You ',
                name: 'interestedPeopleInYou',
                type: 'FontAwesome',
              },
              {
                title: 'You Showed Interest In  ',
                name: 'YouShowedinterest',
                type: 'FontAwesome',
              },
              {
                title: 'Subscription',
                name: 'SubscribePlanStack',
                type: 'FontAwesome',
              },
              {
                title: 'FAQS',
                name: 'FaqStack',
                type: 'FontAwesome',
              },
              {
                title: 'Contact Us',
                name: 'AboutStack',
                type: 'FontAwesome',
              },
              {
                title: 'Logout',
                name: 'Auth',
                type: 'FontAwesome',
              },
            ].map(
              (val, i) => (
                console.log('loop', val),
                (
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate(val.name);
                    }}
                    style={{
                      height: 50,

                      flexDirection: 'row',
                      marginVertical: 5,
                      alignItems: 'center',
                    }}>
                    <View style={{height: '100%', width: 60, borderWidth: 0}} />

                    <Text
                      style={{color: 'black', fontSize: 15, marginLeft: 10}}>
                      {val.title}
                    </Text>
                  </TouchableOpacity>
                )
              ),
            ))
          }
        </View>
      </View>

      <Drawer.Screen name="ProfileStack" component={ProfileStack} />
      <Drawer.Screen name="WishlistStack" component={WishlistStack} />
      <Drawer.Screen
        name="matchesSuggestionStack"
        component={matchesSuggestionStack}
      />
      <Drawer.Screen name="MatchesStack" component={MatchesStack} />
      <Drawer.Screen
        name="interestedPeopleInYou"
        component={interestedPeopleInYou}
      />
      <Drawer.Screen name="YouShowedinterest" component={YouShowedinterest} />
      <Drawer.Screen name="SubscribePlanStack" component={SubscribePlanStack} />
      <Drawer.Screen name="FaqStack" component={FaqStack} />
      <Drawer.Screen name="AboutStack" component={AboutStack} />
    </SafeAreaView>
  );
};

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
const wishlist = createStackNavigator();
function WishlistStack() {
  return (
    <wishlist.Navigator initialRouteName="Wishlist">
      <wishlist.Screen
        name="Wishlist"
        component={WishlistCmp}
        options={navOptionHandler}
      />
      <wishlist.Screen
        name="Profile1"
        component={ProfileStack}
        options={navOptionHandler}
      />
    </wishlist.Navigator>
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
const subscritionStack = createStackNavigator();
function SubscribePlanStack() {
  return (
    <subscritionStack.Navigator initialRouteName="subscribePlan">
      <subscritionStack.Screen
        name="subscribePlan"
        component={SubscriptionPlansCmp}
        options={navOptionHandler}
      />
    </subscritionStack.Navigator>
  );
}
const FaqsStack = createStackNavigator();
function FaqStack() {
  return (
    <FaqsStack.Navigator initialRouteName="faq">
      <FaqsStack.Screen
        name="faq"
        component={FaqCmp}
        options={navOptionHandler}
      />
    </FaqsStack.Navigator>
  );
}
const aboutusStack = createStackNavigator();
function AboutStack() {
  return (
    <aboutusStack.Navigator initialRouteName="About">
      <aboutusStack.Screen
        name="aboutusStack"
        component={AboutCmp}
        options={navOptionHandler}
      />
    </aboutusStack.Navigator>
  );
}

const matchSuggestion = createStackNavigator();
function matchesSuggestionStack() {
  return (
    <matchSuggestion.Navigator initialRouteName="matchesSuggestionCmp">
      <matchSuggestion.Screen
        name="matchesSuggestionCmp"
        component={matchesSuggestionCmp}
        options={navOptionHandler}
      />
      <matchSuggestion.Screen
        name="Filter"
        component={FilterCmp}
        options={navOptionHandler}
      />
      <matchSuggestion.Screen
        name="innerChat"
        component={InnerChatCmp}
        options={navOptionHandler}
      />
      <matchSuggestion.Screen
        name="Profile1"
        component={ProfileCmp}
        options={navOptionHandler}
      />
    </matchSuggestion.Navigator>
  );
}
const interestedpeopleinyouStack = createStackNavigator();
function interestedPeopleInYou() {
  return (
    <interestedpeopleinyouStack.Navigator initialRouteName="InterestedPeopleInYou">
      <interestedpeopleinyouStack.Screen
        name="InterestedPeopleInYou"
        component={InterestedPeopleInYou}
        options={navOptionHandler}
      />

      <interestedpeopleinyouStack.Screen
        name="innerChat"
        component={InnerChatCmp}
        options={navOptionHandler}
      />
      <interestedpeopleinyouStack.Screen
        name="Profile1"
        component={ProfileCmp}
        options={navOptionHandler}
      />
    </interestedpeopleinyouStack.Navigator>
  );
}

const YoushowedinterestinStack = createStackNavigator();
function YouShowedinterest() {
  return (
    <YoushowedinterestinStack.Navigator initialRouteName="YouinterestedinPeople">
      <YoushowedinterestinStack.Screen
        name="YouinterestedinPeople"
        component={YouinterestedinPeople}
        options={navOptionHandler}
      />

      <YoushowedinterestinStack.Screen
        name="innerChat"
        component={InnerChatCmp}
        options={navOptionHandler}
      />
      <YoushowedinterestinStack.Screen
        name="Profile1"
        component={ProfileCmp}
        options={navOptionHandler}
      />
    </YoushowedinterestinStack.Navigator>
  );
}
const FindMatchesStack = createStackNavigator();
function MatchesStack() {
  return (
    <FindMatchesStack.Navigator initialRouteName="Matches">
      <FindMatchesStack.Screen
        name="Matches"
        component={MatchesCmp}
        options={navOptionHandler}
      />
      <FindMatchesStack.Screen
        name="Filter"
        component={FilterCmp}
        options={navOptionHandler}
      />
      <FindMatchesStack.Screen
        name="innerChat"
        component={InnerChatCmp}
        options={navOptionHandler}
      />
      <FindMatchesStack.Screen
        name="Profile1"
        component={ProfileCmp}
        options={navOptionHandler}
      />
    </FindMatchesStack.Navigator>
  );
}
const StackHome = createStackNavigator();

function MainHomeStack() {
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

const Drawer = createDrawerNavigator();
const SideMenuNavigator = () => {
  return (
    <Drawer.Navigator
      //   initialRouteName="MenuTab"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Bottomtab} />
      <Drawer.Screen name="ProfileStack" component={ProfileStack} />
      <Drawer.Screen name="WishlistStack" component={WishlistStack} />
      <Drawer.Screen
        name="matchesSuggestionStack"
        component={matchesSuggestionStack}
      />
      <Drawer.Screen name="MatchesStack" component={MatchesStack} />
      <Drawer.Screen
        name="interestedPeopleInYou"
        component={interestedPeopleInYou}
      />
      <Drawer.Screen name="YouShowedinterest" component={YouShowedinterest} />
      <Drawer.Screen name="SubscribePlanStack" component={SubscribePlanStack} />
      <Drawer.Screen name="FaqStack" component={FaqStack} />
      <Drawer.Screen name="AboutStack" component={AboutStack} />
    </Drawer.Navigator>
  );
};
export default SideMenuNavigator;

const styles = {
  safeViewCont: {backgroundColor: '#fff', flex: 1, borderWidth: 0},
  cont: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffcadc',
    borderBottomColor: '#ff1822',
    // borderWidth: 2,
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
  txtViewCont: {
    flex: 3,
    justifyContent: 'center',
    // borderWidth: 1,
    paddingRight: 20,
  },
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
    borderWidth: 0.5,
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
