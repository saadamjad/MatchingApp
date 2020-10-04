import React, {Component} from 'react';
import { View, Text, TouchableOpacity , Image , SafeAreaView, ScrollView, AsyncStorage } from 'react-native';

import CountryPicker from 'react-native-country-picker-modal';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

import Toast from 'react-native-toast-message';
import Dialog from "react-native-dialog";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faUserPlus, faCommentDots , faEllipsisV, faFemale, faMale, faHeartBroken, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { SliderBox } from "react-native-image-slider-box";

import { images } from '../../constants/theme';

export default class ProfileCmp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step:0,
      cca2: 'US',
      reportBlock:false,
      data:this.props.route.params.data,
      user_type:'',
      images: [],
      showSpinner:false,
      showAlert:false,
      isConfirmation:false,
      errorMsg:'',
      errorTitle:'',
      isFriend:false,
      isWishlist:false,
      confirmAction:''
    }
  }

  async componentDidMount() {
    const images = [
      this.state.data.profile_pic,
      this.state.data.pic1,
      this.state.data.pic2
    ];
    const user_type = await AsyncStorage.getItem('user_type');
    this.setState({user_type: user_type});

    this.setState({images: images});
    this.checkIfAlreadyFriend();
  }

  async checkIfAlreadyFriend() {
    const user = await AsyncStorage.getItem('userData');
    const access_token = JSON.parse(user).access_token;
    let headers = {
      headers: {
        'Authorization': access_token
      }
    }
    const data = {from: JSON.parse(user).user.id, to:this.state.data.id};
    console.log(data);
    
    const URL = 'http://dev2.thebetatest.com/api/fav-int';

    axios.post(URL, data, headers).then(
      response=> {
        console.log(response.data);
        this.setState({isFriend: response.data.collection.interest, isWishlist:response.data.collection.favourite});
      },
      error=> {
        console.log(error);
      }
    )
  }

  header(){
    return(
      <View style={styles.headerView}>

        <View style={styles.getStartedView}>
          <TouchableOpacity onPress={()=>{ this.setState({ step:0 }) }} style={this.state.step == 0 ? styles.selectedCircle : styles.notSelectedCircle} activeOpacity={0.8}>
            <Text style={this.state.step == 0 ? styles.selectedTxt : styles.notSelectedTxt}>BIO</Text>
          </TouchableOpacity>            
        </View>
        
        <View style={styles.signUpView}>
          <TouchableOpacity onPress={()=>{ this.setState({ step:1 }) }} style={this.state.step == 1 ? styles.selectedCircle : styles.notSelectedCircle} activeOpacity={0.8}>
            <Text style={this.state.step == 1 ? styles.selectedTxt : styles.notSelectedTxt}>Personal Detail</Text>
          </TouchableOpacity>    
        </View>
        
        <View style={styles.signUpView}>
          <TouchableOpacity onPress={()=>{ this.setState({ step:2 }) }} style={this.state.step == 2 ? styles.selectedCircle : styles.notSelectedCircle} activeOpacity={0.8}>
            <Text style={this.state.step == 2 ? styles.selectedTxt : styles.notSelectedTxt}>Desired Partner</Text>
          </TouchableOpacity>   
        </View>

      </View>
    )
  }

  bio(){
    if(this.state.step == 0){
      return (
        <View style={styles.getStarted}>
          <View>
            <Text style={{ fontSize:13, fontFamily:'Poppins-Regular', color:'#1e1e1e', fontSize:12 }}>
              {this.state.data.about? this.state.data.about: 'N/A'}
            </Text>
          </View>
        </View>
      )
    }
  }

  personalDetail(){
    if(this.state.step == 1){
      return (
        <View style={styles.detailCont}>
          <View style={styles.flx1}>
            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image style={{ width:18, height:'100%' }} source={images.profileEdu} />
                <Text style={styles.txtHeading}>Education</Text>
              </View>
              <Text style={styles.txtLbl}>{this.state.data.education?this.state.data.education:'N/A'}</Text>
            </View>
            
            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image style={{ width:24, height:'100%' }} source={images.profileincome} />
                <Text style={styles.txtHeading}>Annual Income</Text>
              </View>
              <Text style={styles.txtLbl}>${this.state.data.income?this.state.data.income:'N/A'}</Text>
            </View>
            
            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image style={{ width:22, height:'100%' }} source={images.profileskin} />
                <Text style={styles.txtHeading}>Skin Tone </Text>
              </View>
              <Text style={styles.txtLbl}>{this.state.data.skin_tone?this.state.data.skin_tone:'N/A'}</Text>
            </View>

            <View style={styles.mb10}>
              <View style={styles.flxRw}>
              <Image style={{ width:18, height:'100%' }} source={images.profilebody} />
                <Text style={styles.txtHeading}>Body Type </Text>
              </View>
              <Text style={styles.txtLbl}>{this.state.data.body_type?this.state.data.body_type:'N/A'}</Text>
            </View>
            
            <View style={styles.mb10}>
              <View style={styles.flxRw}>
              <Image style={{ width:22, height:'100%' }} source={images.profilesmoke} />
                <Text style={styles.txtHeading}>Smoke</Text>
              </View>
              <Text style={styles.txtLbl}>{this.state.data.smoke?this.state.data.smoke:'N/A'}</Text>
            </View>
            
            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image style={{ width:15, height:'100%' }} source={images.profiledisablity} />
                <Text style={styles.txtHeading}>Disablility</Text>
              </View>
              <Text style={styles.txtLbl}>{this.state.data.disablility?this.state.data.disablility:'N/A'}</Text>
            </View>

            <View style={styles.mb10}>
              <View style={styles.flxRw}>
              <Image style={{ width:24, height:'100%' }} source={images.profilepets} />
                <Text style={styles.txtHeading}>Pets</Text>
              </View>
              <Text style={styles.txtLbl}>{this.state.data.pets?this.state.data.pets:'N/A'}</Text>
            </View>
            
            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image style={{ width:18, height:'100%' }} source={images.profileself_emp} />
                <Text style={styles.txtHeading}>Employment  Status</Text>
              </View>
              <Text style={styles.txtLbl}>{this.state.data.employment_status?this.state.data.employment_status:'N/A'}</Text>
            </View>
          </View>

          <View style={{ flex:1, paddingLeft:10 }}>
            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image style={{ width:24, height:'100%' }} source={images.profilemartial} />
                <Text style={styles.txtHeading}>Marital Status</Text>
              </View>
              <Text style={styles.txtLbl}>{this.state.data.marital_status?this.state.data.marital_status:'N/A'}</Text>
            </View>
            
            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image style={{ width:26, height:'100%' }} source={images.profilekids} />
                <Text style={styles.txtHeading}>Kids</Text>
              </View>
              <Text style={styles.txtLbl}>{this.state.data.kids?this.state.data.kids:'N/A'}</Text>
            </View>
            
            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image style={{ width:18, height:'100%' }}  source={images.profileheight} />
                <Text style={styles.txtHeading}>Height </Text>
              </View>
              <Text style={styles.txtLbl}>{this.state.data.height?this.state.data.height:'N/A'}</Text>
            </View>

            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image style={{ width:28, height:'100%' }} source={images.profileeye} />
                <Text style={styles.txtHeading}>Eye Color</Text>
              </View>
              <Text style={styles.txtLbl}>{this.state.data.eye_color?this.state.data.eye_color:'N/A'}</Text>
            </View>
            
            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image style={{ width:20, height:'100%' }} source={images.profilereligion} />
                <Text style={styles.txtHeading}>Religious</Text>
              </View>
              <Text style={styles.txtLbl}>{this.state.data.religious?this.state.data.religious:'N/A'}</Text>
            </View>

            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image style={{ width:24, height:'100%' }} source={images.profiledrink} />
                <Text style={styles.txtHeading}>Drink</Text>
              </View>
              <Text style={styles.txtLbl}>{this.state.data.drink?this.state.data.drink:'N/A'}</Text>
            </View>
            
            <View style={styles.mb10}>
              <View style={styles.flxRw}>
                <Image style={{ width:18, height:'100%' }} source={images.profileoccup} />
                <Text style={styles.txtHeading}>Occupation</Text>
              </View>
              <Text style={styles.txtLbl}>{this.state.data.occupation?this.state.data.occupation:'N/A'}</Text>
            </View>
          </View>
          
        </View>
      )
    }
  }

  desiredPartner(){
    if(this.state.step == 2){
      return (
        // , padding:10, flexDirection:'row', backgroundColor:'#fff', margin:10, marginTop:0, shadowColor: "#000", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3, 
        <View style={{flex:6,backgroundColor:'#fff' , padding:10, paddingTop:5, margin:10, marginTop:5, shadowColor: "#000", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3,}}>
          
            <View style={[styles.mb10 , { alignItems:'center' }]}>
              <View style={styles.flxRw}>
                <Text style={styles.txtHeading}>I am Seeking a </Text>                
              </View>
              <View style={{ flexDirection:'row' }}>
                <Text style={{ fontSize:9, fontFamily:'Poppins-Regular', color:'#474747' }}>{this.state.data.partner_looking_for?this.state.data.partner_looking_for:'N/A'}</Text>
                {
                  this.state.data.partner_looking_for == 'Female'?
                  <FontAwesomeIcon icon={faFemale} color="red" size={18} />  
                  :
                  <FontAwesomeIcon icon={faMale} color="blue" size={18} />  
                }
              </View>
            </View>
            <View style={{ flexDirection:'row', marginTop:5 }}>
              <View style={styles.flx1}>
                <View style={styles.mb10}>
                  <View style={styles.flxRw}>
                    <Image style={{ width:18, height:'100%' }} source={images.profileheight} />
                    <Text style={styles.txtHeading}>Height </Text>
                  </View>
                  <Text style={styles.txtLbl}>{this.state.data.partner_min_height}-{this.state.data.partner_max_height}</Text>
                </View>

                <View style={styles.mb10}>
                  <View style={styles.flxRw}>
                    <Image style={{ width:27, height:'100%' }} source={images.profilemothertongue} />
                    <Text style={styles.txtHeading}>Mother Tonge </Text>
                  </View>
                  <Text style={styles.txtLbl}>{this.state.data.partner_mother_tounge?this.state.data.partner_mother_tounge:'N/A'}</Text>
                </View>
                
                <View style={styles.mb10}>
                  <View style={styles.flxRw}>
                    <Image style={{ width:20, height:'100%' }} source={images.profilenationality} />
                    <Text style={styles.txtHeading}>Nationality </Text>
                  </View>
                  <Text style={styles.txtLbl}>{this.state.data.partner_nationality?this.state.data.partner_nationality:'N/A'}</Text>
                </View>

                <View style={styles.mb10}>
                  <View style={styles.flxRw}>
                    <Image style={{ width:20, height:'100%' }} source={images.profilereligion} />
                    <Text style={styles.txtHeading}>Religious</Text>
                  </View>
                  <Text style={styles.txtLbl}>{this.state.data.partner_religious?this.state.data.partner_religious:'N/A'}</Text>
                </View>

                <View style={styles.mb10}>
                  <View style={styles.flxRw}>
                  <Image style={{ width:18, height:'100%' }} source={images.profilebody} />
                    <Text style={styles.txtHeading}>Body Type </Text>
                  </View>
                  <Text style={styles.txtLbl}>{this.state.data.partner_body_type?this.state.data.partner_body_type:'N/A'}</Text>
                </View>

                <View style={styles.mb10}>
                  <View style={styles.flxRw}>
                    <Image style={{ width:28, height:'100%' }} source={images.profileeye} />
                    <Text style={styles.txtHeading}>Eye Color</Text>
                  </View>
                  <Text style={styles.txtLbl}>{this.state.data.partner_eye_color?this.state.data.partner_eye_color:'N/A'}</Text>
                </View>

                <View style={styles.mb10}>
                  <View style={styles.flxRw}>
                    <Image style={{ width:24, height:'100%' }} source={images.profiledrink} />
                    <Text style={styles.txtHeading}>Drink</Text>
                  </View>
                  <Text style={styles.txtLbl}>{this.state.data.partner_drink?this.state.data.partner_drink:'N/A'}</Text>
                </View>
              </View>

              <View style={{ flex:1, paddingLeft:10 }}>
                <View style={styles.mb10}>
                  <View style={styles.flxRw}>
                    <Image style={{ width:24, height:'100%' }} source={images.profileagedBetween} />
                    <Text style={styles.txtHeading}>Aged Between</Text>
                  </View>
                  <Text style={styles.txtLbl}>{this.state.data.partner_min_age?this.state.data.partner_min_age:'N/A'}-{this.state.data.partner_max_age?this.state.data.partner_max_age:'N/A'}</Text>
                </View>
                
                <View style={styles.mb10}>
                  <View style={styles.flxRw}>
                  <Image style={{ width:24, height:'100%' }} source={images.profilemartial} />
                    <Text style={styles.txtHeading}>Marital Status</Text>
                  </View>
                  <Text style={styles.txtLbl}>{this.state.data.partner_marital_status?this.state.data.partner_marital_status:'N/A'}</Text>
                </View>

                <View style={styles.mb10}>
                  <View style={styles.flxRw}>
                  <Image style={{ width:26, height:'100%' }} source={images.profilekids} />
                    <Text style={styles.txtHeading}>children</Text>
                  </View>
                  <Text style={styles.txtLbl}>{this.state.data.partner_children?this.state.data.partner_children:'N/A'}</Text>
                </View>

                <View style={styles.mb10}>
                  <View style={styles.flxRw}>
                    <Image style={{ width:18, height:'100%' }} source={images.profilecountrylive} />
                    <Text style={styles.txtHeading}>Country Live in</Text>
                  </View>
                  <Text style={styles.txtLbl}>{this.state.data.partner_country_livein?this.state.data.partner_country_livein:'N/A'}</Text>
                </View>

                <View style={styles.mb10}>
                  <View style={styles.flxRw}>
                    <Image style={{ width:24, height:'100%' }} source={images.profileincome} />
                    <Text style={styles.txtHeading}>Annual Income</Text>
                  </View>
                  <Text style={styles.txtLbl}>${this.state.data.partner_annual_income?this.state.data.partner_annual_income:'N/A'}</Text>
                </View>
                
                <View style={styles.mb10}>
                  <View style={styles.flxRw}>
                    <Image style={{ width:22, height:'100%' }} source={images.profileskin} />
                    <Text style={styles.txtHeading}>Skin Tone </Text>
                  </View>
                  <Text style={styles.txtLbl}>{this.state.data.partner_skin_tone?this.state.data.partner_skin_tone:'N/A'}</Text>
                </View>

                <View style={styles.mb10}>
                  <View style={styles.flxRw}>
                    <Image style={{ width:22, height:'100%' }} source={images.profilesmoke} />
                    <Text style={styles.txtHeading}>Smoke </Text>
                  </View>
                  <Text style={styles.txtLbl}>{this.state.data.partner_smoke?this.state.data.partner_smoke:'N/A'}</Text>
                </View>
              </View>
            </View>
          
        </View>
      )
    }
  }

  addToWishlist = async() => {
    this.setState({showSpinner:true});
    
    const user = await AsyncStorage.getItem('userData');
    const access_token = JSON.parse(user).access_token;
    console.log(access_token)
    let headers = {
      headers: {
        'Authorization': access_token
      }
    }
    const data = {fav_user_id: this.state.data.id};
    const URL = 'http://dev2.thebetatest.com/api/addtowishlist';
    axios.post(URL, data, headers).then(
      resposne=> {
        this.setState({showSpinner:false});
        console.log(resposne.data);
        if(!resposne.data.status)
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
        else{
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
          this.setState({isWishlist:true});
        }
      },
      error=> {
        this.setState({showSpinner:false});
        console.log(error);
      }
    );
  }

  removeFromWishlist = async() => {
    this.setState({showSpinner:true});
    
    const user = await AsyncStorage.getItem('userData');
    const access_token = JSON.parse(user).access_token;
    console.log(access_token)
    let header = {
      headers: {
        'Authorization': access_token
      }
    }
    const data = {
      fav_user_id: this.state.data.id,
      user_id: JSON.parse(user).user.id
    };
    console.log('data: ', data);
    const URL = 'http://dev2.thebetatest.com/api/removetowishlist';
    axios.post(URL, data, header).then(
      resposne=> {
        this.setState({showSpinner:false});
        console.log(resposne.data);
        if(!resposne.data.status)
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
          else{
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
            this.setState({isWishlist:false});
          }
      },
      error=> {
        this.setState({showSpinner:false});
        console.log(error);
      }
    );
  }

  addFriend = async() => {
    this.setState({showSpinner:true});
    
    const user = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(user);
    let headers = {
      headers: {
        'Authorization': userData.access_token
      }
    }
    const data = {to: this.state.data.id, from: userData.user.id, status:'sent'};
    const URL = 'http://dev2.thebetatest.com/api/send-interest';
    axios.post(URL, data, headers).then(
      resposne=> {
        this.setState({showSpinner:false});
        console.log(resposne.data);
        if(!resposne.data.status)
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
        else{
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
          this.setState({isFriend:true});
        }
      },
      error=> {
        this.setState({showSpinner:false});
        console.log(error);
      }
    );
  }

  whatsApp(){
    return(
      <View style={{ padding:8, backgroundColor:'#49c858', borderRadius:30, justifyContent:'center' }}>
        <FontAwesomeIcon icon={faCommentDots} color="#fff" size={24} />
        {/* <Image style={styles.socialIcon} source={images.whatsappIcon} /> */}
      </View>
    )
  }

   addUser(){
    return(
      this.state.data.user_type == 'v' && this.state.user_type == 'n'? 
        null
        :
        this.state.isFriend?
          <View style={{ padding:8, backgroundColor:'#ed145b', borderRadius:30, justifyContent:'center', marginRight:10 }}>
            <FontAwesomeIcon icon={faUserMinus} color="#fff" size={24} />        
          </View> 
          :
          <TouchableOpacity activeOpacity={0.8} onPress={this.addFriend}>
            <View style={{ padding:8, backgroundColor:'#ed145b', borderRadius:30, justifyContent:'center', marginRight:10 }}>
              <FontAwesomeIcon icon={faUserPlus} color="#fff" size={24} />        
            </View> 
          </TouchableOpacity>
    )
  }

  heartIcon(){
    return(
      this.state.isWishlist?
      <TouchableOpacity 
        activeOpacity={0.8} 
        onPress={()=>{
          this.setState({showAlert:true, errorTitle:'Confirm', errorMsg:'Are you sure you want to remove this profile from wishlist?', isConfirmation:true, confirmAction:'removeWishlist'})
        }}
      >
        <View style={{ padding:8, backgroundColor:'#1876f5', borderRadius:30, justifyContent:'center', marginRight:10 }}>
          <FontAwesomeIcon icon={faHeartBroken} color="#fff" size={24} />
        </View>
      </TouchableOpacity>
      :
      <TouchableOpacity 
        activeOpacity={0.8} 
        onPress={()=>{
          this.setState({showAlert:true, errorTitle:'Confirm', errorMsg:'Are you sure you want to add this profile in your wishlist?', isConfirmation:true, confirmAction:'addWishlist'})
        }}
      >
        <View style={{ padding:8, backgroundColor:'#1876f5', borderRadius:30, justifyContent:'center', marginRight:10 }}>
          <FontAwesomeIcon icon={faHeart} color="#fff" size={24} />
        </View>
      </TouchableOpacity>
    )
  }

  handleCancel = () => {
    this.setState({showAlert:false});
  }

  handleConfirmation = () => {
    if(this.state.confirmAction == 'addWishlist')
      this.setState({showAlert:false}, ()=> this.addToWishlist());
    else if(this.state.confirmAction == 'removeWishlist')
      this.setState({showAlert:false}, ()=> this.removeFromWishlist());
  }
// reportBlock
  render() {
    return(
      <SafeAreaView style={{flex:1}}>
        <ScrollView>
          <View style={{ height:250 }}>   
            <SliderBox 
              images={this.state.images}  
              sliderBoxHeight={250}
              inactiveDotColor="#ffffff" 
              dotStyle={{ marginTop:-220 , width: 10, height: 10, borderRadius: 10, margin:-50}} 
            />      
            <TouchableOpacity 
              onPress={()=> {this.setState({ reportBlock: !this.state.reportBlock })}} 
              style={{ position:'absolute', top:20, right:0, zIndex:999, width:'10%' }}
            >
              <FontAwesomeIcon icon={faEllipsisV} color="#fff" size={24} />
            </TouchableOpacity>
            {
              this.state.reportBlock == true ?
                <View style={{ position:'absolute', backgroundColor:'#fff' , paddingHorizontal:15, paddingVertical:10, borderRadius:5, right:25 , top:50 }}>
                  <Text style={{ marginBottom:10 }}>Report</Text>
                  <Text>Block</Text>
                </View> : null
            }
            <View style={{ flexDirection:'row', position:'absolute', bottom:0 , backgroundColor:'rgba(0,0,0,0.47)', width:'100%' , paddingHorizontal:15, paddingTop:10, paddingBottom:10 }}>
              <View style={{ flex:3 }}>
                <View style={{ flexDirection:'row' }}>
                  <Text style={{ color:'#fff', fontSize:18, fontFamily:'Poppins-Reglar', marginBottom:5 }}>{this.state.data.UserName}</Text>
                  {
                    this.state.data.Gender == 'on'?
                    <FontAwesomeIcon icon={faMale} color="blue" size={18} />:<FontAwesomeIcon icon={faFemale} color="red" size={18} />
                  }
                </View>
                <Text style={{ color:'#fff', fontSize:13, fontFamily:'Poppins-Reglar', marginBottom:5 }}>{this.state.data.Age} years</Text>
                <View style={{ flexDirection:'row' }}>
                  <Text style={{ color:'#fff', fontSize:13, fontFamily:'Poppins-Reglar' }}>{this.state.data.city}, {this.state.data.country}</Text>
                  <View style={{ marginTop:-5, marginLeft:5 }}>
                    <CountryPicker 
                      withAlphaFilter={true} 
                      withCallingCode={true} 
                      withFilter={true} 
                      countryCode={this.state.cca2}
                        onSelect={(value) => {  this.setState({ 
                          cca2:value.cca2
                        })}}
                        cca2={this.state.cca2}
                        translation='eng'
                    />
                  </View>
                </View>
              </View>
              <View style={{ paddingRight:15 }}>
                {
                this.state.data.user_type == 'n'?
                  <View style={{ backgroundColor:'#00bff3', padding: 7, borderRadius:10 }}>
                    <Text style={{ fontSize:10, fontFamily:'Poppins-Medium', color:'#fff' }}>REGULAR MEMBERR</Text>
                  </View> :
                  <Image style={{ position:'relative', top:-16, width:90, height:38 }} source={images.vipIcon} />
                }
              </View>
            </View>
          </View> 
          
          <View style={{ flexDirection:'row', justifyContent:'flex-end', paddingRight:10, position: 'relative', top:-20}}>
            { this.addUser() }
            { this.heartIcon() }
            { this.whatsApp() }
          </View>

          {this.header()}
          {this.bio()}
          {this.personalDetail()}
          {this.desiredPartner()}
        </ScrollView>

        <View style={styles.horizontal}>
          <Spinner 
            textContent={'Loading...'}
            animation='fade'
            textStyle={styles.spinnerTextStyle}
            visible={this.state.showSpinner}
          />
        </View>

        <Toast ref={(ref) => Toast.setRef(ref)} />

        <Dialog.Container visible={this.state.showAlert} >
          <Dialog.Title>{this.state.errorTitle}</Dialog.Title>
          <Dialog.Description>
            {this.state.errorMsg}
          </Dialog.Description>
          <Dialog.Button color="#58c4b7" bold label="Cancel" onPress={this.handleCancel} />
          {
            this.state.isConfirmation?
            <Dialog.Button color="#58c4b7" bold label="Okay" onPress={this.handleConfirmation} />:null
          }
        </Dialog.Container>
      </SafeAreaView>
    )
  }
}
const styles = {
  detailCont:{ flex:8 , padding:10, flexDirection:'row', backgroundColor:'#fff', margin:10, marginTop:5, shadowColor: "#000", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3, },
  flx1:{flex: 1, borderRightWidth:1, borderRightColor:'#ccc'},
  mb10:{ marginBottom:0 },
  flxRw:{flexDirection:'row'},
  txtHeading:{ marginLeft:10 , fontSize:12, fontFamily:'Poppins-SemiBold', color:'#1e1e1e' },
  txtLbl:{ marginLeft:40 , fontSize:8, fontFamily:'Poppins-Regular', color:'#474747' },
  headerView:{
    flex:0.6,
    flexDirection:'row',
    zIndex:2,
    marginHorizontal:10
  },
  selectedCircle:{ 
    // paddingHorizontal:5,
    // padding:10,
    // paddingBottom:0,
    borderBottomColor:'#ff1822',
    borderBottomWidth:1,
    justifyContent:'center',
    alignItems:'center' 
  },
  selectedTxt:{
    color:'#ff1822',
    fontSize:14,
    fontFamily:'Poppins-SemiBold'
  },
  notSelectedCircle:{ 
    // padding:10,
    // paddingBottom:0,
    justifyContent:'center',
    alignItems:'center' 
  },
  notSelectedTxt:{
    color:'#252525',
    fontSize:14,
    fontFamily:'Poppins-SemiBold'
  },
  getStartedView:{    
    // flex: 1,
    paddingHorizontal:5
  },
  signUpView:{
    // flex: 2,   
    alignItems:'center', 
    paddingHorizontal:5
  },
  getStarted:{
    flex:6,
    paddingvertical:20, 
    paddingHorizontal:15
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  horizontal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
}