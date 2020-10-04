import React, {Component} from 'react';
import { View, Text, TouchableOpacity , Image , StatusBar , SafeAreaView, TextInput ,Picker} from 'react-native';
import { images } from '../../constants/theme';
import {Header} from '../common';
import { ScrollView } from 'react-native-gesture-handler';
export default class ProfileCmp extends Component {

  constructor(props) {
    super(props);
    this.updateArry = this.updateArry.bind(this);
    this.state = {
      step:0,
      education:'',
      income:'',
      skin:'',
      body:'',
      smoke:'',
      employee:'',
      pet:'',
      disablity:'',
      body:'',
      occpation:'',
      drink:'',
      religious:'',
      eye:'',
      height:'',
      kid:'',
      marital:'',
      Cooking:'',
      smoke:'',
      tone:'',
      incomeDP:'',
      educationDP:'',
      country:'',
      children:'',
      maritalDp:'',
      age:'',
      drink:'',
      eyeDP:'',
      bodyDP:'',
      profession:'',
      religiousDP:'',
      nationality:'',
      tounge:'',
      heightDP:'',
      seeking:'',
      qualities:[
        {id:0, name:'Adaptable', selected:0},
        {id:1, name:'Creative', selected:0},
        {id:2, name:'Adaptable1', selected:0},
        {id:3, name:'Adaptable', selected:0},
        {id:4, name:'Creative', selected:0},
        {id:5, name:'Adaptable1', selected:0},
        {id:6, name:'Adaptable', selected:0},
        {id:7, name:'Creative', selected:0},
        {id:8, name:'Adaptable1', selected:0},
      ],
      hobbies:[
        {id:0, name:'Adaptable', selected:0},
        {id:1, name:'Creative', selected:0},
        {id:2, name:'Adaptable1', selected:0},
        {id:3, name:'Adaptable', selected:0},
        {id:4, name:'Creative', selected:0},
        {id:5, name:'Adaptable1', selected:0},
        {id:6, name:'Adaptable', selected:0},
        {id:7, name:'Creative', selected:0},
        {id:8, name:'Adaptable1', selected:0},
      ]

    }
  }

  header(){
    return(
      <View style={styles.headerView}>

        <View style={styles.getStartedView}>
          <TouchableOpacity onPress={()=>{ this.setState({ step:0 }) }} style={this.state.step == 0 ? styles.selectedCircle : styles.notSelectedCircle} activeOpacity={0.8}>
            <Text style={this.state.step == 0 ? styles.selectedTxt : styles.notSelectedTxt}>BIO</Text>
          </TouchableOpacity>            
        </View>
        
        <View style={styles.verificationView}>
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
  updateArry(ind , array){
    if(array == 'qualities' ){
      var states =  this.state.qualities ;
      var updatedArry = [];
      for(var i = 0; i< states.length; i++){
        if(i == ind){
          if(states[i].selected == 1){
            updatedArry.push({ id:states[i].id , name:states[i].name , selected: 0})            
          }
          else{
            updatedArry.push({ id:states[i].id , name:states[i].name , selected: 1})
          }
        }
        else{
          updatedArry.push(states[i])
        }
      }
      setTimeout(() => {
        this.setState({
          qualities: updatedArry
        })
      }, 100);

    }
    else{
      var states =  this.state.hobbies ;
      var updatedArry = [];
      for(var i = 0; i< states.length; i++){
        if(i == ind){
          if(states[i].selected == 1){
            updatedArry.push({ id:states[i].id , name:states[i].name , selected: 0})            
          }
          else{
            updatedArry.push({ id:states[i].id , name:states[i].name , selected: 1})
          }
        }
        else{
          updatedArry.push(states[i])
        }
      }
      setTimeout(() => {
        this.setState({
          hobbies: updatedArry
        })
      }, 100);
    }
    console.log('updatedArry' , updatedArry)
  }
  bio(){
    if(this.state.step == 0){
      return (
        <View style={styles.getStarted}>
          <View>
            <TextInput
              placeholder="Enter Bio"
              placeholderTextColor="#ccc"
              keyboardType="email-address"
              style={styles.inputFld}                 
              numberOfLines={8}
              multiline={true}
            />
          </View>         
          <View style={{ marginTop:10 }}>
            <Text style={styles.txtHeading}>Qualities</Text>
          </View>
          {
            this.state.qualities.map((val, i) => (
              (i%3) == 0 ?
              <View style={{ flexDirection:'row' , width:'100%' }}>
                <TouchableOpacity onPress={()=>  { this.updateArry( i , 'qualities')}} style={{ width:'33%' }}><Text style={this.state.qualities[i].selected == 0 ? styles.tags : styles.tagsSelected}>{ this.state.qualities[i].name }</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>  { this.updateArry( i+1 , 'qualities')}} style={{ width:'33%' }}><Text style={this.state.qualities[i+1].selected == 0 ? styles.tags : styles.tagsSelected}>{ this.state.qualities[i+1].name }</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>  { this.updateArry( i+2 , 'qualities')}} style={{ width:'33%' }}><Text style={this.state.qualities[i+2].selected == 0 ? styles.tags : styles.tagsSelected}>{ this.state.qualities[i+2].name }</Text></TouchableOpacity>
              </View> : null
            ))
          }
          <View style={{ marginTop:10 }}>
            <Text style={styles.txtHeading}>Hobbies:</Text>
          </View>

          {
            this.state.hobbies.map((val, i) => (
              (i%3) == 0 ?
              <View style={{ flexDirection:'row' , width:'100%' }}>
                <TouchableOpacity onPress={()=>  { this.updateArry( i , 'hobbies')}} style={{ width:'33%' }}><Text style={this.state.hobbies[i].selected == 0 ? styles.tags : styles.tagsSelected}>{ this.state.hobbies[i].name }</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>  { this.updateArry( i+1 , 'hobbies')}} style={{ width:'33%' }}><Text style={this.state.hobbies[i+1].selected == 0 ? styles.tags : styles.tagsSelected}>{ this.state.hobbies[i+1].name }</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>  { this.updateArry( i+2 , 'hobbies')}} style={{ width:'33%' }}><Text style={this.state.hobbies[i+2].selected == 0 ? styles.tags : styles.tagsSelected}>{ this.state.hobbies[i+2].name }</Text></TouchableOpacity>
              </View> : null
            ))
          }

          <TouchableOpacity style={styles.signUpBtn} onPress={()=>{ this.setState({ step:1 }) }}>
            <Text style={ styles.signUpBtnTxt }>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  personalDetail(){
    if(this.state.step == 1){
      return (
        <View style={styles.detailCont}>
          <ScrollView>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.education} onValueChange = {(val)=>{ this.setState({ education: val}) }}>
                <Picker.Item label="Education" value="Education" />
                <Picker.Item label="BS" value="BS" />
              </Picker>
              <Text style = {styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.income} onValueChange = {(val)=>{ this.setState({ income: val}) }}>
                <Picker.Item label="Annual Income" value="Annual Income" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
              <Text style = {styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.skin} onValueChange = {(val)=>{ this.setState({ skin: val}) }}>
                <Picker.Item label="Skin Tone" value="Skin Tone" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
              <Text style = {styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.body} onValueChange = {(val)=>{ this.setState({ body: val}) }}>
                <Picker.Item label="Body Type" value="Body Type" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
              <Text style = {styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.disablity} onValueChange = {(val)=>{ this.setState({ disablity: val}) }}>
                <Picker.Item label="Disablity" value="Disablity" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
              <Text style = {styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.pet} onValueChange = {(val)=>{ this.setState({ pet: val}) }}>
                <Picker.Item label="Pets" value="Pets" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
              <Text style = {styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.employee} onValueChange = {(val)=>{ this.setState({ employee: val}) }}>
                <Picker.Item label="Employee Status" value="Employee Status" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
              <Text style = {styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.marital} onValueChange = {(val)=>{ this.setState({ marital: val}) }}>
                <Picker.Item label="Marital Status" value="Marital Status" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.kid} onValueChange = {(val)=>{ this.setState({ kid: val}) }}>
                <Picker.Item label="Kids" value="Kids" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.height} onValueChange = {(val)=>{ this.setState({ height: val}) }}>
                <Picker.Item label="Height" value="Height" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.eye} onValueChange = {(val)=>{ this.setState({ eye: val}) }}>
                <Picker.Item label="Eye Colour" value="Eye Colour" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.religious} onValueChange = {(val)=>{ this.setState({ religious: val}) }}>
                <Picker.Item label="Religious" value="Religious" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.drink} onValueChange = {(val)=>{ this.setState({ drink: val}) }}>
                <Picker.Item label="Drink" value="Drink" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.occpation} onValueChange = {(val)=>{ this.setState({ occpation: val}) }}>
                <Picker.Item label="Occupation" value="Occupation" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <TouchableOpacity style={styles.signUpBtn} onPress={()=>{ this.setState({ step:1 }) }}>
              <Text style={ styles.signUpBtnTxt }>Save Changes</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )
    }
  }

  desiredPartner(){
    if(this.state.step == 2){
      return (
        <View style={styles.detailCont}>
          <ScrollView>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.seeking} onValueChange = {(val)=>{ this.setState({ seeking: val}) }}>
                <Picker.Item label="I am Seeking" value="I am Seeking" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
              <Text style = {styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.heightDP} onValueChange = {(val)=>{ this.setState({ heightDP: val}) }}>
                <Picker.Item label="Height" value="Height" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
              <Text style = {styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.tounge} onValueChange = {(val)=>{ this.setState({ tounge: val}) }}>
                <Picker.Item label="Mother Tongue" value="Mother Tongue" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
              <Text style = {styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.nationality} onValueChange = {(val)=>{ this.setState({ nationality: val}) }}>
                <Picker.Item label="Nationality" value="Nationality" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
              <Text style = {styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.religiousDP} onValueChange = {(val)=>{ this.setState({ religiousDP: val}) }}>
                <Picker.Item label="Religious" value="Religious" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
              <Text style = {styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.profession} onValueChange = {(val)=>{ this.setState({ profession: val}) }}>
                <Picker.Item label="Profession" value="Profession" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
              <Text style = {styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.bodyDP} onValueChange = {(val)=>{ this.setState({ bodyDP: val}) }}>
                <Picker.Item label="Body Type" value="Body Type" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
              <Text style = {styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.eyeDP} onValueChange = {(val)=>{ this.setState({ eyeDP: val}) }}>
                <Picker.Item label="Eye Colour" value="Eye Colour" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.drink} onValueChange = {(val)=>{ this.setState({ drink: val}) }}>
                <Picker.Item label="Drink" value="Drink" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.age} onValueChange = {(val)=>{ this.setState({ age: val}) }}>
                <Picker.Item label="Age" value="Age" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.maritalDp} onValueChange = {(val)=>{ this.setState({ maritalDp: val}) }}>
                <Picker.Item label="Marital status" value="Marital status" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.children} onValueChange = {(val)=>{ this.setState({ children: val}) }}>
                <Picker.Item label="Children" value="Children" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.country} onValueChange = {(val)=>{ this.setState({ country: val}) }}>
                <Picker.Item label="Country live in" value="Country live in" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.educationDP} onValueChange = {(val)=>{ this.setState({ educationDP: val}) }}>
                <Picker.Item label="Min Education" value="Min Education" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.incomeDP} onValueChange = {(val)=>{ this.setState({ incomeDP: val}) }}>
                <Picker.Item label="Annual Income" value="Annual Income" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.tone} onValueChange = {(val)=>{ this.setState({ tone: val}) }}>
                <Picker.Item label="Skin Tone" value="Skin Tone" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.smoke} onValueChange = {(val)=>{ this.setState({ smoke: val}) }}>
                <Picker.Item label="Smoke" value="Smoke" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{ height: 50, width: 280 }}
                selectedValue = {this.state.cooking} onValueChange = {(val)=>{ this.setState({ cooking: val}) }}>
                <Picker.Item label="Cooking" value="Cooking" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <TouchableOpacity style={styles.signUpBtn} onPress={()=>{ this.setState({ step:1 }) }}>
              <Text style={ styles.signUpBtnTxt }>Save Changes</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )
    }
  }


  render() {
    return(
      <SafeAreaView style={{flex:1 , backgrounColor:'#f6f6f6'}}>
        <Header name={'Edit Profile'} navigation={this.props.navigation} />
        {this.header()}
        {this.bio()}
        {this.personalDetail()}
        {this.desiredPartner()}
      </SafeAreaView>
    )
  }
}
const styles = {  
  mb2:{
    marginBottom:10,
  },
  signUpBtn:{
    backgroundColor:'#ff1822',
    padding: 10,
    borderRadius:30,
    marginTop:10
  },
  
  signUpBtnTxt:{
    textAlign:'center',
    color:'#fff', 
    fontSize:18,
    fontFamily:'Poppins-SemiBold',
    textTransform:'uppercase',
  },
  inputFldView:{
    borderWidth:1,
    borderColor:'#000',
    borderRadius:30,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
  },
  inputFld:{    
    marginLeft:10,
    color:'#000',
    // width:deviceWidth-120,
  },
  tags:{ backgroundColor:'#f5f6fa', color:'#c4b6b3', padding:10, borderRadius:10, marginRight:10, fontSize:12, fontFamily:'Poppins-Regular', marginBottom:3 , textAlign:'center' },
  tagsSelected:{ backgroundColor:'red', color:'#fff', padding:10, borderRadius:10, marginRight:10, fontSize:12, fontFamily:'Poppins-Regular', marginBottom:3, textAlign:'center'  },
  inputFld:{ borderWidth:1, borderColor:'#ccc', borderRadius:10 },
  detailCont:{ flex:6,backgrounColor:'#fff' , padding:20},
  flx1:{flex: 1, borderRightWidth:1, borderRightColor:'#ccc'},
  mb10:{ marginBottom:0 },
  flxRw:{flexDirection:'row'},
  txtHeading:{ marginLeft:10 , fontSize:12, fontFamily:'Poppins-SemiBold', color:'#1e1e1e' },
  txtLbl:{ marginLeft:40 , fontSize:9, fontFamily:'Poppins-Regular', color:'#474747' },
  headerView:{
    paddingHorizontal:10,
    // flex:0.,
    flexDirection:'row',
    zIndex:2,
  },
  selectedCircle:{ 
    padding:10,
    paddingBottom:0,
    borderBottomColor:'#ff1822',
    borderBottomWidth:1,
    justifyContent:'center',
    alignItems:'center' 
  },
  selectedTxt:{
    color:'#ff1822',
    fontSize:12,
    fontFamily:'Poppins-SemiBold'
  },
  notSelectedCircle:{ 
    padding:10,
    justifyContent:'center',
    alignItems:'center' 
  },
  notSelectedTxt:{
    color:'#252525',
    fontSize:12,
    fontFamily:'Poppins-SemiBold'
  },
  getStartedView:{    
    // flex: 1,
  },
  signUpView:{
    // flex: 1,   
    alignItems:'center'
  },
  getStarted:{
    flex:6,
    paddingTop:20,
    paddingHorizontal:15, backgroundColor:'#fff', margin:10
  },
}