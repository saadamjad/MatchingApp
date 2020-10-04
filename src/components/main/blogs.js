import React, {Component} from 'react';
import { View, Text, SafeAreaView , ImageBackground ,Image , ScrollView } from 'react-native';

import { colors, images } from '../../constants/theme'

import Swiper from 'react-native-swiper'

import {Header} from '../common';
// import { ScrollView } from 'react-native-gesture-handler';

export default class BlogCmp extends Component {

  constructor(props) {
    super(props);
  }

  fixedCont(){
    return (
      <View style={styles.fixedCont}>
        <Image source={images.mainProfileIcon} style={styles.roundedImg} />
        <View style={{ marginLeft:10 }}>
          <Text style={styles.boldTxt}>Expedition to china</Text>
          <View style={{ flexDirection:'row' }}>
            <Image source={images.watch2Icon} style={{  width:17, height:16 }} />
            <Text style={styles.lblTxt}>20 mins ago</Text>
          </View>
        </View>
      </View>
    )
  }
  render() {
    return(
      <SafeAreaView style={{flex:1}}>
        <Header name={'Blogs'} navigation={this.props.navigation} search={true} />
        <ScrollView>
          <View style={styles.HomeView}> 
            <View style={styles.vipUserView}>
              <Swiper 
                prevButton={<Text style={{ color:'#000', fontSize:40,fontWeight:'bold' }}>‹</Text>}
                nextButton={<Text style={{ color:'#000', fontSize:40,fontWeight:'bold' }}>›</Text>}
                style={styles.wrapper} showsButtons={true} showsPagination={false} height={180}>
                <View style={styles.vipUserInner}>
                  <View style={styles.vipImageView}>
                    <Image source={images.blogIcon} style={ styles.vipImageDimension } />
                    { this.fixedCont() }
                  </View>
                </View>
                <View style={styles.vipUserInner}>
                  <View style={styles.vipImageView}>
                    <Image source={images.blogIcon} style={ styles.vipImageDimension } />
                    { this.fixedCont() }
                  </View>
                </View>
                <View style={styles.vipUserInner}>
                  <View style={styles.vipImageView}>
                    <Image source={images.blogIcon} style={ styles.vipImageDimension } />
                    { this.fixedCont() }
                  </View>
                </View>
              </Swiper>
            </View>
            <View style={styles.reglarUserView}>
              <View style={{ flexDirection:'row' }}>
                <Text style={styles.vipTxt}>Recent</Text>
                <View style={{ flex:1, justifyContent:'center', alignItems:'flex-end' }}>
                  <Text style={{ color:'#ff1822', fontSize:12, fontFamily:'Poppins-Medium', textDecorationLine:'underline' }}>Show all</Text>
                </View>
              </View>
              <View>
                <View style={[styles.vipUserInner1 , styles.mb]}>
                  <View style={styles.vipImageView}>
                    <Image source={images.regularUserIcon} style={ styles.regularImageDimension } />
                  </View>
                  <View style={ styles.vipContentView}>
                    <View style={styles.nameView}>
                      <Text style={styles.vipName}>PHILOSOPHY</Text>
                    </View>
                    <View>
                      <Text style={styles.vipAge}>Secret of Perfect Life</Text>
                    </View>
                    <View style={{ flexDirection:'row' }}>
                      <Image style={styles.socialIcon} source={images.clockIcon} />
                      <Text style={ styles.vipLighTxt}>10th November</Text>
                    </View>                    
                  </View>
                </View>
                <View style={[styles.vipUserInner1 , styles.mb]}>
                  <View style={styles.vipImageView}>
                    <Image source={images.regularUserIcon} style={ styles.regularImageDimension } />
                  </View>
                  <View style={ styles.vipContentView}>
                    <View style={styles.nameView}>
                      <Text style={styles.vipName}>PHILOSOPHY</Text>
                    </View>
                    <View>
                      <Text style={styles.vipAge}>Secret of Perfect Life</Text>
                    </View>
                    <View style={{ flexDirection:'row' }}>
                      <Image style={styles.socialIcon} source={images.clockIcon} />
                      <Text style={ styles.vipLighTxt}>10th November</Text>
                    </View>                    
                  </View>
                </View>
                <View style={[styles.vipUserInner1 , styles.mb]}>
                  <View style={styles.vipImageView}>
                    <Image source={images.regularUserIcon} style={ styles.regularImageDimension } />
                  </View>
                  <View style={ styles.vipContentView}>
                    <View style={styles.nameView}>
                      <Text style={styles.vipName}>PHILOSOPHY</Text>
                    </View>
                    <View>
                      <Text style={styles.vipAge}>Secret of Perfect Life</Text>
                    </View>
                    <View style={{ flexDirection:'row' }}>
                      <Image style={styles.socialIcon} source={images.clockIcon} />
                      <Text style={ styles.vipLighTxt}>10th November</Text>
                    </View>                    
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
const styles={
  HomeView:{
    flex:1, padding: 10,
  },
  statsView:{
    flex:2,
  },
  vipUserView:{
    flex:2.8, marginBottom:15,
  },  
  reglarUserView:{
    flex:3
  },
  statsTxt:{
    fontSize:18,
    fontFamily:'Poppins-Bold',
    color:'#1e1e1e',
    textAlign:'center',
  },
  statsCardsView:{
    flex:1,
    flexDirection:'row'
  },
  statsCardView:{
    flex:1, backgroundColor:'#ddd' , marginRight:10
  },
  statsImg: {flex: 1, resizeMode: "cover", justifyContent: "center"}, 
  vipUserInner: { flex:1, flexDirection:'row',  padding:10, borderRadius:10, paddingLeft:30 },
  vipUserInner1: { flex:1, flexDirection:'row',  padding:10, borderRadius:10, paddingLeft:25 },
  vipImageView:{ flex:1},
  vipImageDimension:{ width:'95%' , height:220 },
  regularImageDimension:{ width:110 , height:100 },
  vipContentView:{ flex: 2, paddingLeft:25 , justifyContent: 'center', },
  nameView:{ flexDirection:'row' },
  vipTxt:{
    fontSize:22,
    fontFamily:'Poppins-SemiBold',
    color:'#1e1e1e',
    marginHorizontal:20
  },
  statsCardTxt:{
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
  statsHeading:{
    color:'#fff', textAlign:'center', fontSize:10, fontFamily:'Poppins-Regular'
  },
  statsLabel:{
    color:'#fff', textAlign:'center', fontSize:14, fontFamily:'Poppins-Medium', marginBottom:5
  },
  vipName:{ fontFamily:'Poppins-Light', fontSize:16, color:'#ff1822', marginBottom:5 },
  vipAge:{ fontFamily:'Poppins-Medium', fontSize:17,color:'#252525', marginBottom:5 },
  vipLighTxt: { fontFamily:'Poppins-Light', fontSize:10, color:'#303030' },
  vipEduView:{flexDirection:'row'},
  socialView :{ flexDirection:'row', justifyContent:'flex-end' },
  vipDrakTxt:{ fontFamily:'Poppins-SemiBold', fontSize:12 },
  mb:{ marginBottom:10},
  socialIcon:{ width:18, height:17, marginRight:5 },
  fixedCont:{ position:'absolute', bottom:0, flexDirection:'row', paddingHorizontal:10, paddingBottom:5 },
  roundedImg:{  width:42, height:42, borderRadius:42 },
  boldTxt:{ marginBottom:5, fontFamily:'Poppins-Regular', fontSize:13, color:'#fff' },
  lblTxt:{ marginLeft:5, fontFamily:'Poppins-Light', fontSize:10, color:'#fff' },
}