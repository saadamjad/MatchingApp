import React, {Component} from 'react';
import { View, Text, TouchableOpacity , Image ,Dimensions, Linking , SafeAreaView , ScrollView } from 'react-native';
import { colors, images } from '../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserShield, faHandHoldingHeart, faMobile, faMale,faHeart, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
const windowWidth = Dimensions.get('window').width;
import {Header} from '../common';
export default class AboutCmp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
	  return(
		<ScrollView style={{flex:1}}>
		  	<Header name={'Why us'} navigation={this.props.navigation} search={true} />

			<View style={styles.signupGSView}>
				<View style={ styles.textView }>
          <View style={ styles.subHeadingView }>
            <Text style={{ fontSize:12, fontFamily:'Poppins-Medium',paddingHorizontal:20, marginBottom:5  }}><Text style={{ color:'#ff1822' }}>MatchEliteMuslim</Text> is the best place for elite users to register.</Text>
            <Text style={ styles.subHeadingTxt }>MatchEliteMuslim is a constantly growing community of individuals where you can look for your prospective partners without risking privacy. We know what Muslims want in a partner and understand the values of the Muslim community like no other matchmaking service.</Text>
            <Text style={ styles.subHeadingTxt }>MatchEliteMuslim assures you that no one will be able to access identifying information until you approve it. The process will be transparent for the user but strictly confidential to others. To protect your name from appearing publicly, you can get a username that you can use to chat and browse with prospective partners. You and only you can share your data with suitors once you feel that they is the right person.</Text>
          </View>
				</View>
				<View style={ styles.textView }>
          <View style={ styles.subHeadingView }>
            <Text style={{ fontSize:12, fontFamily:'Poppins-Medium',paddingHorizontal:20, marginBottom:5  }}>MatchEliteMuslim is the first matchmaking service to Accept Digital Payments</Text>
            <Text style={ styles.subHeadingTxt }>It provides users to transfer payments from different currencies in seconds across the globe. It is one of the ambitious aims intended to reduce the need for an older system like SWIFT or Western Union. <Text style={{ fontWeight:'bold' }}>Please contact us on <Text style={{ color:'blue' }}>info@matchelitemuslim.com</Text> for making payment in XRP.</Text></Text>
          </View>
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
  }
}