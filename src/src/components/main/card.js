import React, {Component} from 'react';
import { View, Text, TouchableOpacity , Image ,Dimensions, StatusBar , SafeAreaView , TextInput , Picker } from 'react-native';
import { colors, images } from '../../constants/theme';
import {Header} from '../common';
const windowWidth = Dimensions.get('window').width;
export default class CardCmp extends Component {
  constructor(props) {
    super(props);
    this.state ={
      country:"",
      year:""
    }
  }

  
  updateCountry = (country) => {
    this.setState({ country })
  }

  updateYear = (year) => {
    this.setState({ year })
  }
  render() {
    return(
      <SafeAreaView style={{flex:1}}>
		  	<Header name={'ADD A CARD'} navigation={this.props.navigation} />      
        <View style={styles.signupGSView}>
          <View style={styles.logoimgView}>
            <View style={[styles.inputFldView , styles.mb2]}>
              <TextInput
                placeholder="Name on Card"
                placeholderTextColor="#000"
                style={styles.inputFld}                 
              />
            </View>
            <View style={[styles.inputFldView , styles.mb2]}>
              <TextInput
                placeholder="Enter Card Number"
                placeholderTextColor="#000"
                style={styles.inputFld}                 
              />
            </View>
            <View>
              <Image source={images.visaCardIcon} />
            </View>
          </View>
          <View style={ styles.textView }>
            <Text style={styles.expireTxt}>Expiration Date</Text>
            <View style={{ flex:1, flexDirection:'row' }}>
              <View style={styles.fl1}>
                <View style={[styles.inputFldView, styles.mb2]}>
                  <Picker
                    style={styles.pickerSize}
                    selectedValue = {this.state.country} onValueChange = {this.updateCountry}>
                    <Picker.Item label="Month" value="Month" />
                    <Picker.Item label="June" value="June" />
                  </Picker>
                </View>
              </View>
              <View style={[styles.fl1 , styles.ml1]}>
                <View style={[styles.inputFldView, styles.mb2]}>
                  <Picker
                    style={styles.pickerSize}
                    selectedValue = {this.state.year} onValueChange = {this.updateYear}>
                    <Picker.Item label="Year" value="Year" />
                    <Picker.Item label="2020" value="2020" />
                  </Picker>
                </View>
              </View>
            </View>
            <View style={[styles.inputFldView , styles.mb2]}>
              <TextInput
                placeholder="Security Code"
                placeholderTextColor="#000"
                style={styles.inputFld}                 
              />
            </View>
          </View>
          <View style={ styles.buttonView }>
            <TouchableOpacity style={styles.loginBtn}>
              <Text style={ styles.loginTxt }>PAY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUpBtn}>
              <Text style={ styles.loginTxt }>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles ={
  signupGSView:{
    flex:1, 
    justifyContent:'center',
    alignItems:'center', 
    backgroundColor: '#fff',
  },
  logoimgView:{
    flex: 1.25,
    justifyContent:'flex-end',
    alignItems: 'center',
  },
  expireTxt:{ marginLeft:15, marginBottom:10, fontFamily:'Poppins-Bold', fontSize:14  },
  pickerSize:{ height: 50, width: 280 },
  textView:{
    flex: 1,
    justifyContent:'center'
  },
  fl1:{ flex:1 },
  ml1:{ marginLeft:10 },
  headingView:{
    marginBottom:20
  },
  buttonView:{
    flex: 1,
    justifyContent:'flex-start',
    marginTop:10
  },
  loginBtn:{
    backgroundColor:'#ff1822',
    padding: 15,
    borderRadius:30,
    width:windowWidth/1.2,
    marginBottom:25
  },
  signUpBtn:{
    backgroundColor:'#1e1e1e',
    padding: 15,
    borderRadius:30,
    width:windowWidth/1.2,
  },
  loginTxt:{
    color:'#fff',
    fontSize:18,
    textAlign:'center',
    fontFamily:'Poppins-SemiBold'
  },
  inputFldView:{
    borderWidth:1,
    borderColor:'#000',
    borderRadius:30,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
  },  
  mb2:{
    marginBottom:15
  },
  inputFld:{    
    marginLeft:10,
    color:'#000',
    width:'80%',
  },
}
