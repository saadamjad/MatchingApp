import React, {Component} from 'react';
import { View, Text, SafeAreaView ,Image } from 'react-native';

import { colors, images } from '../../constants/theme'

import {Header} from '../common';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

export default class subscriptionplans extends Component {

	render() {
		return(
		<SafeAreaView style={{flex:1}}>
        	<Header name={'Subscription Plans'}  navigation={this.props.navigation} search={true} />
			<ScrollView style={styles.cont}>
			<View style={styles.inviteFriends}>
					<View style={styles.txtView}>
						<Text style={styles.price}>$29</Text>
						<Text style={styles.sub}>3 Months Introductory Offer </Text>
						<TouchableOpacity onPress={()=> this.props.navigation.navigate('Signup')} style={styles.btn}>
							<Text style={styles.btnTxt}>SELECT</Text>
						</TouchableOpacity>
						<Text style={styles.readdMore}>Read More</Text>
					</View>					
				</View>
			<View style={styles.inviteFriends}>
					<View style={styles.txtView1}>
						<Text style={styles.price}>$79</Text>
						<Text style={styles.sub}>6 Months VIP Professional User</Text>
						<TouchableOpacity onPress={()=> this.props.navigation.navigate('Signup')} style={styles.btn}>
							<Text style={styles.btnTxt}>SELECT</Text>
						</TouchableOpacity>
						<Text style={styles.readdMore}>Read More</Text>
					</View>
					<Text style={styles.widget}>Most Popular</Text>					
				</View>
				<View style={[styles.inviteFriends ,  styles.mb1]}>
					<View style={styles.txtView2}>
						<Text style={styles.price}>$149</Text>
						<Text style={styles.sub}>12 Months VIP Professional User</Text>
						<TouchableOpacity onPress={()=> this.props.navigation.navigate('Signup')} style={styles.btn}>
							<Text style={styles.btnTxt}>SELECT</Text>
						</TouchableOpacity>
						<Text style={styles.readdMore}>Read More</Text>
					</View>					
				</View>
			</ScrollView>
      	</SafeAreaView>
		)
	}
}
const styles ={
	cont:{ flex:1, paddingHorizontal:50, backgroundColor:'#fff' },
	inviteFriends:{ flex:1 , alignContent:'center', marginTop:20 },
	txtView:{ flex:1,backgroundColor:'#0087c5', borderRadius:10, justifyContent:'center' , alignItems:'center',padding: 10, },
	txtView1:{ flex:1,backgroundColor:'#ffcd46', borderRadius:10, justifyContent:'center' , alignItems:'center', padding: 10, },
	txtView2:{ flex:1,backgroundColor:'#6fc713', borderRadius:10, justifyContent:'center' , alignItems:'center', padding: 10, },
	price:{ color:'#fff', fontSize:20, fontFamily:'Poppins-SemiBold', marginBottom:5 },
	sub:{ color:'#fff', fontSize:16, fontFamily:'Poppins-Regular', marginBottom:5, textAlign:'center' },
	btn:{ borderWidth:1, borderColor:'#fff', paddingHorizontal:20, paddingVertical:5, borderRadius:15, marginBottom:5 },
	btnTxt:{ color:'#fff', fontSize:12, fontFamily:'Poppins-SemiBold' },
	readdMore:{ color:'#fff', fontSize:12, fontFamily:'Poppins-Medium' ,textDecorationLine:'underline' },	
	mb1:{  marginBottom:20 },
	widget:{ backgroundColor:'#ff1723', color:'#fff', width:50, height:50, borderRadius:50, position:'absolute', top:-15, right:5, fontSize:9, fontFamily:'Poppins-Regular', textAlign:'center', paddingTop:10 }
}