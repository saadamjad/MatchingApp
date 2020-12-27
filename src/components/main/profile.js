import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
} from 'react-native';

import CountryPicker from 'react-native-country-picker-modal';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import Dialog from 'react-native-dialog';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHeart,
  faUserPlus,
  faCommentDots,
  faEllipsisV,
  faFemale,
  faMale,
  faHeartBroken,
  faUserMinus,
} from '@fortawesome/free-solid-svg-icons';
import {SliderBox} from 'react-native-image-slider-box';

import {images} from '../../constants/theme';

export default class ProfileCmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      blockUser: false,
      userDataShow: false,
      profiePicShow: false,
      cca2: 'US',

      reportBlock: false,
      data: {},
      user_type: '',
      images: [],
      showSpinner: false,
      showAlert: false,
      isConfirmation: false,

      errorMsg: '',
      errorTitle: '',
      showSlider: false,
      isFriend: false,
      isWishlist: false,
      reports: [],
      confirmAction: '',
      // userData: {}
      profileImage: '',
      profilePic: [],
      imageee: 'https://api.matchelitemuslim.com/uploads/woman.png',
      imagetest: [
        'https://source.unsplash.com/1024x768/?water',
        'https://api.matchelitemuslim.com/uploads/woman.png',
        'https://source.unsplash.com/1024x768/?water',
        'https://api.matchelitemuslim.com/uploads/woman.png',
      ],
    };
  }

  async componentDidMount() {
    let getVipUserDataFromParams = this.props.route.params.data
      ? this.props.route.params.data
      : null;

    let pic1 = getVipUserDataFromParams.profile_pic
      ? getVipUserDataFromParams.profile_pic
      : 'data:image/png;base64,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';

    this.setState({
      data: getVipUserDataFromParams,
      userDataShow: true,
      profilePic: `https://api.matchelitemuslim.com/${pic1}`,
    });
    this._GetLoggedInValue(getVipUserDataFromParams);
  }
  _ProfilePics = async (profilePic, pic1, pic2) => {
    const images = [
      profilePic,
      // 'https://source.unsplash.com/1024x768/?nature',
      // 'https://source.unsplash.com/1024x768/?water',
      pic1,
      pic2,
    ];

    this.setState(
      {
        images: images,
        profiePicShow: true,
      },
      () => console.log('this==', this.state.images),
    );
  };

  _GetLoggedInValue = async getVipUserDataFromParams => {
    const data = await AsyncStorage.getItem('userData');
    let access_token = JSON.parse(data).access_token;
    let loggedInUser = JSON.parse(data).user.id;
    let vipUserId = getVipUserDataFromParams.id;
    this.setState({
      showSlider: true,
      loggedInUser: loggedInUser,
      vipUserId: vipUserId,
      access_token: access_token,
    });

    this.checkIfAlreadyFriend(access_token, vipUserId, loggedInUser);
  };

  async checkIfAlreadyFriend(access_token, vipUserId, loggedInUser) {
    let headers = {
      headers: {
        Authorization: access_token,
      },
    };
    const data = {from: loggedInUser, to: vipUserId};
    console.log(data);

    const URL = 'https://api.matchelitemuslim.com/api/fav-int';

    axios.post(URL, data, headers).then(
      response => {
        console.log(response.data);
        this.setState({
          isFriend: response?.data?.collection?.interest,
          isWishlist: response?.data?.collection?.favourite,
        });
      },
      error => {
        console.log(error);
      },
    );
  }

  header() {
    return (
      <View style={styles.headerView}>
        <View style={styles.getStartedView}>
          <TouchableOpacity
            onPress={() => {
              this.setState({step: 0});
            }}
            style={
              this.state.step == 0
                ? styles.selectedCircle
                : styles.notSelectedCircle
            }
            activeOpacity={0.8}>
            <Text
              style={
                this.state.step == 0
                  ? styles.selectedTxt
                  : styles.notSelectedTxt
              }>
              BIO
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signUpView}>
          <TouchableOpacity
            onPress={() => {
              this.setState({step: 1});
            }}
            style={
              this.state.step == 1
                ? styles.selectedCircle
                : styles.notSelectedCircle
            }
            activeOpacity={0.8}>
            <Text
              style={
                this.state.step == 1
                  ? styles.selectedTxt
                  : styles.notSelectedTxt
              }>
              Personal Detail
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signUpView}>
          <TouchableOpacity
            onPress={() => {
              this.setState({step: 2});
            }}
            style={
              this.state.step == 2
                ? styles.selectedCircle
                : styles.notSelectedCircle
            }
            activeOpacity={0.8}>
            <Text
              style={
                this.state.step == 2
                  ? styles.selectedTxt
                  : styles.notSelectedTxt
              }>
              Desired Partner
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  bio() {
    if (this.state.step == 0) {
      return (
        <View style={styles.getStarted}>
          <View>
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'Poppins-Regular',
                color: '#1e1e1e',
                fontSize: 12,
              }}>
              {this.state.data.about ? this.state.data.about : 'N/A'}
            </Text>
          </View>
        </View>
      );
    }
  }

  personalDetail() {
    if (this.state.step == 1) {
      return (
        <View style={styles.detailCont}>
          <View style={styles.flx1}>
            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image
                  style={{width: 18, height: '100%'}}
                  source={images.profileEdu}
                />
                <Text style={styles.txtHeading}>Education</Text>
              </View>
              <Text style={styles.txtLbl}>
                {this.state.data.education ? this.state.data.education : 'N/A'}
              </Text>
            </View>

            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image
                  style={{width: 24, height: '100%'}}
                  source={images.profileincome}
                />
                <Text style={styles.txtHeading}>Annual Income</Text>
              </View>
              <Text style={styles.txtLbl}>
                ${this.state.data.income ? this.state.data.income : 'N/A'}
              </Text>
            </View>

            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image
                  style={{width: 22, height: '100%'}}
                  source={images.profileskin}
                />
                <Text style={styles.txtHeading}>Skin Tone </Text>
              </View>
              <Text style={styles.txtLbl}>
                {this.state.data.skin_tone ? this.state.data.skin_tone : 'N/A'}
              </Text>
            </View>

            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image
                  style={{width: 18, height: '100%'}}
                  source={images.profilebody}
                />
                <Text style={styles.txtHeading}>Body Type </Text>
              </View>
              <Text style={styles.txtLbl}>
                {this.state.data.body_type ? this.state.data.body_type : 'N/A'}
              </Text>
            </View>

            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image
                  style={{width: 22, height: '100%'}}
                  source={images.profilesmoke}
                />
                <Text style={styles.txtHeading}>Smoke</Text>
              </View>
              <Text style={styles.txtLbl}>
                {this.state.data.smoke ? this.state.data.smoke : 'N/A'}
              </Text>
            </View>

            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image
                  style={{width: 15, height: '100%'}}
                  source={images.profiledisablity}
                />
                <Text style={styles.txtHeading}>Disablility</Text>
              </View>
              <Text style={styles.txtLbl}>
                {this.state.data.disablility
                  ? this.state.data.disablility
                  : 'N/A'}
              </Text>
            </View>

            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image
                  style={{width: 24, height: '100%'}}
                  source={images.profilepets}
                />
                <Text style={styles.txtHeading}>Pets</Text>
              </View>
              <Text style={styles.txtLbl}>
                {this.state.data.pets ? this.state.data.pets : 'N/A'}
              </Text>
            </View>

            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image
                  style={{width: 18, height: '100%'}}
                  source={images.profileself_emp}
                />
                <Text style={styles.txtHeading}>Employment Status</Text>
              </View>
              <Text style={styles.txtLbl}>
                {this.state.data.employment_status
                  ? this.state.data.employment_status
                  : 'N/A'}
              </Text>
            </View>
          </View>

          <View style={{flex: 1, paddingLeft: 10}}>
            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image
                  style={{width: 24, height: '100%'}}
                  source={images.profilemartial}
                />
                <Text style={styles.txtHeading}>Marital Status</Text>
              </View>
              <Text style={styles.txtLbl}>
                {this.state.data.marital_status
                  ? this.state.data.marital_status
                  : 'N/A'}
              </Text>
            </View>

            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image
                  style={{width: 26, height: '100%'}}
                  source={images.profilekids}
                />
                <Text style={styles.txtHeading}>Kids</Text>
              </View>
              <Text style={styles.txtLbl}>
                {this.state.data.kids ? this.state.data.kids : 'N/A'}
              </Text>
            </View>

            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image
                  style={{width: 18, height: '100%'}}
                  source={images.profileheight}
                />
                <Text style={styles.txtHeading}>Height </Text>
              </View>
              <Text style={styles.txtLbl}>
                {this.state.data.height ? this.state.data.height : 'N/A'}
              </Text>
            </View>

            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image
                  style={{width: 28, height: '100%'}}
                  source={images.profileeye}
                />
                <Text style={styles.txtHeading}>Eye Color</Text>
              </View>
              <Text style={styles.txtLbl}>
                {this.state.data.eye_color ? this.state.data.eye_color : 'N/A'}
              </Text>
            </View>

            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image
                  style={{width: 20, height: '100%'}}
                  source={images.profilereligion}
                />
                <Text style={styles.txtHeading}>Religious</Text>
              </View>
              <Text style={styles.txtLbl}>
                {this.state.data.religious ? this.state.data.religious : 'N/A'}
              </Text>
            </View>

            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image
                  style={{width: 24, height: '100%'}}
                  source={images.profiledrink}
                />
                <Text style={styles.txtHeading}>Drink</Text>
              </View>
              <Text style={styles.txtLbl}>
                {this.state.data.drink ? this.state.data.drink : 'N/A'}
              </Text>
            </View>

            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image
                  style={{width: 18, height: '100%'}}
                  source={images.profileoccup}
                />
                <Text style={styles.txtHeading}>Occupation</Text>
              </View>
              <Text style={styles.txtLbl}>
                {this.state.data.occupation
                  ? this.state.data.occupation
                  : 'N/A'}
              </Text>
            </View>
            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image
                  style={{width: 18, height: '100%'}}
                  source={images.profileoccup}
                />
                <Text style={styles.txtHeading}>Hobbies</Text>
              </View>
              <Text style={styles.txtLbl}>
                {this.state.data.hobbies ? this.state.data.hobbies : 'N/A'}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }

  desiredPartner() {
    if (this.state.step == 2) {
      return (
        <View
          style={{
            flex: 6,
            backgroundColor: '#fff',
            padding: 10,
            paddingTop: 5,
            margin: 10,
            marginTop: 5,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          }}>
          <View style={[styles.mb10, {alignItems: 'center'}]}>
            <View style={styles.flxRw}>
              <Text style={styles.txtHeading}>I am Seeking a </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 9,
                  fontFamily: 'Poppins-Regular',
                  color: '#474747',
                }}>
                {this.state.data.partner_looking_for
                  ? this.state.data.partner_looking_for
                  : 'N/A'}
              </Text>
              {this.state.data.partner_looking_for == 'Female' ? (
                <FontAwesomeIcon icon={faFemale} color="red" size={18} />
              ) : (
                <FontAwesomeIcon icon={faMale} color="blue" size={18} />
              )}
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View style={styles.flx1}>
              <View style={styles.mb10}>
                <View style={styles.flxRw}>
                  <Image
                    style={{width: 18, height: '100%'}}
                    source={images.profileheight}
                  />
                  <Text style={styles.txtHeading}>Height </Text>
                </View>
                <Text style={styles.txtLbl}>
                  {this.state.data.partner_min_height}-
                  {this.state.data.partner_max_height}
                </Text>
              </View>

              <View style={styles.mb10}>
                <View style={styles.flxRw}>
                  <Image
                    style={{width: 27, height: '100%'}}
                    source={images.profilemothertongue}
                  />
                  <Text style={styles.txtHeading}>Mother Tonge </Text>
                </View>
                <Text style={styles.txtLbl}>
                  {this.state.data.partner_mother_tounge
                    ? this.state.data.partner_mother_tounge
                    : 'N/A'}
                </Text>
              </View>

              <View style={styles.mb10}>
                <View style={styles.flxRw}>
                  <Image
                    style={{width: 20, height: '100%'}}
                    source={images.profilenationality}
                  />
                  <Text style={styles.txtHeading}>Nationality </Text>
                </View>
                <Text style={styles.txtLbl}>
                  {this.state.data.partner_nationality
                    ? this.state.data.partner_nationality
                    : 'N/A'}
                </Text>
              </View>

              <View style={styles.mb10}>
                <View style={styles.flxRw}>
                  <Image
                    style={{width: 20, height: '100%'}}
                    source={images.profilereligion}
                  />
                  <Text style={styles.txtHeading}>Religious</Text>
                </View>
                <Text style={styles.txtLbl}>
                  {this.state.data.partner_religious
                    ? this.state.data.partner_religious
                    : 'N/A'}
                </Text>
              </View>

              <View style={styles.mb10}>
                <View style={styles.flxRw}>
                  <Image
                    style={{width: 18, height: '100%'}}
                    source={images.profilebody}
                  />
                  <Text style={styles.txtHeading}>Body Type </Text>
                </View>
                <Text style={styles.txtLbl}>
                  {this.state.data.partner_body_type
                    ? this.state.data.partner_body_type
                    : 'N/A'}
                </Text>
              </View>

              <View style={styles.mb10}>
                <View style={styles.flxRw}>
                  <Image
                    style={{width: 28, height: '100%'}}
                    source={images.profileeye}
                  />
                  <Text style={styles.txtHeading}>Eye Color</Text>
                </View>
                <Text style={styles.txtLbl}>
                  {this.state.data.partner_eye_color
                    ? this.state.data.partner_eye_color
                    : 'N/A'}
                </Text>
              </View>

              <View style={styles.mb10}>
                <View style={styles.flxRw}>
                  <Image
                    style={{width: 24, height: '100%'}}
                    source={images.profiledrink}
                  />
                  <Text style={styles.txtHeading}>Drink</Text>
                </View>
                <Text style={styles.txtLbl}>
                  {this.state.data.partner_drink
                    ? this.state.data.partner_drink
                    : 'N/A'}
                </Text>
              </View>
            </View>

            <View style={{flex: 1, paddingLeft: 10}}>
              <View style={styles.mb10}>
                <View style={styles.flxRw}>
                  <Image
                    style={{width: 24, height: '100%'}}
                    source={images.profileagedBetween}
                  />
                  <Text style={styles.txtHeading}>Aged Between</Text>
                </View>
                <Text style={styles.txtLbl}>
                  {this.state.data.partner_min_age
                    ? this.state.data.partner_min_age
                    : 'N/A'}
                  -
                  {this.state.data.partner_max_age
                    ? this.state.data.partner_max_age
                    : 'N/A'}
                </Text>
              </View>

              <View style={styles.mb10}>
                <View style={styles.flxRw}>
                  <Image
                    style={{width: 24, height: '100%'}}
                    source={images.profilemartial}
                  />
                  <Text style={styles.txtHeading}>Marital Status</Text>
                </View>
                <Text style={styles.txtLbl}>
                  {this.state.data.partner_marital_status
                    ? this.state.data.partner_marital_status
                    : 'N/A'}
                </Text>
              </View>

              <View style={styles.mb10}>
                <View style={styles.flxRw}>
                  <Image
                    style={{width: 26, height: '100%'}}
                    source={images.profilekids}
                  />
                  <Text style={styles.txtHeading}>children</Text>
                </View>
                <Text style={styles.txtLbl}>
                  {this.state.data.partner_children
                    ? this.state.data.partner_children
                    : 'N/A'}
                </Text>
              </View>

              <View style={styles.mb10}>
                <View style={styles.flxRw}>
                  <Image
                    style={{width: 18, height: '100%'}}
                    source={images.profilecountrylive}
                  />
                  <Text style={styles.txtHeading}>Country Live in</Text>
                </View>
                <Text style={styles.txtLbl}>
                  {this.state.data.partner_country_livein
                    ? this.state.data.partner_country_livein
                    : 'N/A'}
                </Text>
              </View>

              <View style={styles.mb10}>
                <View style={styles.flxRw}>
                  <Image
                    style={{width: 24, height: '100%'}}
                    source={images.profileincome}
                  />
                  <Text style={styles.txtHeading}>Annual Income</Text>
                </View>
                <Text style={styles.txtLbl}>
                  $
                  {this.state.data.partner_annual_income
                    ? this.state.data.partner_annual_income
                    : 'N/A'}
                </Text>
              </View>

              <View style={styles.mb10}>
                <View style={styles.flxRw}>
                  <Image
                    style={{width: 22, height: '100%'}}
                    source={images.profileskin}
                  />
                  <Text style={styles.txtHeading}>Skin Tone </Text>
                </View>
                <Text style={styles.txtLbl}>
                  {this.state.data.partner_skin_tone
                    ? this.state.data.partner_skin_tone
                    : 'N/A'}
                </Text>
              </View>

              <View style={styles.mb10}>
                <View style={styles.flxRw}>
                  <Image
                    style={{width: 22, height: '100%'}}
                    source={images.profilesmoke}
                  />
                  <Text style={styles.txtHeading}>Smoke </Text>
                </View>
                <Text style={styles.txtLbl}>
                  {this.state.data.partner_smoke
                    ? this.state.data.partner_smoke
                    : 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }

  addToWishlist = async () => {
    this.setState({showSpinner: true});

    const user = await AsyncStorage.getItem('userData');
    const access_token = JSON.parse(user).access_token;
    console.log(access_token);
    let headers = {
      headers: {
        Authorization: access_token,
      },
    };
    const data = {fav_user_id: this.state.data.id};
    const URL = 'https://api.matchelitemuslim.com/api/addtowishlist';
    axios.post(URL, data, headers).then(
      resposne => {
        this.setState({showSpinner: false});
        console.log(resposne.data);
        if (!resposne.data.status)
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: resposne.data.message,
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        else {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Success',
            text2: 'Successfuly added in wishlist.',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
          this.setState({isWishlist: true});
        }
      },
      error => {
        this.setState({showSpinner: false});
        console.log(error);
      },
    );
  };

  removeFromWishlist = async () => {
    this.setState({showSpinner: true});

    const user = await AsyncStorage.getItem('userData');
    const access_token = JSON.parse(user).access_token;
    console.log(access_token);
    let header = {
      headers: {
        Authorization: access_token,
      },
    };
    const data = {
      fav_user_id: this.state.data.id,
      user_id: JSON.parse(user).user.id,
    };
    const URL = 'https://api.matchelitemuslim.com/api/removetowishlist';
    axios.post(URL, data, header).then(
      resposne => {
        this.setState({showSpinner: false});
        console.log(resposne.data);
        if (!resposne.data.status)
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: resposne.data.message,
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        else {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Success',
            text2: 'Successfuly removed from wishlist.',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
          this.setState({isWishlist: false});
        }
      },
      error => {
        this.setState({showSpinner: false});
        console.log(error);
      },
    );
  };

  addFriend = async () => {
    this.setState({showSpinner: true});

    const user = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(user);
    let headers = {
      headers: {
        Authorization: userData.access_token,
      },
    };
    const data = {
      to: this.state.data.id,
      from: userData.user.id,
      status: 'sent',
    };
    // console.log("BHAIJAN LET SEE!!", data)
    console.log('data: ', data);

    const URL = 'https://api.matchelitemuslim.com/api/send-interest';
    axios.post(URL, data, headers).then(
      resposne => {
        this.setState({showSpinner: false});
        console.log(
          'api is working but the request data is wrong check it out',
          resposne.data,
        );
        if (!resposne.data.status)
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text1: 'You have Already sent request',
            text2: resposne.data.message,
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        else {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Success',
            text2: 'Successfuly sent friend request.',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
          this.setState(
            {isFriend: true},
            //   ,()=>
            // this.removeFromWishlist()
          );
        }
      },
      error => {
        this.setState({showSpinner: false});
        console.log(error);
      },
    );
  };
  _RemoveFriend = async () => {
    alert('THIS API IS NOT YET READY');
    // this.setState({showSpinner: true});
    // const user = await AsyncStorage.getItem('userData');
    // const userData = JSON.parse(user);
    // let headers = {
    //   headers: {
    //     Authorization: userData.access_token,
    //   },
    // };
    // console.log('I KNOW VERY WEL', this.state.data.id)
    // const data = {
    //   to: this.state.data.id,
    //   from: userData.user.id,
    //   status: 'deny',
    // };
    // const URL = 'https://api.matchelitemuslim.com/api/deny-interest';
    // axios.post(URL, data, headers).then(
    //   resposne => {
    //     this.setState({showSpinner: false});
    //     console.log('MEIN HUN QADIRI SUNNNI TANTANATAN',resposne.data);
    //     if (!resposne.data.status)
    //       Toast.show({
    //         type: 'error',
    //         position: 'top',
    //         text1: 'Error',
    //         text2: resposne.data.message,
    //         visibilityTime: 4000,
    //         autoHide: true,
    //         topOffset: 30,
    //         bottomOffset: 40,
    //       });
    //     else {
    //       Toast.show({
    //         type: 'success',
    //         position: 'top',
    //         text1: 'Success',
    //         text2: 'Successfuly deny friend request.',
    //         visibilityTime: 4000,
    //         autoHide: true,
    //         topOffset: 30,
    //         bottomOffset: 40,
    //       });
    //       this.setState({isFriend: false});
    //     }
    //   },
    //   error => {
    //     this.setState({showSpinner: false});
    //     console.log(error);
    //   },
    // );
  };

  whatsApp() {
    return (
      <TouchableOpacity
        style={{
          padding: 8,
          backgroundColor: '#49c858',
          borderRadius: 30,
          justifyContent: 'center',
        }}
        onPress={() => {
          console.log('this.state.vipUserId,', this.state.data.UserName);

          this.props.navigation.navigate('innerChat', {
            userName: this.state.data.UserName,
          });
        }}>
        <FontAwesomeIcon icon={faCommentDots} color="#fff" size={24} />
        {/* <Image style={styles.socialIcon} source={images.whatsappIcon} /> */}
      </TouchableOpacity>
    );
  }

  addUser() {
    return (
      <View>
        {this.state.isFriend ? null : (
          // <TouchableOpacity activeOpacity={0.8} onPress={this._RemoveFriend}>
          //   {/* <TouchableOpacityactiveOpacity={0.8} onPress={this.addFriend} */}
          //   <View
          //     style={{
          //       padding: 8,
          //       backgroundColor: '#ed145b',
          //       borderRadius: 30,
          //       justifyContent: 'center',
          //       marginRight: 10,
          //     }}>
          //     <FontAwesomeIcon
          //       icon={faUserMinus}
          //       color="#fff"
          //       size={24}
          //       // onPress={this._RemoveFriend}
          //     />
          //   </View>
          // </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={this.addFriend}>
            <View
              style={{
                padding: 8,
                backgroundColor: '#ed145b',
                borderRadius: 30,
                justifyContent: 'center',
                marginRight: 10,
              }}>
              <FontAwesomeIcon icon={faUserPlus} color="#fff" size={24} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  heartIcon() {
    return this.state.isWishlist ? (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            showAlert: true,
            errorTitle: 'Confirm',
            errorMsg:
              'Are you sure you want to remove this profile from wishlist?',
            isConfirmation: true,
            confirmAction: 'removeWishlist',
          });
        }}>
        <View
          style={{
            padding: 8,
            backgroundColor: '#1876f5',
            borderRadius: 30,
            justifyContent: 'center',
            marginRight: 10,
          }}>
          <FontAwesomeIcon icon={faHeartBroken} color="#fff" size={24} />
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            showAlert: true,
            errorTitle: 'Confirm',
            errorMsg:
              'Are you sure you want to add this profile in your wishlist?',
            isConfirmation: true,
            confirmAction: 'addWishlist',
          });
        }}>
        <View
          style={{
            padding: 8,
            backgroundColor: '#1876f5',
            borderRadius: 30,
            justifyContent: 'center',
            marginRight: 10,
          }}>
          <FontAwesomeIcon icon={faHeart} color="#fff" size={24} />
        </View>
      </TouchableOpacity>
    );
  }

  handleCancel = () => {
    this.setState({showAlert: false});
  };

  handleConfirmation = () => {
    if (this.state.confirmAction == 'addWishlist')
      this.setState({showAlert: false}, () => this.addToWishlist());
    else if (this.state.confirmAction == 'removeWishlist')
      this.setState({showAlert: false}, () => this.removeFromWishlist());
  };

  _BlockUser = () => {
    console.log('block user');
    this.setState({showSpinner: true});
    let access_token = this.state.access_token;
    let loggedInUser = this.state.loggedInUser;
    let vipUserId = this.state.vipUserId;
    console.log('loggedInUser', loggedInUser, 'vipUserId', vipUserId);

    let headers = {
      headers: {
        Authorization: access_token,
      },
    };
    const data = {
      block_by: loggedInUser,
      block_to: vipUserId,
    };
    const URL = 'https://api.matchelitemuslim.com/api/block-user';
    axios.post(URL, data, headers).then(
      resposne => {
        let status = resposne.data.status;
        if (status) {
          this.setState({showSpinner: false, blockUser: true}, () =>
            this.props.navigation.navigate('Home'),
          );
        } else {
          console.log('already block');
          this.setState({
            blockUser: true,
            showSpinner: false,
          });
        }

        console.log(resposne.data);
      },
      error => {
        this.setState({showSpinner: false});
        console.log(error);
      },
    );
  };
  _UnBlockUser = () => {
    console.log('block user');
    this.setState({showSpinner: true});
    let access_token = this.state.access_token;
    let loggedInUser = this.state.loggedInUser;
    let vipUserId = this.state.vipUserId;
    console.log('loggedInUser', loggedInUser, 'vipUserId', vipUserId);

    let headers = {
      headers: {
        Authorization: access_token,
      },
    };
    const data = {
      block_by: loggedInUser,
      block_to: vipUserId,
    };
    const URL = 'https://api.matchelitemuslim.com/api/unblock-user';
    axios.post(URL, data, headers).then(
      resposne => {
        let status = resposne.data.status;
        if (status) {
          this.setState({showSpinner: false, blockUser: false});
        } else {
          console.log('already block');
          this.setState({
            blockUser: false,
            showSpinner: false,
          });
        }

        console.log(resposne.data);
      },
      error => {
        this.setState({showSpinner: false});
        console.log(error);
      },
    );
  };
  _ReportUser = () => {
    console.log('report user');
    let access_token = this.state.access_token;
    let headers = {
      headers: {
        Authorization: access_token,
      },
    };

    const URL = 'https://api.matchelitemuslim.com/api/report-reasons';
    var array = [];
    axios.get(URL, headers).then(
      response => {
        console.log(response.data.reasons);
        array.push(response.data.reasons);
        this.setState(
          {
            reportModal: true,
            reports: response.data.reasons,
          },
          () => console.log('response.data', this.state.reports),
        );
      },
      error => {
        console.log(error);
      },
    );
  };
  ReportedUser = (reason, reportId) => {
    console.log('ReportedUser');
    this.setState({showSpinner: true});
    let access_token = this.state.access_token;
    let loggedInUser = this.state.loggedInUser;
    let vipUserId = this.state.vipUserId;
    console.log('loggedInUser', loggedInUser, 'vipUserId', vipUserId);

    let headers = {
      headers: {
        Authorization: access_token,
      },
    };
    const data = {
      message: reason,
      report_reason_id: reportId,
      send_by: loggedInUser,
      suspect_id: vipUserId,
    };
    const URL = 'https://api.matchelitemuslim.com/api/send-report';
    axios.post(URL, data, headers).then(
      resposne => {
        let status = resposne.data.status;
        console.log('Status', status);
        if (status) {
          alert('Reported');
          this.setState({
            showSpinner: false,
            reportModal: false,
            reported: true,
          });
        }

        console.log(resposne.data);
      },
      error => {
        this.setState({showSpinner: false});
        console.log(error);
      },
    );
  };

  render() {
    if (this.state.userDataShow == true && this.state.showSlider) {
      return (
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{height: 250}}>
              <SliderBox
                images={[this.state.profilePic]}
                sliderBoxHeight={250}
                inactiveDotColor="#ffffff"
                dotStyle={{
                  marginTop: -220,
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  margin: 0,
                  padding: 0,
                  // backgroundColor: 'red',
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState({reportBlock: !this.state.reportBlock});
                }}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 0,
                  zIndex: 999,
                  width: '10%',
                }}>
                <FontAwesomeIcon icon={faEllipsisV} color="#fff" size={24} />
              </TouchableOpacity>
              {this.state.reportBlock == true ? (
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: '#fff',
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    borderRadius: 5,
                    right: 25,
                    top: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {this.state.blockUser ? (
                    <TouchableOpacity
                      style={{
                        marginVertical: 5,
                        borderBottomWidth: 0.5,
                      }}
                      onPress={() => this._UnBlockUser()}>
                      <Text>UnBlock</Text>
                    </TouchableOpacity>
                  ) : this.state.blockUser == false ? (
                    <View>
                      <TouchableOpacity
                        style={{
                          // position: 'absolute',
                          // backgroundColor: '#fff',
                          // paddingHorizontal: 15,
                          // paddingVertical: 10,
                          // borderRadius: 5,
                          // right: 25,
                          // top: 50,
                          marginVertical: 5,
                          borderBottomWidth: 0.5,
                        }}
                        onPress={() => this._BlockUser()}>
                        <Text>Block</Text>
                      </TouchableOpacity>
                      {this.state.reported ? null : (
                        <TouchableOpacity onPress={() => this._ReportUser()}>
                          <Text style={{marginBottom: 10}}>Report</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : null}
                </View>
              ) : null}
              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.47)',
                  width: '100%',
                  paddingHorizontal: 15,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                <View style={{flex: 3}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 18,
                        fontFamily: 'Poppins-Reglar',
                        marginBottom: 5,
                      }}>
                      @{this.state.data.UserName}
                    </Text>
                    {this.state.data.Gender == 'on' ? (
                      <FontAwesomeIcon icon={faMale} color="blue" size={18} />
                    ) : (
                      <FontAwesomeIcon icon={faFemale} color="red" size={18} />
                    )}
                  </View>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 13,
                      fontFamily: 'Poppins-Reglar',
                      marginBottom: 5,
                    }}>
                    {this.state.data.Age} years
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 13,
                        fontFamily: 'Poppins-Reglar',
                      }}>
                      {this.state.data.city}, {this.state.data.country}
                    </Text>
                    <View style={{marginTop: -5, marginLeft: 5}}>
                      <CountryPicker
                        withAlphaFilter={true}
                        withCallingCode={true}
                        withFilter={true}
                        countryCode={this.state.cca2}
                        onSelect={value => {
                          this.setState({
                            cca2: value.cca2,
                          });
                        }}
                        cca2={this.state.cca2}
                        translation="eng"
                      />
                    </View>
                  </View>
                </View>
                <View style={{paddingRight: 15}}>
                  {this.state.data.user_type == 'n' ? (
                    <View
                      style={{
                        backgroundColor: '#00bff3',
                        padding: 7,
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: 'Poppins-Medium',
                          color: '#fff',
                        }}>
                        REGULAR MEMBERR
                      </Text>
                    </View>
                  ) : (
                    <Image
                      style={{
                        position: 'relative',
                        top: -16,
                        width: 90,
                        height: 38,
                      }}
                      source={images.vipIcon}
                    />
                  )}
                </View>
              </View>
            </View>
            {this.state.blockUser ? null : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  paddingRight: 10,
                  position: 'relative',
                  top: -20,
                }}>
                {this.addUser()}
                {this.heartIcon()}
                {/* {this.state.isFriend ? null : this.heartIcon()} */}
                {this.whatsApp()}
              </View>
            )}

            {this.header()}
            {this.bio()}
            {this.personalDetail()}
            {this.desiredPartner()}
          </ScrollView>

          <Toast ref={ref => Toast.setRef(ref)} />

          {this.state.showSpinner ? (
            <View style={styles.horizontal}>
              <Spinner
                textContent={'Loading...'}
                animation="fade"
                textStyle={styles.spinnerTextStyle}
                visible={this.state.showSpinner}
              />
            </View>
          ) : null}
          {this.state.showAlert ? (
            <Dialog.Container visible={this.state.showAlert}>
              <Dialog.Title>{this.state.errorTitle}</Dialog.Title>
              <Dialog.Description>{this.state.errorMsg}</Dialog.Description>
              <Dialog.Button
                color="#58c4b7"
                bold
                label="Cancel"
                onPress={this.handleCancel}
              />
              {this.state.isConfirmation ? (
                <Dialog.Button
                  color="#58c4b7"
                  bold
                  label="Okay"
                  onPress={this.handleConfirmation}
                />
              ) : null}
            </Dialog.Container>
          ) : null}

          <Modal
            isVisible={this.state.reportModal}
            // isVisible={true}
            animationInTiming={10}
            backdropOpacity={0.1}
            style={{
              width: '100%',
              alignSelf: 'center',
              justifyContent: 'flex-end',
              margin: 0,
              backgroundColor: 'black',
              // opacity: 0.6,
              flex: 1,
            }}>
            <View
              style={{
                height: '100%',
                width: '100%',
                borderColor: 'white',
                backgroundColor: 'white',
              }}>
              {console.log('==', this.state.reports.length)}
              {this.state.reports.length > 0
                ? this.state.reports.map((item, i) => {
                    return (
                      <TouchableOpacity
                        style={{
                          height: 50,
                          width: '100%',
                          borderBottomWidth: 0.5,
                          backgroundColor: 'white',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={
                          () => this.ReportedUser(item.reason, item.id)

                          //   this.setState({
                          //      reportModal:false
                          // }
                        }>
                        <Text> {item.reason} </Text>
                      </TouchableOpacity>
                    );
                  })
                : null}
            </View>
          </Modal>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{height: 250}}>
              <Spinner
                textContent={'Loading...'}
                animation="fade"
                textStyle={styles.spinnerTextStyle}
                visible={true}
              />
            </View>

            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 10,
                position: 'relative',
                top: -20,
              }}>
              {this.addUser()}
              {this.heartIcon()}
              {this.whatsApp()}
            </View> */}

            {this.header()}
            <Spinner
              textContent={'Loading...'}
              animation="fade"
              textStyle={styles.spinnerTextStyle}
              visible={true}
            />
            {/* {this.bio()}
            {this.personalDetail()}
            {this.desiredPartner()} */}
          </ScrollView>
        </View>
      );
    }
  }
}
const styles = {
  detailCont: {
    flex: 8,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  flx1: {flex: 1, borderRightWidth: 1, borderRightColor: '#ccc'},
  mb10: {marginBottom: 0},
  flxRw: {flexDirection: 'row'},
  txtHeading: {
    marginLeft: 10,
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#1e1e1e',
  },
  txtLbl: {
    marginLeft: 40,
    fontSize: 8,
    fontFamily: 'Poppins-Regular',
    color: '#474747',
  },
  headerView: {
    flex: 0.6,
    flexDirection: 'row',
    zIndex: 2,
    marginHorizontal: 10,
  },
  selectedCircle: {
    // paddingHorizontal:5,
    // padding:10,
    // paddingBottom:0,
    borderBottomColor: '#ff1822',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTxt: {
    color: '#ff1822',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  notSelectedCircle: {
    // padding:10,
    // paddingBottom:0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notSelectedTxt: {
    color: '#252525',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  getStartedView: {
    // flex: 1,
    paddingHorizontal: 5,
  },
  signUpView: {
    // flex: 2,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  getStarted: {
    flex: 6,
    paddingvertical: 20,
    paddingHorizontal: 15,
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
};
