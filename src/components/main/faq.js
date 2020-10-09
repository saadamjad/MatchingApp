import React, {Component} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native';

import {colors, images} from '../../constants/theme';
import {Header} from '../common';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
// import { Thumbnail, List, ListItem, Separator } from 'native-base';

export default class ChatCmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acc1: true,
      acc2: false,
      acc3: false,
      acc4: false,
      acc5: false,
      acc6: false,
      acc7: false,
    };
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Header name={'Faq'} navigation={this.props.navigation} search={true} />
        <ScrollView>
          <View style={styles.p25}>
            <Text style={styles.txtHeading}>REGISTRATION</Text>
            <Collapse
              isCollapsed={true}
              onToggle={acc1 => {
                this.setState({acc1});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc1 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    Why register using a mobile number?
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc1 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    We are the only matchmaking site who is following
                    registration via mobile number. We want each user to be real
                    and serious about finding the perfect partner.
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc1 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}

            <Collapse
              style={styles.mt1}
              onToggle={acc2 => {
                this.setState({acc2});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc2 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    Why we use special code to register?
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc2 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    One-Time Password (OTP) is a technological mechanism through
                    which a single-use password is generated and sent to the
                    registered mobile number for the user to access the website.
                    It is also known as two-factor authentication. This is to
                    authenticate each user credibility to register into
                    matchelitemuslim website.
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc2 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Collapse
              style={styles.mt1}
              onToggle={acc3 => {
                this.setState({acc3});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc3 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    Can I register and share my profile for free?
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc3 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    No, due to privacy reason. However, we like everyone to
                    recommend or share to their loved ones.
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc3 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Collapse
              style={styles.mt1}
              onToggle={acc4 => {
                this.setState({acc4});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc4 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>Why username is unique?</Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc4 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    We strongly recommend users not to use their name due to
                    privacy reasons.
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc4 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Collapse
              style={styles.mt1}
              onToggle={acc5 => {
                this.setState({acc5});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc5 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>Can I register for free?</Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc5 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    Yes you can register free for a month.
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc5 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Text style={styles.txtHeading}>LOGIN AND PASSWORD</Text>
            <Collapse
              style={styles.mt1}
              onToggle={acc6 => {
                this.setState({acc6});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc6 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    How can I change my existing password?
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc6 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    From the drop down menu, go to dashboard click Change
                    Password.
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc6 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    If I forgot my password. How do I retrieve?{' '}
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    Click on the “Reset Password” and enter the email address or
                    phone number to get reset password code.
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}

            {/* start */}
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>How do I logout? </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    From the drop down menu select logout option.
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    What should I do If I forget my username? How can I login?{' '}
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    Username is not needed to login to MatchEliteMuslim all you
                    need is your mobile number or email address..
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    Can I modify my username after I registered?{' '}
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    No. The reason is that username is auto generated by system.
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Text style={styles.txtHeading}>
              PARTNER MATCHING INTELLIGENCE CHATTING CAPABILITIES
            </Text>
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    Can I get match listing from the matchelitemuslim platform?{' '}
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    Yes. Once you complete all required forms matchelitemuslim
                    platform will provide automatically matching for you based
                    on your data..
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    How do I perform a search?{' '}
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    There is a link in navigation "Find Your Match"..
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    How can I chat with my matching profile?{' '}
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    In Search list of matches you can go for a chat and also you
                    can go on dashboard messages section.
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    Can I chat with matching partner for free?{' '}
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    No. Only paid user are allowed to chat. We matchelitemuslim
                    want to keep only serious individuals for this kind of
                    personal communication..
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    Can I block or unblock user?{' '}
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    Yes at any time you can block or unblock user while
                    chatting..
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>Reccomendations </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>.</Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Text style={styles.txtHeading}>
              PICTURES UPLOAD AND PUBLIC APPEARANCE
            </Text>
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    Any conditions uploading profile picture?{' '}
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    We matchelitemuslim recommend that users should upload
                    pictures taken by a professional person. Make sure your face
                    view is clear and within the frame..
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    My profile picture can be seen by everyone?{' '}
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    No. Due to your privacy reasons your profile picture will be
                    blurry and no one can recognize you. However, once you
                    approve request from your other user to chat only particular
                    individuals can see your profile picture.
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Text style={styles.txtHeading}>SUBSCRIPTION FEES</Text>
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    What are the membership fees?{' '}
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    Please refer to matchelitemuslim membership from menu..
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    Can I get refund my subscription fees?{' '}
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>No..</Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    Can I pay using credit cards{' '}
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>Yes..</Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Text style={styles.txtHeading}>ACCOUNT DELETION</Text>
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    How can I delete my account?{' '}
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    Yes you can email us for account deactivation..
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Text style={styles.txtHeading}>PRIVACY</Text>
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    How to make sure my phone number is not shared with anyone?{' '}
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    Our database is designed in such a way that this field can’t
                    be displayed in any form. We at matchelitemuslim take
                    privacy very seriously as you can see our logo “Privacy and
                    Honesty are our true value”..
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
            <Text style={styles.txtHeading}>CONTACT INFORMATION</Text>
            <Collapse
              style={styles.mt1}
              onToggle={acc7 => {
                this.setState({acc7});
              }}>
              <CollapseHeader>
                <View
                  style={
                    this.state.acc7 == true
                      ? styles.cardHeader
                      : [styles.cardHeader, styles.pb0]
                  }>
                  <Text style={styles.headerTxt}>
                    If I have any issue how can I contact matchelitemuslim?
                  </Text>
                  <View style={styles.maxMin}>
                    <Text style={styles.maxMinTxt}>
                      {this.state.acc7 == true ? '-' : '+'}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.cardBody}>
                  <Text style={styles.bodyTxt}>
                    Send any request via email info@matchelitemuslim.com.
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            {this.state.acc7 == false ? (
              <View style={styles.bottomRadius}>
                <Text style={styles.txtBottom}>.</Text>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = {
  p25: {
    padding: 25,
  },
  mt1: {
    marginTop: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    backgroundColor: '#ff1822',
    padding: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 1,
    borderColor: '#ff1822',
  },
  headerTxt: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  cardBody: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#afadad',
    borderTopWidth: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  bodyTxt: {
    color: '#797979',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  bottomRadius: {
    width: '100%',
    backgroundColor: '#ff1822',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  txtBottom: {color: '#ff1822', textAlign: 'center'},
  pb0: {paddingBottom: 0},
  maxMin: {flex: 1, justifyContent: 'flex-end'},
  maxMinTxt: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    textAlign: 'right',
    color: '#fff',
    position: 'relative',
    top: -5,
    marginBottom: -15,
  },
  txtHeading: {fontFamily: 'Poppins-Medium', fontSize: 16, marginTop: 15},
};
