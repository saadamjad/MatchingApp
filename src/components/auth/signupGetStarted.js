import React, {Component} from 'react';
import { View, Text, TouchableOpacity , Image ,Dimensions, StatusBar  } from 'react-native';
import { colors, images } from '../../constants/theme';
const windowWidth = Dimensions.get('window').width;

export default class SignupGettingStartedCmp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.signupGSView}>
        <View style={styles.logoimgView}>
          <Image source={images.GStartedLogo} style={{ width:250, height:120 }} />
        </View>
        <View style={ styles.textView }>
          <View style={styles.headingView}>
            <Text style={ styles.headingText }>Meet Elite and Like </Text>
            <Text style={ styles.headingText }>Minded Muslim Singles</Text>
          </View>
          <View style={ styles.subHeadingView }>
            <Text style={ styles.subHeadingTxt }>40,000,000 single worldwide and 3 </Text>
            <Text style={ styles.subHeadingTxt }>million messages sent daily.</Text>
          </View>
        </View>
        <View style={ styles.buttonView }>
          <TouchableOpacity style={styles.loginBtn} onPress={()=> this.props.navigation.navigate('Signin')}>
            <Text style={ styles.loginTxt }>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpBtn} onPress={()=> this.props.navigation.navigate('SubscribePlan')}>
            <Text style={ styles.loginTxt }>SIGN UP</Text>
          </TouchableOpacity>
        </View>
        {/* <StatusBar translucent backgroundColor="transparent" /> */}
      </View>
    )
  }
}

const styles ={
  signupGSView:{
    flex:1, 
    justifyContent:'center',
    alignItems:'center', 
  },
  logoimgView:{
    flex: 1,
    justifyContent:'center',
  },
  textView:{
    flex: 1,
    justifyContent:'center'
  },
  headingView:{
    marginBottom:20
  },
  headingText:{
    fontSize:22,
    color:'#1e1e1e',
    textAlign:'center',
    fontFamily:'Poppins-Medium',    
  },
  subHeadingView:{
  },
  subHeadingTxt:{
    fontSize:16,
    color:'#121212',
    textAlign:'center',
    fontFamily:'Poppins-Light'
  },
  buttonView:{
    flex: 1,
    justifyContent:'center',
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