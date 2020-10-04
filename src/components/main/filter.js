import React, {Component} from 'react';
import { View, Text, TouchableOpacity , Dimensions, Image , TextInput , CheckBox , Picker , ScrollView, BackHandler , StatusBar , SafeAreaView} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import {Header} from '../common';
import { colors, images } from '../../constants/theme';
import RangeSlider from 'rn-range-slider';
const {height:deviceHeight, width:deviceWidth} = Dimensions.get('screen');
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons';

export default class SignupCmp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step:0,
      isEmaiForm:true,
      country: '',
      religious:'',
      education:'',
      maritalStatus:'',
      gender:'m'
    }
  }

  UNSAFE_componentWillMount(){
    BackHandler.addEventListener(
			'hardwareBackPress',
			this.handleBackButtonClick,
		);
  }
  handleBackButtonClick = () => {
    this.props.navigation.navigate('Matches')
  };

  updateCountry = (country) => {
    this.setState({ country })
  }
  updateReligious = (religious) => {
    this.setState({ religious })
  }
  updateEdcation = (education) => {
    this.setState({ education })
  }
  updateMaritalStatus = (maritalStatus) => {
    this.setState({ maritalStatus })
  }

  render() {
    return(
      <SafeAreaView style={{flex:1}}>
        <Header name={'Filter'} navigation={this.props.navigation} />
        <View style={styles.separator} />
        <ScrollView style={styles.signp}>
          <View style={[styles.inputFldView, styles.mb2]}>
            <Text style={styles.labelTt}>COUNTRY</Text>
            <Picker
              style={styles.pickerStyle}
              selectedValue = {this.state.country} onValueChange = {this.updateCountry}>
              <Picker.Item label="Search Country" value="Search Country" />
              <Picker.Item label="Pakistan" value="Pakistan" />
            </Picker>
          </View>
          
          <View style={styles.genderView}>
            <View>
              <Text style={styles.genderTxt}>Gender</Text>
            </View>
            {/* <View style={styles.genderIcons}>
              <TouchableOpacity style={styles.mr5} onPress={()=>{ this.setState({ gender:'m' }) }}>
                <Image style={styles.genderIconDimension} source={ this.state.gender == 'm' ? images.maleSIcon : images.maleIcon } />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{ this.setState({ gender:'f' }) }}>
                <Image style={styles.fgenderIconDimension} source={ this.state.gender == 'f' ? images.femaleSIcon : images.femaleIcon } />
              </TouchableOpacity>
            </View> */}
            <View style={styles.genderIcons}>
              {/* <TouchableOpacity style={styles.mr5} onPress={()=>{ this.setState({ gender:'m' }) }}> */}
              <TouchableOpacity style={ this.state.gender == 'm' ? [styles.selectedIcon , styles.mr5] : [styles.deSelectedIcon, styles.mr5] } onPress={()=>{ this.setState({ gender:'m' }) }}>
                <FontAwesomeIcon icon={faMale} color={ this.state.gender == 'm' ? '#fff' : '#ff1822' } size={28} />
                {/* <Image style={styles.genderIconDimension} source={ this.state.gender == 'm' ? images.maleSIcon : images.maleIIcon } /> */}
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={()=>{ this.setState({ gender:'f' }) }}> */}
              <TouchableOpacity style={ this.state.gender == 'f' ? styles.selectedIcon : styles.deSelectedIcon } onPress={()=>{ this.setState({ gender:'f' }) }}>
                {/* <Image style={styles.fgenderIconDimension} source={ this.state.gender == 'f' ? images.femaleSIcon : images.femaleIIcon } /> */}
                <FontAwesomeIcon icon={faFemale} color={ this.state.gender == 'f' ? '#fff' : '#ff1822' } size={28} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={[styles.inputFldView1, styles.mb2]}>
            <Text style={styles.labelTt}>Age</Text>
            
            {/* <TextInput
              placeholder="Age"
              keyboardType="phone-pad"
              placeholderTextColor="#000"
              style={styles.inputFld}                 
            />               */}
            <View style={{ paddingHorizontal:20 }}>
              <RangeSlider
                style={{width: '100%', height: 60 }}
                gravity={'center'}
                min={18}
                max={50}
                // step={20}
                blankColor="#ccc"
                selectionColor="#ff1822"
                />
            </View>
          </View>
          
          <View style={[styles.inputFldView1, styles.mb2]}>
            <Text style={styles.labelTt}>Height</Text>
            
            {/* <TextInput
              placeholder="Height"
              keyboardType="phone-pad"
              placeholderTextColor="#000"
              style={styles.inputFld}                 
            />               */}
            <View style={{ paddingHorizontal:20 }}>
              <RangeSlider
                style={{width: '100%', height: 60 }}
                gravity={'center'}
                min={3}
                max={7}
                step={1}
                blankColor="#ccc"
                selectionColor="#ff1822"
              />
            </View>
          </View>
          
          <View style={[styles.inputFldView, styles.mb2]}>
            <Text style={styles.labelTt}>Religious</Text>
              <Picker
                style={styles.pickerStyle}
              selectedValue = {this.state.religious} onValueChange = {this.updateReligious}>
              <Picker.Item label="Very Religious" value="Very Religious" />
            </Picker>
          </View>
          
          <View style={[styles.inputFldView, styles.mb2]}>
          <Text style={styles.labelTt}>education</Text>
              <Picker
                style={styles.pickerStyle}
              selectedValue = {this.state.edcation} onValueChange = {this.updateEdcation}>
              <Picker.Item label="Bachelors" value="Bachelors" />
              <Picker.Item label="Master" value="Master" />
            </Picker>
          </View>

          <View style={[styles.inputFldView, styles.mb2]}>
            <Text style={styles.labelTt}>Marital Status</Text>
              <Picker
                style={styles.pickerStyle}
              selectedValue = {this.state.maritalStatus} onValueChange = {this.updateMaritalStatus}>
              <Picker.Item label="Single" value="Single" />
              <Picker.Item label="married" value="married" />
            </Picker>
          </View>
          
          <View>
            <TouchableOpacity style={styles.sendBtn} onPress={this.signup}>
              <Text style={ styles.signUpBtnTxt }>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        
        </ScrollView>
      </SafeAreaView>
    )
  }
}
const styles = {
  labelTt:{ fontFamily:'Poppins-Bold', fontSize:14, paddingLeft:20, textTransform:'uppercase' },
  pickerStyle:{ height: 50, width: 370, marginLeft:-25 , color:'#242424' , transform: [ { scaleX: 0.8 }, { scaleY: 0.8 }, ]},
  headerView:{
    flex:1,
    flexDirection:'row',
    zIndex:2,
  },
  separator:{
    width:(deviceWidth-190),
    height:1,
    backgroundColor:'#ff1822' ,
    position:'absolute',
    right:95,
    top:42,
    zIndex:1
  },
  inputFldView:{
    borderBottomWidth:1,
    borderBottomColor:'#000',
    borderRadius:30,
    // paddingHorizontal:20,
  },
  inputFldView1:{
    borderRadius:30,
    // borderBottomWidth:1,
    // borderBottomColor:'#000',
    // paddingHorizontal:20,
  },
  inputFld:{    
    marginLeft:15,
    color:'#000',
    width:deviceWidth-120,
  },
  mb2:{
    marginBottom:15
  },
  mr5:{
    marginRight:5,
  },
  signUpBtn:{
    width:deviceWidth-60,
    backgroundColor:'#ff1822',
    padding: 10,
    borderRadius:30,
    marginTop:10
  },
  sendBtn:{
    // width:deviceWidth-60,
    backgroundColor:'#ff1822',
    padding: 10,
    // borderRadius:30,
    marginTop:10,
    marginBottom:20,
  },
  signUpBtnTxt:{
    textAlign:'center',
    color:'#fff', 
    fontSize:18,
    fontFamily:'Poppins-SemiBold',
    textTransform:'uppercase',
  },  
  signp:{
    flex: 6,
    paddingHorizontal:10,
    paddingTop:15, 
  },
  genderView:{
    borderRadius:30,flexDirection:'row',alignItems:'center',paddingHorizontal:20, marginBottom:10 
  },
  genderTxt:{fontFamily:'Poppins-Bold', fontSize:14, textTransform:'uppercase' },
  genderIcons:{ 
    flex:1, flexDirection:'row' , justifyContent:'flex-end' 
  },
  genderIconDimension:{
    width:52 , height:50
  },
  fgenderIconDimension:{
    width:52 , height:48
  },
  selectedIcon:{
    width:48, height:48, justifyContent:'center', alignItems:'center', backgroundColor:'#ff1822', borderRadius:48, borderWidth:2, borderColor:'#fff',
  },
  deSelectedIcon:{
      width:48, height:48, justifyContent:'center', alignItems:'center', backgroundColor:'#fff', borderRadius:48 , borderWidth:2, borderColor:'#ff1822'
  }
}