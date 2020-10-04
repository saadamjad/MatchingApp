import React, {Component} from 'react';
import { View, Text, SafeAreaView ,Image , AsyncStorage, ActivityIndicator } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';

import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from "react-native-dialog";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCheck, faUserPlus, faCommentDots, faFemale, faMale } from '@fortawesome/free-solid-svg-icons';
import { images } from '../../constants/theme'

import { Header } from '../common';

export default class MatchesCmp extends Component {

  constructor(props) {
    super(props);
    this.state={
      userData:'',
      collection:[],
      showAlert:false,
      showSpinner:false,
      isLoading:false,
      errorMsg:'',
      errorTitle:''
    }
    this.getData();
    this.props.navigation.addListener('willFocus', async () => {
      this.getData();
    });
  }

  handleCancel() {
    this.setState({showAlert:false});
  }

  async getData(i) {
    console.log('getData index: ', i);
    let URL;
    if(i == undefined){
      URL = 'http://dev2.thebetatest.com/api/allusers';
    }
    else{ 
      URL = 'http://dev2.thebetatest.com/api/allusers?page='+i;
    }

    const user = await AsyncStorage.getItem('userData');
    const access_token = JSON.parse(user).access_token;
    console.log(access_token)
    let headers = {
      headers: {
        'Authorization': access_token
      }
    }

    this.setState({showSpinner:true});
    axios.get(URL, headers).then(async(res)=> {
      this.setState({showSpinner:false, usersData: res.data, collection: res.data.collection.data});
      console.log(res.data);
    }).catch((error)=> {
      console.log('error', error);
      this.setState({showSpinner:false, showAlert:true, errorMsg:'Something went wrong. '+error, errorTitle:'Error!!'});
    });
  }

  whatsApp(){
    return(
      <View style={{ padding:8, backgroundColor:'#49c858', borderRadius:30, justifyContent:'center' }}>
        <FontAwesomeIcon icon={faCommentDots} color="#fff" size={20} />        
      </View>
    )
  }

  addUser(){
    return(
      <View style={{ padding:8, backgroundColor:'#ed145b', borderRadius:30, justifyContent:'center', marginRight:7 }}>
        <FontAwesomeIcon icon={faUserPlus} color="#fff" size={20} />        
      </View>
    )
  }

  friendRequestSent(){
    return(
      <View style={{ padding:8, backgroundColor:'#aeadad', borderRadius:30, justifyContent:'center', marginRight:7 }}>
        <FontAwesomeIcon icon={faUserCheck} color="#fff" size={20} />                
      </View>
    )
  }

  renderFlatListData = (item, index)=> {
    return(
      <View style={styles.reglarUserView}>
        <View style={{ paddingHorizontal:10 }}>
          <View style={[styles.vipUserInner1 , styles.mb]}>
            <View style={styles.vipImageView}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Profile1', {data:item.item})}>
                <Image source={{uri: 'http://dev2.thebetatest.com/'+item.item.profile_pic}} defaultSource={require('../../assets/noImage.png')} style={ styles.regularImageDimension } />
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

  renderFlatListFooter = () => {
    return(
      <>
      {this.state.isLoading ?
        <ActivityIndicator size="small" color="#0000ff" />
        : 
        <TouchableOpacity activeOpacity={0.5} onPress={this.onEndReached}>
          <Text style={{width:'100%', height:30, backgroundColor:'red', color:'white', textAlign:'center', marginBottom:10, textAlignVertical:'center'}}>Show more...</Text>
        </TouchableOpacity>
      }
      </>
    )
  }

  onEndReached = async() => {
    const URL = this.state.usersData.collection.next_page_url;
    if(this.state.collection.length >= this.state.usersData.collection.total)
      console.log('Completed');
    else {
      const user = await AsyncStorage.getItem('userData');
      const access_token = JSON.parse(user).access_token;
      let headers = {
        headers: {
          'Authorization': access_token
        }
      }
      this.setState({isLoading:true}, () => {
        this.flatList.scrollToEnd({animated: true})
      });
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

  render() {
    return(
      <SafeAreaView style={{flex:1}}>
        <Header name={'Matches'} navigation={this.props.navigation} fliter="1" />
        <FlatList
          ref={ref => this.flatList = ref}
          ListFooterComponent= {this.renderFlatListFooter}
          showsVerticalScrollIndicator={false}
          data={this.state.collection}
          renderItem={this.renderFlatListData}
          keyExtractor={(item, index) => index.toString()}
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
    )
  }
}
const styles={
  reglarUserView:{
    flex:3,   
    backgroundColor:'#ebebeb',
    marginTop:10 
  },
  vipUserInner1: { 
    flex:1, 
    flexDirection:'row', 
    borderRadius:10, 
    backgroundColor:'#fff',
    shadowColor: "#000", 
    shadowOffset: { 
      width: 0, 
      height: 1, 
    }, 
    shadowOpacity: 0.22, 
    shadowRadius: 2.22, 
    elevation: 2, 
  },
  mb:{ 
    marginBottom:10
  },
  vipImageView:{ 
    flex:1
  },
  regularImageDimension:{ 
    width:140 , 
    height:145, 
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10 
  },
  vipContentView:{ 
    flex: 1, 
    paddingLeft:0 
  },
  pt10:{ 
    padding:10, 
    paddingLeft:0
  },
  nameView:{ 
    flexDirection:'row' 
  },
  vipName:{ 
    fontFamily:'Poppins-Bold', 
    fontSize:16 
  },
  vipAge:{ 
    fontFamily:'Poppins-Medium', 
    fontSize:12 
  },
  vipLighTxt: { 
    fontFamily:'Poppins-Regular', 
    fontSize:12, 
    flexWrap: 'wrap' 
  },
  vipEduView:{
    flexDirection:'row', 
    flex:1
  },
  vipDrakTxt:{ 
    fontFamily:'Poppins-SemiBold', 
    fontSize:12 
  },
  socialView:{ 
    flexDirection:'row', 
    justifyContent:'flex-end', 
    marginLeft:30
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
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontalActivity: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
}