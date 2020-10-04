import React, {Component} from 'react';
import { View, Text, SafeAreaView ,Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGoogle, faInstagram, faWhatsapp,faTwitter, faFacebook , faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import {Header} from '../common';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class inviteFriends extends Component {

	render() {
		return(
		<SafeAreaView style={{flex:1}}>
        	<Header name={'Invite Friends'} navigation={this.props.navigation} search={true} />
			<View style={styles.cont}>
				<View style={styles.inviteFriends }>
					<View style={{ flex:1, justifyContent:'flex-start' , alignItems:'center'}}>
						<Image
							source={require('../../assets/icons/menu/1.png')}
							style={{ width:50, height:50 }}
						/>
					</View>
					<View style={{ flex:1, justifyContent:'flex-end' , alignItems:'center'}}>
						<Image
							source={require('../../assets/icons/menu/2.png')}
							style={{ width:50, height:50 }}
						/>
					</View>
					<View style={{ flex:1, justifyContent:'flex-start' , alignItems:'center'}}>
						<Image
							source={require('../../assets/icons/menu/3.png')}
							style={{ width:50, height:50 }}
						/>
					</View>
					<View style={{ flex:1, justifyContent:'flex-end' , alignItems:'center'}}>
						<Image
							source={require('../../assets/icons/menu/4.png')}
							style={{ width:50, height:50 }}
						/>
					</View>
					<View style={{ flex:1, justifyContent:'flex-start' , alignItems:'center'}}>
						<Image
							source={require('../../assets/icons/menu/5.png')}
							style={{ width:50, height:50 }}
						/>
					</View>
					<View style={{ flex:1, justifyContent:'flex-end' , alignItems:'center'}}>
						<Image
							source={require('../../assets/icons/menu/6.png')}
							style={{ width:50, height:50 }}
						/>
					</View>
					<View style={{ flex:1, justifyContent:'flex-start' , alignItems:'center'}}>
						<Image
							source={require('../../assets/icons/menu/7.png')}
							style={{ width:50, height:50 }}
						/>
					</View>
					{/* <Image style={styles.imgSize} resizeMode='stretch' resizeMethod="resize" source={images.inviteFriendsIcon} />					 */}
				</View>
				<View style={styles.inviteTxtView}>	
					<Text style={styles.inviteFriendsHeading}>Invite your friends {'\n'}and get 30 days free trial</Text>				
					<Text style={styles.inviteFriendsLbl}>Be a part of world’s most private & {'\n'}secured muslim matchmaking platform</Text>				
				</View>
				<View style={styles.socailMediaView}>	
					<View style={{ flex:1 , marginRight:30 }}>
						<TouchableOpacity onPress={()=> {  Linking.openURL('https://www.facebook.com/matchelitemuslims') }}>							
							<View style={{ backgroundColor:'#ed4b34' , width:75, height:75 , borderRadius:10, marginBottom:20, justifyContent:'center' , alignItems:'center' }}>
								<FontAwesomeIcon icon={faGoogle} color="#fff" size={48} />  
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={()=> {  Linking.openURL('https://www.instagram.com/matchelitemuslim/') }}>
							<View style={{ backgroundColor:'#db2477' , width:75, height:75 , borderRadius:10, marginBottom:20, justifyContent:'center' , alignItems:'center' }}>
								<FontAwesomeIcon icon={faInstagram} color="#fff" size={48} />  
							</View>
						</TouchableOpacity>
					</View>
					<View style={{ flex:1 , marginRight:30}}>
						<TouchableOpacity onPress={()=> {  Linking.openURL('https://www.facebook.com/matchelitemuslims') }}>						
							<View style={{ backgroundColor:'#0084ff' , width:75, height:75 , borderRadius:10, marginBottom:20, justifyContent:'center' , alignItems:'center' }}>
								<FontAwesomeIcon icon={faFacebookMessenger} color="#fff" size={48} />  
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={()=> {  Linking.openURL('https://www.facebook.com/matchelitemuslims') }}>
							<View style={{ backgroundColor:'#1bd742' , width:75, height:75 , borderRadius:10, marginBottom:20, justifyContent:'center' , alignItems:'center' }}>
								<FontAwesomeIcon icon={faWhatsapp} color="#fff" size={48} />  
							</View>
						</TouchableOpacity>
					</View>
					<View style={{ flex:1 }}>
						<TouchableOpacity onPress={()=> {  Linking.openURL('https://www.facebook.com/matchelitemuslims') }}>
							<View style={{ backgroundColor:'#00acee' , width:75, height:75 , borderRadius:10, marginBottom:20, justifyContent:'center' , alignItems:'center' }}>
								<FontAwesomeIcon icon={faTwitter} color="#fff" size={48} />  
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={()=> {  Linking.openURL('https://www.facebook.com/matchelitemuslims') }}>
							<View style={{ backgroundColor:'#3a599c' , width:75, height:75 , borderRadius:10, marginBottom:20, justifyContent:'center' , alignItems:'center' }}>
								<FontAwesomeIcon icon={faFacebook} color="#fff" size={48} />  
							</View>
						</TouchableOpacity>
					</View>
				</View>

			</View>
      	</SafeAreaView>
		)
	}
}
const styles ={
	cont:{ flex:1, padding:10, backgroundColor:'#fff' },
	inviteFriends:{ flex:0.7, flexDirection:'row', marginTop:20 },
	imgSize:{ width:'100%' },
	inviteTxtView:{ flex:1.3 , justifyContent:'center', alignItems:'center' },
	inviteFriendsLbl:{ fontSize:18, fontFamily:'Poppins-Reglar' , textAlign:'center', color:'#282828' },
	inviteFriendsHeading:{ fontSize:20, fontFamily:'Poppins-SemiBold' , textAlign:'center', color:'#1e1e1e' , marginBottom:15},
	socailMediaView:{ flex:1 , alignContent:'center', marginBottom:50, flexDirection:'row', marginHorizontal:30 }
}