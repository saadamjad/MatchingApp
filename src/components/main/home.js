import React, {PureComponent} from 'react';
import { View, Text, SafeAreaView , ImageBackground ,Image , AsyncStorage, ActivityIndicator } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';

import {Header} from '../common';

import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from "react-native-dialog";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus, faCommentDots, faFemale, faMale,faHeart, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { colors, images } from '../../constants/theme'
import CountryPicker from 'react-native-country-picker-modal'
import Swiper from 'react-native-swiper'
import YouTube from 'react-native-youtube';

export default class HomeCmp extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      cca2: 'PK',
      cca21: 'PK',
      cca22: 'PK',
      cca23: 'PK',
      cca24: 'PK',
      usersData:'',
      vipUserData:'',
      collection:[],
      isLoading:false,
      errorMsg:'a',
      errorTitle:''
    }
  }

  componentDidMount() {
    this.getData();
    this.getVipData();
  }

  async getData(i) {
    console.log('getData index: ', i);
    this.setState({showSpinner:true});
    let URL;
    if(i == undefined){
      URL = 'http://dev2.thebetatest.com/api/allusers';
    }
    else{ 
      URL = 'http://dev2.thebetatest.com/api/allusers?page='+i;
    }

    const user = await AsyncStorage.getItem('userData');
    const access_token = JSON.parse(user).access_token;
    // console.log(access_token)
    let headers = {
      headers: {
        'Authorization': access_token
      }
    }

    axios.get(URL, headers).then(async(res)=> {
      this.setState({showSpinner:false, usersData: res.data, collection: res.data.collection.data});
      // console.log(res.data);
    }).catch((error)=> {
      this.setState({showSpinner:false});
      console.log('error', error);
      this.setState({showAlert:true, errorMsg:'Something went wrong. '+error, errorTitle:'Error!!'});
    });
  }

  async getVipData() {
    const URL = 'http://dev2.thebetatest.com//api/all-vip';
    const user = await AsyncStorage.getItem('userData');
    const access_token = JSON.parse(user).access_token;
    console.log(access_token)
    let headers = {
      headers: {
        'Authorization': access_token
      }
    }

    axios.get(URL, headers).then(async(res)=> {
      this.setState({vipUserData: res.data});
      console.log('Vip user Data')
      console.log(res.data.collection.data);
    }).catch((error)=> {
      console.log('error', error);
      this.setState({showAlert:true, errorMsg:'Something went wrong. '+error, errorTitle:'Error!!'});
    });
  }

  onEndReached = async() => {
    console.log('onEndReached');
    console.log(this.state.usersData);
    const URL = this.state.usersData.collection.next_page_url;

    console.log(this.state.collection.length, this.state.usersData.collection.total);

    if(this.state.collection.length >= this.state.usersData.collection.total)
      console.log('Completed');
    else {
      this.setState({isLoading:true});
      const user = await AsyncStorage.getItem('userData');
      const access_token = JSON.parse(user).access_token;
      console.log(access_token)
      let headers = {
        headers: {
          'Authorization': access_token
        }
      }

      axios.get(URL, headers).then(async(res)=> {
        this.setState({isLoading:false, usersData: res.data});
        console.log(res.data.collection);
        for(let i=0; i<res.data.collection.data.length; i++) {
          let tmp = this.state.collection;
          tmp.push(res.data.collection.data[i]);

          if(i+1 == res.data.collection.data.length)
            this.setState({collection: tmp});
        }
      }).catch((error)=> {
        this.setState({isLoading:false});
        console.log('error', error);
        this.setState({showAlert:true, errorMsg:'Something went wrong. '+error, errorTitle:'Error!!'});
      });
    }
  }

  whatsApp(){
    return(
      <View style={{ padding:7, backgroundColor:'#49c858', borderRadius:30 }}>
        <FontAwesomeIcon icon={faCommentDots} color="#fff" size={20} />  
      </View>
    )
  }

  addUser(){
    return(
      <View style={{ padding:7, backgroundColor:'#ed145b', borderRadius:30, marginRight:7 }}>
        <FontAwesomeIcon icon={faUserPlus} color="#fff" size={20} />    
      </View>
    )
  }
  
  handleCancel() {
    this.setState({showAlert:false});
  }

  trimString(text) {
    console.log('trimString', text)
		if(text.length <= 15)
			return text;
		else
			return text.replace(/^(.{15}[^\s]*).*/, "$1")+'...'; 
  }
  
  renderFlatListHeader = () => {
    return(
      <View style={styles.HomeView}>
        <View style={styles.statsView}>
          <View style={{ marginTop:10, marginBottom:5 }}>
            <Text style={styles.statsTxt}>Your Statistics</Text>
          </View>
          <View style={ styles.statsCardsView }>
            <View style={ styles.statsCardView }>
              <TouchableOpacity>
                <ImageBackground style={styles.statsImg} source={images.statsDesignIcon}>
                  <View style={ styles.statsCardTxt }>
                    <View style={{ flex: 1, }}>
                      <Text style={styles.statsHeading}>People Interested In You</Text>
                    </View>
                    <View style={{ flex: 2, }}>
                      <Text style={styles.statsLabel}>003</Text>
                      <View style={{ backgroundColor:'#b3070d' , padding:5, width:36, height:36, textAlign:'center', borderRadius:36, justifyContent:'center', alignContent:'center', alignItems:'center' }}>
                        {/* <Image source={images.starIcon} /> */}
                        <FontAwesomeIcon icon={faStar} color="#fff" size={20} />  
                      </View>
                    </View>
                  </View>
                </ImageBackground> 
              </TouchableOpacity>
            </View>            
            <View style={ styles.statsCardView }>
              <ImageBackground style={styles.statsImg} source={images.statsDesignIcon}>
                <TouchableOpacity>
                    <View style={ styles.statsCardTxt }>
                      <View style={{ flex: 1, }}>
                        <Text style={styles.statsHeading}>WishList count</Text>
                      </View>
                      <View style={{ flex: 2, }}>
                        <Text style={[styles.statsLabel , { marginTop:10 }]}>002</Text>
                        <View style={{ backgroundColor:'#b3070d' , padding:5, width:36, height:36, textAlign:'center', borderRadius:36, justifyContent:'center', alignContent:'center', alignItems:'center' }}>
                          {/* <Image source={images.heartIcon} /> */}
                          <FontAwesomeIcon icon={faHeart} color="#fff" size={20} />  
                        </View>
                      </View>
                    </View>
                </TouchableOpacity>
              </ImageBackground> 
            </View>            
            <View style={ styles.statsCardView }>
              <TouchableOpacity>                  
                <ImageBackground style={styles.statsImg} source={images.statsDesignIcon}>
                  <View style={ styles.statsCardTxt }>
                    <View style={{ flex: 1, }}>
                      <Text style={styles.statsHeading}>People You Showed Interest in</Text>
                    </View>
                    <View style={{ flex: 2, }}>
                      <Text style={styles.statsLabel}>005</Text>
                      <View style={{ backgroundColor:'#b3070d' , padding:5, width:36, height:36, textAlign:'center', borderRadius:36, justifyContent:'center', alignContent:'center', alignItems:'center' }}>
                        {/* <Image source={images.starIcon} /> */}
                        <FontAwesomeIcon icon={faThumbsUp} color="#fff" size={20} />  
                      </View>
                    </View>
                  </View>
                </ImageBackground> 
              </TouchableOpacity>
            </View>            
          </View>
        </View>
        <View style={styles.vipUserView}>
          <View style={{ marginTop:10  }}>
            <Text style={styles.vipTxt}>Latest VIP Users</Text>
          </View>
          <Swiper 
            style={styles.wrapper} 
            showsButtons={true} 
            showsPagination={false} 
            prevButton={<Text style={{ color:'#000', fontSize:40,fontWeight:'bold' }}>‹</Text>}
            nextButton={<Text style={{ color:'#000', fontSize:40,fontWeight:'bold' }}>›</Text>}
            height={170}>
            {
              this.state.vipUserData != ''?
                this.state.vipUserData.collection.data.map((el, index) =>{
                  return(
                    <View style={styles.vipUserInner} key={index}>
                      <View style={{ flex:1, padding: 10 , paddingRight:0,  flexDirection:'row', borderRadius:10, backgroundColor:'#f6f6f6', shadowColor: "#000", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 2, }}>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Profile1', {data:el})}>
                          <View style={styles.vipImageView}>
                            <Image resizeMode='contain' source={{uri: 'http://dev2.thebetatest.com/'+el.profile_pic}} style={ styles.vipImageDimension } />
                          </View>
                        </TouchableOpacity>
                        <View style={[styles.vipContentView , styles.pt10]}>
                          <View style={styles.nameView}>
                            <Text style={styles.vipName}>{el.UserName}</Text>
                            <FontAwesomeIcon icon={faFemale} color="red" size={18} />
                          </View>
                          <View>
                            <Text style={styles.vipAge}>{el.Age} years</Text>
                          </View>
                          <View style={{ flexDirection:'row' }}>
                            <Image style={{ marginRight:5 , width:11, height:16 }} source={images.locationIcon} />
                            <Text style={ styles.vipLighTxt}>{el.city}, {el.country} </Text>
                            {/* <Image style={{ marginLeft:5, width:30, height:16 }} source={images.flagIcon} /> */}
                            <View style={{ position:'relative', bottom:5, marginBottom:-10 }}>
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
                          <View style={styles.vipEduView}>
                            <Text style={styles.vipDrakTxt}>Education: </Text>
                            <Text style={ styles.vipLighTxt}>{el.education} </Text>
                          </View>
                          <View style={styles.vipEduView}>
                            <Text style={styles.vipDrakTxt}>Sect: </Text>
                            <Text style={ styles.vipLighTxt}>Shia </Text>
                          </View>
                          <View style={[styles.socialView , styles.pos]}>
                            {this.addUser()}
                            { this.whatsApp() }
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                })
              :
              <View style={styles.vipUserInner}>
                <View style={{ flex:1, padding: 10 , paddingRight:0,  flexDirection:'row', borderRadius:10, backgroundColor:'#f6f6f6', shadowColor: "#000", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 2, }}>
                  <View style={styles.vipImageView}>
                    <Image source={images.vipUserIcon} style={ styles.vipImageDimension } />
                  </View>
                  <View style={[styles.vipContentView , styles.pt10]}>
                    <View style={styles.nameView}>
                      <Text style={styles.vipName}>@elena45</Text>
                      <FontAwesomeIcon icon={faFemale} color="red" size={18} />
                    </View>
                    <View>
                      <Text style={styles.vipAge}>28 years</Text>
                    </View>
                    <View style={{ flexDirection:'row' }}>
                      <Image style={{ marginRight:5 , width:11, height:16 }} source={images.locationIcon} />
                      <Text style={ styles.vipLighTxt}>New York, USA </Text>
                      {/* <Image style={{ marginLeft:5, width:30, height:16 }} source={images.flagIcon} /> */}
                      <View style={{ position:'relative', bottom:5, marginBottom:-10 }}>
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
                    <View style={styles.vipEduView}>
                      <Text style={styles.vipDrakTxt}>Education: </Text>
                      <Text style={ styles.vipLighTxt}>Masters </Text>
                    </View>
                    <View style={styles.vipEduView}>
                      <Text style={styles.vipDrakTxt}>Sect: </Text>
                      <Text style={ styles.vipLighTxt}>Shia </Text>
                    </View>
                    <View style={[styles.socialView , styles.pos]}>
                      {this.addUser()}
                      { this.whatsApp() }
                    </View>
                  </View>
                </View>
              </View>
            }
          </Swiper>
        </View>

        {/* <YouTube
          apiKey="app key here"
          // playlistId="PL5nl7U11kP5pVOMByiMAfSUWfF-NDFtcJ"
          videoId="6zTWmkfPrlE"
          // videoIds={["6zTWmkfPrlE" , "uTTJ1QKLi48" , "33SNNv9tJaQ"]}
          loop
          onError={e => console.log(e)}
          style={{ alignSelf: 'stretch', height: 200 }}
        /> */}
        
        <View style={styles.reglarUserView}>
          <View>
            <Text style={styles.vipTxt}>Success Stories</Text>
          </View>
        </View>

        <View style={styles.signupGSView}>
          <Swiper 
            style={styles.wrapper} 
            showsButtons={true}
            dotColor="#ccc" 
            activeDotColor='#ff1822'
            // showsPagination={false} 
            prevButton={<Text style={{ color:'#000', fontSize:40,fontWeight:'bold' }}>‹</Text>}
            nextButton={<Text style={{ color:'#000', fontSize:40,fontWeight:'bold' }}>›</Text>}
            // nextButton={<Text style={{ color:'#ff1822', fontSize:40,fontWeight:'bold' }}>›</Text>}
            height={250}>
              <View style={styles.swipCont}>
                <Image style={styles.swipImg} source={images.manWomenIcon}/>
                <View style={styles.starCont}>
                  <FontAwesomeIcon icon={faStar} color="#f9cb39" size={16} />  
                  <FontAwesomeIcon icon={faStar} color="#f9cb39" size={16} />  
                  <FontAwesomeIcon icon={faStar} color="#f9cb39" size={16} />  
                  <FontAwesomeIcon icon={faStar} color="#f9cb39" size={16} />  
                  <FontAwesomeIcon icon={faStar} color="#f9cb39" size={16} />  
                </View>
                <Text style={styles.txtFormat}>"Mustafa & Zeynep, Canada “We never thought we will find each other and click so quickly. I have to give credit to my friend Aliya for pointing me out about matchelitemuslim matchmaking service, no doubt most secure and private platform for Muslim community."</Text>
              </View>
              <View style={styles.swipCont}>
                <Image style={styles.swipImg} source={images.manWomenIcon0}/>
                <View style={styles.starCont}>
                  <FontAwesomeIcon icon={faStar} color="#f9cb39" size={16} />  
                  <FontAwesomeIcon icon={faStar} color="#f9cb39" size={16} />  
                  <FontAwesomeIcon icon={faStar} color="#f9cb39" size={16} />  
                  <FontAwesomeIcon icon={faStar} color="#f9cb39" size={16} />  
                  <FontAwesomeIcon icon={faStar} color="#f9cb39" size={16} />  
                </View>
                <Text style={styles.txtFormat}>"Zehra and Salman are both excited about finding their lifetime partner. Their whimsy, emotion,and excitement that comes from true and genuine moments. It’s PRICELESS! "</Text>
              </View>
              <View style={styles.swipCont}>
                <Image style={styles.swipImg} source={images.manWomenIcon1}/>
                <View style={styles.starCont}>
                  <FontAwesomeIcon icon={faStar} color="#f9cb39" size={16} />  
                  <FontAwesomeIcon icon={faStar} color="#f9cb39" size={16} />  
                  <FontAwesomeIcon icon={faStar} color="#f9cb39" size={16} />  
                  <FontAwesomeIcon icon={faStar} color="#f9cb39" size={16} />  
                  <FontAwesomeIcon icon={faStar} color="#f9cb39" size={16} />  
                </View>
                <Text style={styles.txtFormat}>" Aslam & Lubna, England “We are both professionals and from moderate Muslim family and our requirements was very specific…thanks matchelitemuslim for your VVIP service"</Text>
              </View>
              
          </Swiper>
        </View>

        <View style={styles.reglarUserView}>
          <View>
            <Text style={styles.vipTxt}>Latest Regular Users</Text>
          </View>
        </View>
      </View>
    )
  }

  renderFlatListFooter = () => {
    return(
      <>
      <TouchableOpacity activeOpacity={0.5} onPress={this.onEndReached}>
        <Text style={{width:'100%', height:30, backgroundColor:'red', color:'white', textAlign:'center', marginBottom:10, textAlignVertical:'center'}}>Show more...</Text>
      </TouchableOpacity>
      {this.state.isLoading ?
        <View style={[styles.container, styles.horizontalActivity]}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
        : null
      }
      </>
    )
  }
  renderFlatListData = (item, index)=> {
    return(
      <View style={styles.reglarUserView}>
        <View style={{ paddingHorizontal:10 }}>
          <View style={[styles.vipUserInner1 , styles.mb]}>
            <View style={styles.vipImageView}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Profile1', {data:item.item})}>
                <Image resizeMode='contain' source={{uri: 'http://dev2.thebetatest.com/'+item.item.profile_pic}} defaultSource={require('../../assets/noImage.png')} style={ styles.regularImageDimension } />
              </TouchableOpacity>
            </View>
            <View style={[styles.vipContentView , styles.pt10]}>
              <View style={styles.nameView}>
                <Text style={styles.vipName}>{item.item.UserName}</Text>
                {
                  item.item.Gender == 'off' ?
                  <FontAwesomeIcon icon={faFemale} color="red" size={18} />  
                  :
                  <FontAwesomeIcon icon={faMale} color="blue" size={18} />  
                }
                
              </View>
              <View>
                <Text style={styles.vipAge}>{item.item.Age} years</Text>
              </View>
              <View style={{ flexDirection:'row' }}>
                <Image style={{ marginRight:5 , width:11, height:16 }} source={images.locationIcon} />
                <Text style={ styles.vipLighTxt}>{item.item.state}</Text>
                {/* <Image style={{ marginLeft:5, width:30, height:16 }} source={images.flagIcon} /> */}
                {/* <View style={{ position:'relative', bottom:5, marginBottom:-10 }}>
                  <CountryPicker 
                    withAlphaFilter={true} 
                    withCallingCode={true} 
                    withFilter={true} 
                    countryCode={this.state.cca22}
                    onSelect={(value) => {  
                      this.setState({ cca22:value.cca2})
                    }}
                    cca2={this.state.cca22}
                    translation='eng'
                  />
                </View> */}
              </View>
              <View style={styles.vipEduView}>
                <Text style={styles.vipDrakTxt}>Education: </Text>
                <Text style={ styles.vipLighTxt}>
                  
                  {item.item.education? 
                    item.item.education.length <=10 ? 
                      item.item.education
                      :
                      item.item.education.substring(0,15)+'...'
                  : 'N/A'}
                </Text>
              </View>
              <View style={{ flexDirection:'row' }}>
                <View style={styles.vipEduView}>
                  <Text style={styles.vipDrakTxt}>Sect: </Text>
                  <Text style={ styles.vipLighTxt}>Shia </Text>
                </View>
                <View style={styles.socialView}>
                  {/* {this.addUser()} */}
                  <View style={{ padding:7, backgroundColor:'#ed145b', borderRadius:30, marginRight:7 }}>
                    <FontAwesomeIcon icon={faUserPlus} color="#fff" size={20} />    
                  </View>
                  {/* { this.whatsApp() } */}
                  <View style={{ padding:7, backgroundColor:'#49c858', borderRadius:30 }}>
                    <FontAwesomeIcon icon={faCommentDots} color="#fff" size={20} />  
                  </View>
                </View>
              </View>
            </View>
          </View>              
        </View>
      </View>
    )
  }

  render() {
    return(
      <SafeAreaView style={{flex:1}}>
        <Header name={'Dashboard'} navigation={this.props.navigation} />        
        <FlatList
          ListHeaderComponent= {this.renderFlatListHeader}
          ListFooterComponent= {this.renderFlatListFooter}
          showsVerticalScrollIndicator={false}
          data={this.state.collection}
          renderItem={this.renderFlatListData}
          keyExtractor={(item, index) => index.toString()}
          // onEndReached={this.onEndReached}
          // onEndReachedThreshold={0.5}
        />
        
        <View style={styles.horizontal}>
          <Spinner 
            textContent={'Loading...'}
            animation='fade'
            textStyle={styles.spinnerTextStyle}
            visible={this.state.showSpinner}
          />
        </View>
        <Dialog.Container visible={this.state.showAlert} >
          <Dialog.Title>{this.state.errorTitle}</Dialog.Title>
          <Dialog.Description>
            {this.state.errorMsg}
          </Dialog.Description>
          <Dialog.Button color="#58c4b7" bold label="Okay" onPress={this.handleCancel.bind(this)} />
        </Dialog.Container>

      </SafeAreaView>
    );
  }
}

const styles={
  HomeView:{
    flex:1, backgroundColor:'#fff'
  },
  wrapper:{
    // backgroundColor:'#ddd',
  },
  statsView:{
    flex:2,
    // padding: 10,
    paddingHorizontal:10
  },
  vipUserView:{
    flex:2.8,
    marginBottom:10,
  },  
  reglarUserView:{
    flex:3,   
    backgroundColor:'#ebebeb',
    marginTop:10 
  },
  statsTxt:{
    fontSize:18,
    fontFamily:'Poppins-Bold',
    color:'#1e1e1e',
    textAlign:'center',
  },
  statsCardsView:{
    flex:1,
    flexDirection:'row'
  },
  statsCardView:{
    flex:1, backgroundColor:'#ddd' , marginRight:10
  },
  statsImg: {flex: 1, resizeMode: "cover", justifyContent: "center"}, 
  vipUserInner: { flex:1, flexDirection:'row', borderRadius:10, paddingHorizontal:30 },
  vipUserInner1: { flex:1, flexDirection:'row', borderRadius:10, backgroundColor:'#fff',shadowColor: "#000", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 2, },
  vipImageView:{ flex:1},
  vipImageDimension:{ width:120 , height:150, borderRadius:10 },
  regularImageDimension:{ width:120 , height:150, borderTopLeftRadius:10,borderBottomLeftRadius:10 },
  vipContentView:{ flex: 1, paddingLeft:0 },
  nameView:{ flexDirection:'row' },
  pt10:{ padding:10, paddingLeft:0},
  vipTxt:{
    fontSize:18,
    fontFamily:'Poppins-Medium',
    color:'#1e1e1e',
    textAlign:'center',
    marginVertical:5
  },
  statsCardTxt:{
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
  statsHeading:{
    color:'#fff', textAlign:'center', fontSize:10, fontFamily:'Poppins-Regular'
  },
  statsLabel:{
    color:'#fff', textAlign:'center', fontSize:14, fontFamily:'Poppins-Medium', marginBottom:5
  },
  vipName:{ fontFamily:'Poppins-Bold', fontSize:16 },
  imgSize:{ width:144, height:145 },
  vipAge:{ fontFamily:'Poppins-Medium', fontSize:12 },
  vipLighTxt: { fontFamily:'Poppins-Regular', fontSize:12, flexWrap: 'wrap' },
  vipEduView:{flexDirection:'row', flex:1},
  socialView :{ flexDirection:'row', justifyContent:'flex-end', marginLeft:30},
  vipDrakTxt:{ fontFamily:'Poppins-SemiBold', fontSize:12 },
  mb:{ marginBottom:10},
  pos:{position:'relative',bottom:5},
  socialIcon:{ width:20, height:17 },
  spinnerTextStyle: {
    color: '#FFF'
  },
  horizontal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontalActivity: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  signupGSView:{
    justifyContent:'center',
    alignItems:'center', 
    marginTop:10
  },
  swipCont: { alignItems:'center', paddingHorizontal:35 },
  swipImg: { width:75, height:75, borderRadius:75, marginBottom:10 },
  starCont:{ flexDirection:'row', marginBottom:10 },
  txtFormat:{ color:"#878C9F" , fontSize:12, textAlign:'center' },       
}