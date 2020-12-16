import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  TextInput,
  Picker,
  AsyncStorage,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {images} from '../../constants/theme';
import {Header} from '../common';
import {ScrollView} from 'react-native-gesture-handler';
import {min} from 'react-native-reanimated';
export default class ProfileCmp extends Component {
  constructor(props) {
    super(props);
    this.updateArry = this.updateArry.bind(this);
    this.state = {
      step: 0,
      education: '',
      income: '',
      skin: '',
      body: '',
      smoke: '',
      employee: '',
      pet: '',
      disablity: '',
      body: '',
      occpation: '',
      drink: '',
      religious: '',
      eye: '',
      height: '',
      kid: '',
      marital: '',
      Cooking: '',
      dpSmoke: '',
      tone: '',
      incomeDP: '',
      educationDP: '',
      country: '',
      children: '',
      maritalDp: '',
      age: '',
      drink: '',
      eyeDP: '',
      bodyDP: '',
      profession: '',
      religiousDP: '',
      nationality: '',
      tounge: '',
      maxAge: '',
      minAge: '',
      heightDP: '',
      seeking: '',
      userDetail: {},
      isEdit: false,
      isEdit1: false,
      isEdit2: false,
      text: '',
      qualities: [
        // {id: 0, name: 'Adaptable', selected: 0},
        // {id: 1, name: 'Creative', selected: 0},
        // {id: 2, name: 'Adaptable1', selected: 0},
        // {id: 3, name: 'Adaptable', selected: 0},
        // {id: 4, name: 'Creative', selected: 0},
        // {id: 5, name: 'Adaptable1', selected: 0},
        // {id: 6, name: 'Adaptable', selected: 0},
        // {id: 7, name: 'Creative', selected: 0},
        // {id: 8, name: 'Adaptable1', selected: 0},
      ],
      hobbies: [
        {id: 0, name: 'Adaptable', selected: true},
        {id: 1, name: 'Creative', selected: false},
        {id: 2, name: 'Adaptable1', selected: false},
        {id: 3, name: 'Adaptable', selected: false},
        {id: 4, name: 'Creative', selected: false},
        {id: 5, name: 'Adaptable1', selected: false},
        {id: 6, name: 'Adaptable', selected: false},
        {id: 7, name: 'Creative', selected: false},
        {id: 8, name: 'Adaptable1', selected: false},
      ],
    };
  }

  updateBio = async () => {
    console.log('CLICK HY BE!!');
    const {text, qualities, hobbies} = this.state;
    if (text == '' || qualities == '' || hobbies == '') {
      this.setState({showSpinner: false});
      alert('Please fill bio');
    } else {
      const user = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(user);
      const access_token = userData.access_token;
      const id = userData.user.id;
      let qualitiesToSend = '';
      let hobbiesToSend = '';
      qualities.map(val => {
        if (val.selected) {
          qualitiesToSend =
            qualitiesToSend.length > 0
              ? qualitiesToSend + ' ' + val.quality
              : val.quality;
          console.log('AWAAM KO PAGAL BNAYA HUA HY!!', qualitiesToSend);
        }
      });
      hobbies.map(val => {
        if (val.selected) {
          hobbiesToSend =
            hobbiesToSend.length > 0
              ? hobbiesToSend + ' ' + val.hobby
              : val.hobby;
        }
      });
      // console.log(
      //   'BHAI KIA CHUTYAPE MACHA RAKHE HY!!',
      //   qualitiesToSend,
      //   hobbiesToSend,
      // );
      this.setState({showSpinner: true});
      axios
        .post(
          `http://dev2.thebetatest.com/api/update/personal/bio`,
          {
            id,
            your_self: text,
            qualities: qualitiesToSend,
            hobbies: hobbiesToSend,
          },
          {
            headers: {Authorization: access_token},
          },
        )
        .then(async res => {
          this.setState({showSpinner: false});
          console.log('res BIO BOY', res.data);
          if (res.data.status) {
            alert('UPDATED');
            console.log('DONE HoGYA BHAI KIA HY BE!!', res.data);
          }
        })
        .catch(error => {
          this.setState({showSpinner: false});
          console.log('error', error);
          this.setState({
            showAlert: true,
            errorMsg: 'Something went wrong. ' + error,
            errorTitle: 'Error!!',
          });
        });
    }
  };
  updatePersonalDetail = async () => {
    const {
      education,
      income,
      skin,
      body,
      employee,
      pet,
      disablity,
      occpation,
      drink,
      religious,
      eye,
      height,
      kid,
      marital,
    } = this.state;
    if (
      education !== '' ||
      income !== '' ||
      skin !== '' ||
      body !== '' ||
      disablity !== '' ||
      pet !== '' ||
      employee !== '' ||
      marital !== '' ||
      kid !== '' ||
      height !== '' ||
      eye !== '' ||
      religious !== '' ||
      drink !== '' ||
      occpation !== ''
    ) {
      const user = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(user);
      const access_token = userData.access_token;
      const id = userData.user.id;
      this.setState({showSpinner: true});
      axios
        .post(
          `http://dev2.thebetatest.com/api/update/personal/details`,
          {
            id,
            education,
            income,
            skin_tone: skin,
            body_type: body,
            employment_status: employee,
            pets: pet,
            disability: disablity,
            occupation: occpation,
            drink,
            religious,
            eye_color: eye,
            height,
            kids: kid,
            marital_status: marital,
          },
          {
            headers: {Authorization: access_token},
          },
        )
        .then(async res => {
          this.setState({showSpinner: false});
          console.log('res', res.data);
          if (res.data.status) {
            alert('UPDATED');
            console.log('DONE HoGYA BHAI KIA HY BE!!', res.data);
          }
        })
        .catch(error => {
          this.setState({showSpinner: false});
          console.log('error', error);
          this.setState({
            showAlert: true,
            errorMsg: 'Something went wrong. ' + error,
            errorTitle: 'Error!!',
          });
        });
    } else {
      this.setState({showSpinner: false});
      alert('Kindly Select some details');
    }
  };
  updateDesiredPartner = async () => {
    const {
      seeking,
      age,
      heightDP,
      bodyDP,
      maritalDp,
      children,
      tounge,
      drink,
      minAge,
      dpSmoke,
      maxAge,
      minHeight,
      maxHeight,
      nationality,
      country,
      religiousDP,
      educationDP,
      profession,
      incomeDP,
      tone,
      eyeDP,
      smoke,
      Cooking,
    } = this.state;
    if (
      seeking !== '' ||
      age !== '' ||
      minAge !== '' ||
      maxAge !== '' ||
      minHeight !== '' ||
      maxHeight !== '' ||
      bodyDP !== '' ||
      maritalDp !== '' ||
      children !== '' ||
      tounge !== '' ||
      drink !== '' ||
      nationality !== '' ||
      country !== '' ||
      religiousDP !== '' ||
      educationDP !== '' ||
      profession !== '' ||
      incomeDP !== '' ||
      tone !== '' ||
      eyeDP !== '' ||
      smoke !== '' ||
      Cooking !== ''
    ) {
      const user = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(user);
      const access_token = userData.access_token;
      const id = userData.user.id;
      this.setState({showSpinner: true});
      axios
        .post(
          `http://dev2.thebetatest.com/api/update/partner/detail`,
          {
            id,
            seeking_a: seeking,
            age_from: minAge,
            age_to: maxAge,
            height_from: minHeight,
            height_to: maxHeight,
            marital_status: maritalDp,
            mother_tounge: tounge,
            children: children,
            nationality: nationality,
            country_live_in: country,
            religious: religiousDP,
            min_education: educationDP,
            profession: profession,
            annual_income: incomeDP,
            body_type: bodyDP,
            skin_tone: tone,
            eye_color: eyeDP,
            smoke: dpSmoke,
            drink: drink,
            cooking: Cooking,
          },
          {
            headers: {Authorization: access_token},
          },
        )
        .then(async res => {
          this.setState({showSpinner: false});
          console.log('res', res.data);
          if (res.data.status) {
            alert('UPDATED');
            console.log('DONE HoGYA BHAI KIA HY BE!!', res.data);
          }
        })
        .catch(error => {
          this.setState({showSpinner: false});
          console.log('error', error);
          this.setState({
            showAlert: true,
            errorMsg: 'Something went wrong. ' + error,
            errorTitle: 'Error!!',
          });
        });
    } else {
      this.setState({showSpinner: false});
      alert('There is some error occured');
    }
  };
  header() {
    return (
      <View style={styles.headerView}>
        <View style={styles.getStartedView}>
          <TouchableOpacity
            onPress={() => {
              this.setState({step: 0});
            }}
            style={
              this.state.step == 0
                ? styles.selectedCircle
                : styles.notSelectedCircle
            }
            activeOpacity={0.8}>
            <Text
              style={
                this.state.step == 0
                  ? styles.selectedTxt
                  : styles.notSelectedTxt
              }>
              BIO
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.verificationView}>
          <TouchableOpacity
            onPress={() => {
              this.setState({step: 1});
            }}
            style={
              this.state.step == 1
                ? styles.selectedCircle
                : styles.notSelectedCircle
            }
            activeOpacity={0.8}>
            <Text
              style={
                this.state.step == 1
                  ? styles.selectedTxt
                  : styles.notSelectedTxt
              }>
              Personal Detail
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signUpView}>
          <TouchableOpacity
            onPress={() => {
              this.setState({step: 2});
            }}
            style={
              this.state.step == 2
                ? styles.selectedCircle
                : styles.notSelectedCircle
            }
            activeOpacity={0.8}>
            <Text
              style={
                this.state.step == 2
                  ? styles.selectedTxt
                  : styles.notSelectedTxt
              }>
              Desired Partner
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  updateArry(ind, array) {
    if (array == 'qualities') {
      var states = this.state.qualities;
      var updatedArry = [];
      for (var i = 0; i < states.length; i++) {
        if (i == ind) {
          console.log('LO BHAI', !states[i].selected);
          updatedArry.push({
            ...states[i],
            selected: !states[i].selected,
          });
        } else {
          updatedArry.push({...states[i]});
        }
      }
      setTimeout(() => {
        this.setState({
          qualities: updatedArry,
        });
      }, 100);
    } else {
      var states = this.state.hobbies;
      var updatedArry = [];
      for (var i = 0; i < states.length; i++) {
        if (i == ind) {
          updatedArry.push({
            ...states[i],
            selected: !states[i].selected,
          });
        } else {
          updatedArry.push({...states[i]});
        }
      }
      setTimeout(() => {
        this.setState({
          hobbies: updatedArry,
        });
      }, 100);
    }
    console.log('updatedArry', updatedArry);
  }
  bio() {
    if (this.state.step == 0) {
      return (
        <ScrollView style={styles.getStarted}>
          <View>
            <TextInput
              editable={this.state.isEdit}
              placeholder="Enter Bio"
              placeholderTextColor="#ccc"
              value={this.state.text}
              keyboardType="email-address"
              style={styles.inputFld}
              onChangeText={text => this.setState({text})}
              numberOfLines={8}
              multiline={true}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.txtHeading}>Qualities</Text>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>
            {this.state.qualities.map((val, i) => (
              <TouchableOpacity
                disabled={!this.state.isEdit}
                onPress={() => {
                  this.updateArry(i, 'qualities');
                }}
                style={{width: '33%'}}>
                <Text style={!val.selected ? styles.tags : styles.tagsSelected}>
                  {val.quality}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.txtHeading}>Hobbies:</Text>
          </View>

          <View style={{flexDirection: 'row', width: '100%', flexWrap: 'wrap'}}>
            {this.state.hobbies.map((val, i) => (
              <TouchableOpacity
                disabled={!this.state.isEdit}
                onPress={() => {
                  this.updateArry(i, 'hobbies');
                }}
                style={{width: '33%'}}>
                <Text style={!val.selected ? styles.tags : styles.tagsSelected}>
                  {val.hobby}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{height: 120, justifyContent: 'center'}}>
            <TouchableOpacity
              style={styles.signUpBtn}
              onPress={() => {
                if (this.state.isEdit) {
                  this.updateBio();
                  this.setState({isEdit: !this.state.isEdit});
                } else {
                  this.setState({isEdit: !this.state.isEdit});
                }
              }}>
              <Text style={styles.signUpBtnTxt}>
                {this.state.isEdit ? 'Save Changes' : 'Edit Bio'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
  }

  personalDetail() {
    if (this.state.step == 1) {
      return (
        <View style={styles.detailCont}>
          <ScrollView>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{height: 50, width: 280}}
                enabled={this.state.isEdit1}
                selectedValue={this.state.education}
                onValueChange={val => {
                  this.setState({education: val});
                }}>
                <Picker.Item label="Education" value="Education" />
                <Picker.Item label="BS" value="BS" />
              </Picker>
              <Text style={styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{height: 50, width: 280}}
                enabled={this.state.isEdit1}
                selectedValue={this.state.income}
                onValueChange={val => {
                  this.setState({income: val});
                }}>
                <Picker.Item label="Annual Income" value="Annual Income" />
                <Picker.Item label="12000" value="12000" />
              </Picker>
              <Text style={styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{height: 50, width: 280}}
                enabled={this.state.isEdit1}
                selectedValue={this.state.skin}
                onValueChange={val => {
                  this.setState({skin: val});
                }}>
                <Picker.Item label="Skin Tone" value="Skin Tone" />
                <Picker.Item label="white" value="white" />
                <Picker.Item label="black" value="black" />
              </Picker>
              <Text style={styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{height: 50, width: 280}}
                enabled={this.state.isEdit1}
                selectedValue={this.state.body}
                onValueChange={val => {
                  this.setState({body: val});
                }}>
                <Picker.Item label="Body Type" value="Body Type" />
                <Picker.Item label="Fat" value="Fat" />
                <Picker.Item label="Thick" value="Thick" />
              </Picker>
              <Text style={styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{height: 50, width: 280}}
                enabled={this.state.isEdit1}
                selectedValue={this.state.disablity}
                onValueChange={val => {
                  this.setState({disablity: val});
                }}>
                <Picker.Item label="Disablity" value="Disablity" />
                <Picker.Item label="London" value="Jaffry" />
              </Picker>
              <Text style={styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{height: 50, width: 280}}
                enabled={this.state.isEdit1}
                selectedValue={this.state.pet}
                onValueChange={val => {
                  this.setState({pet: val});
                }}>
                <Picker.Item label="Pets" value="Pets" />
                <Picker.Item label="cat" value="cat" />
                <Picker.Item label="dog" value="dog" />
              </Picker>
              <Text style={styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{height: 50, width: 280}}
                enabled={this.state.isEdit1}
                selectedValue={this.state.employee}
                onValueChange={val => {
                  this.setState({employee: val});
                }}>
                <Picker.Item label="Employee Status" value="Employee Status" />
                <Picker.Item label="Onlive" value="Onlive" />
                <Picker.Item label="Offline" value="Offline" />
              </Picker>
              <Text style={styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{height: 50, width: 280}}
                enabled={this.state.isEdit1}
                selectedValue={this.state.marital}
                onValueChange={val => {
                  this.setState({marital: val});
                }}>
                <Picker.Item label="Marital Status" value="Marital Status" />
                <Picker.Item label="Laal" value="Laal" />
                <Picker.Item label="Qalandar" value="Qalandar" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{height: 50, width: 280}}
                enabled={this.state.isEdit1}
                selectedValue={this.state.kid}
                onValueChange={val => {
                  this.setState({kid: val});
                }}>
                <Picker.Item label="Kids" value="Kids" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{height: 50, width: 280}}
                enabled={this.state.isEdit1}
                selectedValue={this.state.height}
                onValueChange={val => {
                  this.setState({height: val});
                }}>
                <Picker.Item label="Height" value="Height" />
                <Picker.Item label="5" value="0" />
                <Picker.Item label="5" value="5" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{height: 50, width: 280}}
                enabled={this.state.isEdit1}
                selectedValue={this.state.eye}
                onValueChange={val => {
                  this.setState({eye: val});
                }}>
                <Picker.Item label="Eye Colour" value="Eye Colour" />
                <Picker.Item label="Brown" value="Brown" />
                <Picker.Item label="Black" value="Black" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{height: 50, width: 280}}
                enabled={this.state.isEdit1}
                selectedValue={this.state.religious}
                onValueChange={val => {
                  this.setState({religious: val});
                }}>
                <Picker.Item label="Religious" value="Religious" />
                <Picker.Item label="Islam" value="Islam" />
                <Picker.Item label="Hindi" value="Hindi" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{height: 50, width: 280}}
                enabled={this.state.isEdit1}
                selectedValue={this.state.drink}
                onValueChange={val => {
                  this.setState({drink: val});
                }}>
                <Picker.Item label="Drink" value="Drink" />
                <Picker.Item label="Cold" value="Cold" />
                <Picker.Item label="Hot" value="Hot" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                style={{height: 50, width: 280}}
                enabled={this.state.isEdit1}
                selectedValue={this.state.occpation}
                onValueChange={val => {
                  this.setState({occpation: val});
                }}>
                <Picker.Item label="Occupation" value="Occupation" />
                <Picker.Item label="YAR" value="YAR" />
                <Picker.Item label="Lalukhait" value="Lalukhait" />
              </Picker>
            </View>
            <TouchableOpacity
              style={styles.signUpBtn}
              onPress={() => {
                if (this.state.isEdit1) {
                  this.updatePersonalDetail();
                  this.setState({step: 1, isEdit1: !this.state.isEdit1});
                }
                this.setState({isEdit1: !this.state.isEdit1});
              }}>
              <Text style={styles.signUpBtnTxt}>
                {' '}
                {this.state.isEdit1 ? 'Save Changes' : 'Edit Personal Detail'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    }
  }

  desiredPartner() {
    if (this.state.step == 2) {
      return (
        <View style={styles.detailCont}>
          <ScrollView>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.seeking}
                onValueChange={val => {
                  this.setState({seeking: val});
                }}>
                <Picker.Item label="I am Seeking" value="I am Seeking" />

                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Male" value="Male" />
              </Picker>
              <Text style={styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.minHeight || ''}
                onValueChange={val => {
                  this.setState({minHeight: val});
                }}>
                <Picker.Item label="Maximum Height" value="Maximum Height" />

                <Picker.Item label="46" value="46" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="13" value="13" />
                <Picker.Item label="16" value="16" />
              </Picker>
              <Text style={styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.maxHeight || ''}
                onValueChange={val => {
                  this.setState({maxHeight: val});
                }}>
                <Picker.Item label="Minimum Height" value="Minimum Height" />

                <Picker.Item label="46" value="46" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="14" value="14" />
                <Picker.Item label="12" value="12" />
              </Picker>
              <Text style={styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.tounge}
                onValueChange={val => {
                  this.setState({tounge: val});
                }}>
                <Picker.Item label="Mother Tongue" value="Mother Tongue" />

                <Picker.Item label="Dont Care" value="Dont Care" />
              </Picker>
              <Text style={styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.nationality}
                onValueChange={val => {
                  this.setState({nationality: val});
                }}>
                <Picker.Item label="Nationality" value="Nationality" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
              <Text style={styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.religiousDP}
                onValueChange={val => {
                  this.setState({religiousDP: val});
                }}>
                <Picker.Item label="Religious" value="Religious" />
                <Picker.Item label="Islam" value="Islam" />
              </Picker>
              <Text style={styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.profession}
                onValueChange={val => {
                  this.setState({profession: val});
                }}>
                <Picker.Item label="Profession" value="Profession" />
                <Picker.Item label="Retired" value="Retired" />
              </Picker>
              <Text style={styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.bodyDP}
                onValueChange={val => {
                  this.setState({bodyDP: val});
                }}>
                <Picker.Item label="Body Type" value="Body Type" />
                <Picker.Item label="Slim" value="Slim" />
              </Picker>
              <Text style={styles.text}>{this.state.user}</Text>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.eyeDP}
                onValueChange={val => {
                  this.setState({eyeDP: val});
                }}>
                <Picker.Item label="Eye Colour" value="Eye Colour" />
                <Picker.Item label="black" value="black" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.drink}
                onValueChange={val => {
                  this.setState({drink: val});
                }}>
                <Picker.Item label="Drink" value="Drink" />
                <Picker.Item label="Do Drink" value="Do Drink" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.maxAge}
                onValueChange={val => {
                  this.setState({maxAge: val});
                }}>
                <Picker.Item label="Maximum Age" value="Maximum Age" />
                <Picker.Item label="46" value="46" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="13" value="13" />
                <Picker.Item label="16" value="16" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.minAge}
                onValueChange={val => {
                  this.setState({minAge: val});
                }}>
                <Picker.Item label="Minimum Age" value="Minimum Age" />
                <Picker.Item label="46" value="46" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="13" value="13" />
                <Picker.Item label="16" value="16" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.maritalDp}
                onValueChange={val => {
                  this.setState({maritalDp: val});
                }}>
                <Picker.Item label="Marital status" value="Marital status" />
                <Picker.Item label="Single" value="Single" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.children}
                onValueChange={val => {
                  this.setState({children: val});
                }}>
                <Picker.Item label="Children" value="Children" />
                <Picker.Item label="2" value="2" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.country}
                onValueChange={val => {
                  this.setState({country: val});
                }}>
                <Picker.Item label="Country live in" value="Country live in" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.educationDP}
                onValueChange={val => {
                  this.setState({educationDP: val});
                }}>
                <Picker.Item label="Min Education" value="Min Education" />
                <Picker.Item label="Phd or Docorate" value="Phd or Docorate" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.incomeDP}
                onValueChange={val => {
                  this.setState({incomeDP: val});
                }}>
                <Picker.Item label="Annual Income" value="Annual Income" />
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.tone}
                onValueChange={val => {
                  this.setState({tone: val});
                }}>
                <Picker.Item label="Skin Tone" value="Skin Tone" />
                <Picker.Item label="Fair" value="Fair" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.dpSmoke}
                onValueChange={val => {
                  this.setState({dpSmoke: val});
                }}>
                <Picker.Item label="Smoke" value="Smoke" />
                <Picker.Item label="Dont Smoke" value="Dont Smoke" />
              </Picker>
            </View>
            <View style={[styles.inputFldView, styles.mb2]}>
              <Picker
                enabled={this.state.isEdit2}
                style={{height: 50, width: 280}}
                selectedValue={this.state.Cooking}
                onValueChange={val => {
                  this.setState({Cooking: val});
                }}>
                <Picker.Item label="Cooking" value="Cooking" />
                <Picker.Item label="Yes" value="Yes" />
                <Picker.Item label="No" value="No" />
              </Picker>
            </View>
            <TouchableOpacity
              style={styles.signUpBtn}
              onPress={() => {
                if (this.state.isEdit2) {
                  this.updateDesiredPartner();
                  this.setState({step: 1, isEdit2: !this.state.isEdit2});
                }
                this.setState({isEdit2: !this.state.isEdit2});
              }}>
              {this.state.showSpinner ? (
                <ActivityIndicator color="white" size="large" />
              ) : (
                <Text style={styles.signUpBtnTxt}>
                  {this.state.isEdit2 ? 'Save Changes' : 'Edit Partner Detail'}
                </Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    }
  }

  componentWillMount() {
    this._getData();
    // this.getUserDetail();
    this._getHobbiesData();
    this.setState({
      loader: true,
    });
    setTimeout(() => {
      this._GetUserDetail();
      this.setState({
        loader: false,
      });
    }, 2000);
  }

  _GetUserDetail = async () => {
    const user = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(user);
    const loggedInUserID = userData.user.id;
    const access_token = userData.access_token;
    axios
      .get(`http://dev2.thebetatest.com/api/singleuser/${loggedInUserID}`, {
        headers: {Authorization: access_token},
      })
      .then(async res => {
        this.setState({showSpinner: false});
        console.log('res', res.data);
        if (res.data.status) {
          // this.setState({step: 1});
          let newQuality = res.data?.user;
          const checkOut = async (name, secName) => {
            let setup = [];
            if (newQuality[name] && newQuality[name] !== null) {
              let checkThisBoy = newQuality[name].split(' ');
              await this.state[name].map(async (val, i) => {
                checkThisBoy.map(async value => {
                  if (val[secName].split(' ')[0] == value) {
                    if (setup.length > 0) {
                      let found = false;
                      setup.map(item => {
                        if (item.id == val.id) {
                          found = true;
                        }
                      });
                      if (found) {
                        setup[i] = {
                          ...val,
                          selected: true,
                        };
                      } else {
                        setup.push({
                          ...val,
                          selected: true,
                        });
                      }
                    } else {
                      setup.push({
                        ...val,
                        selected: true,
                      });
                    }
                  } else {
                    let is = false;
                    if (setup.length > 0) {
                      setup.map(item => {
                        if (item.id == val.id) {
                          is = true;
                        }
                      });
                      if (!is) {
                        setup.push(val);
                      }
                    }
                  }
                });
              });
            }
            if (setup.length > 0) {
              this.setState({
                [name]: setup,
              });
            }
          };
          console.log('BHAI JAN KIA HAL HY TUMHARA', newQuality);
          this.setState(
            {
              userDetail: newQuality,
              text: newQuality.about || '',
              education: newQuality.education || '',
              income: newQuality.income || '',
              skin: newQuality.skin_tone || '',
              body: newQuality.body_type || '',
              smoke: newQuality.smoke || '',
              dpSmoke: newQuality.partner_smoke || '',
              tone: newQuality.partner_skin_tone || '',
              employee: newQuality.employment_status || '',
              pet: newQuality.pets || '',
              disablity: newQuality.disablility || '',
              body: newQuality.body_type || '',
              bodyDP: newQuality.partner_body_type || '',
              occpation: newQuality.occupation || '',
              drink: newQuality.drink || '',
              dpDrink: newQuality.partner_drink || '',
              tounge: newQuality.partner_mother_tounge || '',
              religious: newQuality.religious || '',
              religiousDP: newQuality.partner_religious || '',
              eye: newQuality.eye_color || '',
              eyeDP: newQuality.partner_eye_color || '',
              height: newQuality.height || '',
              maxHeight: newQuality.partner_max_height || '',
              minHeight: newQuality.partner_min_height || '',
              kid: newQuality.kids || '',
              marital: newQuality.marital_status || '',
              maritalDp: newQuality.partner_marital_status || '',
              Cooking: newQuality.partner_cooking || '',
              incomeDP: newQuality.partner_annual_income || '',
              educationDP: newQuality.partner_minimum_education || '',
              country: newQuality.country || '',
              countryDp: newQuality.partner_country_livein || '',
              children: newQuality.partner_children || '',
              age: newQuality.Age || '',
              maxAge: newQuality.partner_max_age || '',
              minAge: newQuality.partner_min_age || '',
              profession: newQuality.partner_profession || '',
              nationality: newQuality.partner_nationality || '',
              // tounge: newQuality.parnter_enter_tounge || '',
              seeking: newQuality.partner_looking_for || '',
              gender: newQuality.Gender || '',
              city: newQuality.city || '',
              email: newQuality.email || '',
              flag: newQuality.flag || '',
              firstname: newQuality.FirstName || '',
              profile_pic: newQuality.profile_pic || '',
              pic2: newQuality.pic2 || '',
            },
            () => {
              checkOut('qualities', 'quality');
              checkOut('hobbies', 'hobby');
            },
          );
        } else
          this.setState({
            showAlert: true,
            errorMsg: res.data.message,
            errorTitle: 'Error!!',
          });
      })
      .catch(error => {
        this.setState({showSpinner: false});
        console.log('error', error);
        this.setState({
          showAlert: true,
          errorMsg: 'Something went wrong. ' + error,
          errorTitle: 'Error!!',
        });
      });
  };
  _getHobbiesData = async () => {
    const user = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(user);
    const loggedInUserID = userData.user.id;
    const access_token = userData.access_token;
    axios
      .get('http://dev2.thebetatest.com/api/hobbies', {
        headers: {Authorization: access_token},
      })
      .then(async res => {
        this.setState({showSpinner: false});
        console.log('res', res.data);
        if (res.data.status) {
          // this.setState({step: 1});
          let newQuality =
            (await res.data?.hobbies?.length) > 0 &&
            res.data.hobbies.map((val, i) => {
              return {...val, selected: false};
            });
          console.log('BHAI JAN KIA HAL HY TUMHARA', newQuality);
          this.setState({
            hobbies: newQuality,
          });
        } else
          this.setState({
            showAlert: true,
            errorMsg: res.data.message,
            errorTitle: 'Error!!',
          });
      })
      .catch(error => {
        this.setState({showSpinner: false});
        console.log('error', error);
        this.setState({
          showAlert: true,
          errorMsg: 'Something went wrong. ' + error,
          errorTitle: 'Error!!',
        });
      });
  };
  _getData = async () => {
    const user = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(user);
    const loggedInUserID = userData.user.id;
    const access_token = userData.access_token;
    axios
      .get('http://dev2.thebetatest.com/api/qualities', {
        headers: {Authorization: access_token},
      })
      .then(async res => {
        this.setState({showSpinner: false});
        console.log('res', res.data);
        if (res.data.status) {
          // this.setState({step: 1});
          let newQuality =
            (await res.data?.qualities?.length) > 0 &&
            res.data.qualities.map((val, i) => {
              return {...val, selected: false};
            });
          this.setState({
            qualities: newQuality,
          });
        } else
          this.setState({
            showAlert: true,
            errorMsg: res.data.message,
            errorTitle: 'Error!!',
          });
      })
      .catch(error => {
        this.setState({showSpinner: false});
        console.log('error', error);
        this.setState({
          showAlert: true,
          errorMsg: 'Something went wrong. ' + error,
          errorTitle: 'Error!!',
        });
      });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgrounColor: '#f6f6f6'}}>
        <Header name={'Edit Profile'} navigation={this.props.navigation} />
        {this.header()}
        {this.bio()}
        {this.personalDetail()}
        {this.desiredPartner()}
      </SafeAreaView>
    );
  }
}
const styles = {
  mb2: {
    marginBottom: 10,
  },
  signUpBtn: {
    backgroundColor: '#ff1822',
    padding: 10,
    borderRadius: 30,
    marginTop: 10,
  },

  signUpBtnTxt: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
  },
  inputFldView: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputFld: {
    marginLeft: 10,
    color: '#000',
    // width:deviceWidth-120,
  },
  tags: {
    backgroundColor: '#f5f6fa',
    color: '#c4b6b3',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 3,
    textAlign: 'center',
  },
  tagsSelected: {
    backgroundColor: 'red',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 3,
    textAlign: 'center',
  },
  inputFld: {borderWidth: 1, borderColor: '#ccc', borderRadius: 10},
  detailCont: {flex: 6, backgrounColor: '#fff', padding: 20},
  flx1: {flex: 1, borderRightWidth: 1, borderRightColor: '#ccc'},
  mb10: {marginBottom: 0},
  flxRw: {flexDirection: 'row'},
  txtHeading: {
    marginLeft: 10,
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#1e1e1e',
  },
  txtLbl: {
    marginLeft: 40,
    fontSize: 9,
    fontFamily: 'Poppins-Regular',
    color: '#474747',
  },
  headerView: {
    paddingHorizontal: 10,
    // flex:0.,
    flexDirection: 'row',
    zIndex: 2,
  },
  selectedCircle: {
    padding: 10,
    paddingBottom: 0,
    borderBottomColor: '#ff1822',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTxt: {
    color: '#ff1822',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  notSelectedCircle: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notSelectedTxt: {
    color: '#252525',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  getStartedView: {
    // flex: 1,
  },
  signUpView: {
    // flex: 1,
    alignItems: 'center',
  },
  getStarted: {
    flex: 6,
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    margin: 10,
  },
};
