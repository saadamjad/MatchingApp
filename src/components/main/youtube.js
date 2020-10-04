import React, {Component} from 'react';
import { View,Dimensions, ScrollView } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import {Header} from '../common';
import YouTube from 'react-native-youtube';
import YoutubePlayer from "react-native-youtube-iframe";
export default class AboutCmp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
	  return(
		<ScrollView style={{flex:1}}>
      <Header name={'Youtube'} navigation={this.props.navigation} search={true} />

			<View style={styles.signupGSView}>
        <View style={{flex:1}}>
          <YoutubePlayer
            width={350}
            height={200}
            play={false}
            videoId="6zTWmkfPrlE"
          />
        </View>
        <View style={{flex:1}}>
          <YoutubePlayer
            width={350}
            height={200}
            play={false}
            videoId="uTTJ1QKLi48"
          />
        </View>
        <View style={{flex:1}}>
          <YoutubePlayer
            width={350}
            height={200}
            play={false}
            videoId="33SNNv9tJaQ"
          />
        </View>
      </View>
		</ScrollView>
    )
  }
}

const styles ={
  signupGSView:{
    flex:1, 
    justifyContent:'center',
    alignItems:'center', 
    marginTop:10
  },
  logoimgView:{
    flex: 0.4,
    justifyContent:'center',
  },
  textView:{
    flex: 1,
    justifyContent:'center'
  },
  headingView:{
	marginBottom:10,
	alignItems: 'center',
  },
  headingText:{
    fontSize:14,
    color:'#1e1e1e',
	textAlign:'center',
	textTransform:'uppercase',
    fontFamily:'Poppins-LightItalic',    
  },
  subHeadingView:{
  },
  subHeadingTxt:{
    fontSize:11,
    color:'#252525',
    // textAlign:'center',
	fontFamily:'Poppins-Regular', 
	paddingHorizontal:20, marginBottom:5
  },
  buttonView:{
    flex: 0.25,
    justifyContent:'center'
  },
  loginBtn:{
    backgroundColor:'#ff1822',
    padding: 15,
    borderRadius:30,
    width:windowWidth/1.2,
    marginBottom:10
  },
  signUpBtn:{
    backgroundColor:'#1e1e1e',
    padding: 15,
    borderRadius:30,
    width:windowWidth/1.2,
  },
  loginTxt:{
    color:'#fff',
    fontSize:14,
    textAlign:'center',
    fontFamily:'Poppins-SemiBold'
  },
  swipCont: { alignItems:'center', paddingHorizontal:35 , marginBottom:15 },
  swipImg: { width:75, height:75, borderRadius:75, marginBottom:10 },
  starCont:{ flexDirection:'row', marginBottom:10 },
  txtFormat:{ color:"#878C9F" , fontSize:12, textAlign:'center' },       
}