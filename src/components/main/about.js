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
		  	<Header name={'About Matchelite Muslim'} navigation={this.props.navigation} search={true} />

			<View style={styles.signupGSView}>
				<View style={styles.logoimgView}>
					<Image style={{ width:220, height:106, marginBottom:10 }} source={images.GStartedLogo} />
				</View>
				<View style={ styles.textView }>
          <View style={styles.headingView}>
            <Text style={ styles.headingText }>"Marriage is the eternal unity of two souls {"\n"} who had met long before being born {"\n"} into this temporary world!"</Text>
            <Image style={{ width:300 , height:17 }} source={images.aboutDesignIcon} />
          </View>
          <View style={ styles.subHeadingView }>
            <Text style={ styles.subHeadingTxt }>In Islam, marriage is half of our deen. The Dallas, Texas based company, matchelitemuslim, has developed an elite Muslim matrimony service that is trusted by Muslims worldwide. The goal of our platform to help single Muslims to find their perfect spouse. We wanted to minimize the hurdles of finding the perfect match for anyone by connecting people directly in a most convenient and secure manner. To accomplish this, we combined the convenience of modern technology with our Islamic values of matchmaking</Text>
            <Text style={ styles.subHeadingTxt }>There is a team of matchmakers, designers, engineers, and many more talented people behind matchelitemuslim who are using thier expertise so you can find your perfect match anywhere in the world! Our priority is to bring happiness in the life of our brothers and sisters through the beautiful relationship of marriage. Our logo clearly defines that privacy and honesty are our true values. All of your data and personal information is kept secure and entirely confidential on our platform. The matchelitemuslim community wants to do everything it can to help you find a spouse that will help make your life feel complete.</Text>
          </View>
				</View>
        <View style={{ marginHorizontal:15, borderColor:'rgb(238,238,238)', borderWidth:1 , padding:10, backgroundColor:'#fff', borderRadius:15 , alignItems:'center', marginBottom:10 }}>
          <FontAwesomeIcon icon={faHandHoldingHeart} color="#ff1822" size={36} />  
          <Text style={{ color: '#7d93b2' , fontFamily:'Poppins-Bold', fontSize:16 }}>Honesty</Text>
          <Text style={{ color:'#878C9F', fontSize:12,fontFamily:'Poppins-Reglar',textAlign:'center' }}>We are confident in the way we conduct business and believe that working truthfully and honestly is the key to permanent and long-term success. We are honest with you at every step and want to make sure our customers feel safe during the matchmaking process.</Text>
        </View>
        <View style={{ marginHorizontal:15, borderColor:'rgb(238,238,238)', borderWidth:1 , padding:10, backgroundColor:'#fff', borderRadius:15 , alignItems:'center', marginBottom:10 }}>
          <FontAwesomeIcon icon={faUserShield} color="#ff1822" size={36} />  
          <Text style={{ color: '#7d93b2' , fontFamily:'Poppins-Bold', fontSize:16 }}>Privacy</Text>
          <Text style={{ color:'#878C9F', fontSize:12,fontFamily:'Poppins-Reglar',textAlign:'center' }}>The team behind matchelitemuslim respects the privacy of people and are dedicated to the privacy and protection of every member. All the content and personal information of the registered members of matchelitemuslim is confidential and will not be shared with any other users. Your privacy is really important to us. We only disclose and share your information with your permission after you feel confident with a potential partner. Only you have the control of who can view your personal information, which includes your photos, profile, and contact details.</Text>
        </View>
        <View style={{ marginHorizontal:15, borderColor:'rgb(238,238,238)', borderWidth:1 , padding:10, backgroundColor:'#fff', borderRadius:15 , alignItems:'center', marginBottom:10 }}>
          <FontAwesomeIcon icon={faMobile} color="#ff1822" size={36} />  
          <Text style={{ color: '#7d93b2' , fontFamily:'Poppins-Bold', fontSize:16 }}>Technology</Text>
          <Text style={{ color:'#878C9F', fontSize:12,fontFamily:'Poppins-Reglar',textAlign:'center' }}>A team of highly talented and qualified engineers, matchmakers, and other professionals have built this one of a kind platform and will work with you so you can find your perfect soulmate.</Text>
        </View>
				<View style={ styles.buttonView }>
				<TouchableOpacity style={styles.loginBtn} onPress={()=> { Linking.openURL('https://matchelitemuslim.com/') }}>
					<Text style={ styles.loginTxt }>VISIT WEBSITE</Text>
				</TouchableOpacity>
				</View>
				{/* <StatusBar translucent backgroundColor="transparent" /> */}
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
    fontSize:10,
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