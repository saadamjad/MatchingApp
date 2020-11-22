import React, {Component} from 'react';
import { View, Text, TouchableOpacity , Image ,Dimensions, Linking , SafeAreaView , ScrollView } from 'react-native';
import { colors, images } from '../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHandHoldingHeart, faMobile, faMale,faHeart, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Swiper from 'react-native-swiper'
const windowWidth = Dimensions.get('window').width;
import {Header} from '../common';
export default class AboutCmp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
	  return(
		<ScrollView style={{flex:1}}>
      <Header name={'Success Stories'} navigation={this.props.navigation} search={true} />

			<View style={styles.signupGSView}>
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