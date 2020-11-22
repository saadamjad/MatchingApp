import React, {Component} from 'react';
import { View, Text, SafeAreaView , ScrollView, Image } from 'react-native';

import { EventRegister } from 'react-native-event-listeners';
import { colors, images } from '../../constants/theme';
import {Header} from '../common';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { ScrollView } from 'react-native-gesture-handler';

export default class ChatCmp extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  chat: [
			{ id:0, image:images.chatSender1Icon, badget:3},
			{ id:1, image:images.chatSender2Icon, badget:2},
			{ id:2, image:images.chatSender1Icon, badget:3},
			{ id:3, image:images.chatSender2Icon, badget:0},
			{ id:4, image:images.chatSender1Icon, badget:3},
			{ id:5, image:images.chatSender2Icon, badget:2},
			{ id:6, image:images.chatSender1Icon, badget:3},
			{ id:7, image:images.chatSender2Icon, badget:0},
			{ id:8, image:images.chatSender1Icon, badget:3},
			{ id:9, image:images.chatSender2Icon, badget:2},
			{ id:10, image:images.chatSender1Icon, badget:3},
		  ]
		}
	  }

	render() {
		return(
			<SafeAreaView style={{flex:1}}>
				<Header name={'Chat'} navigation={this.props.navigation} search={true} />
				<ScrollView>
					{
						this.state.chat.map((val , i) =>{
							return (
								<TouchableOpacity onPress={()=> EventRegister.emit('isLoggedIn', 'Chat')} key={i} style={styles.chatMainView}>
									<View style={styles.chatImageView}>
										<Image style={styles.chatImageDimension} source={val.image} />
									</View>
									<View style={styles.chatTxtContView}>
										<View style={styles.chatTxtView}>
											<Text style={styles.chatHeading}>@yolk32</Text>
											<Text style={styles.chatLabel}>Hi, How are you?</Text>
										</View>
										<View style={styles.chatBadgetContView}>
											{
												val.badget > 0 ?
												<View style={styles.chatBadget}>
													<Text style={styles.chatBadgetTxt}>{val.badget}</Text>
												</View> : null
											}
										</View>
									</View>
								</TouchableOpacity>
							)
						})
					}

				</ScrollView>
      		</SafeAreaView>
		)
	}
}
const styles ={
	chatMainView:{ flex: 1, flexDirection:'row', padding:10 , borderBottomColor:'#c5c5c5' , borderBottomWidth:2},
	chatImageView:{ flex:1 , alignItems:'center', marginRight:10 },
	chatImageDimension:{ width:56, height:56 },
	chatTxtContView:{ flex:4, flexDirection:'row' },
	chatTxtView:{ flex:4 },
	chatHeading:{ fontSize:16, color:'#252525', fontFamily:'Poppins-SemiBold' },
	chatLabel: { fontSize:12, color:'#252525', fontFamily:'Poppins-Regular' },
	chatBadgetContView:{ flex:1 , alignItems:'center' , justifyContent:'center' },
	chatBadget:{ width:24, height:24,borderRadius:24 , backgroundColor:'#ff1822', justifyContent:'center', alignItems:'center' },
	chatBadgetTxt:{ fontSize:11, fontFamily:'Poppins-Medium', color:'#fff' }
}