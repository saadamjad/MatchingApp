import React, {Component} from 'react';
import { View, Text, SafeAreaView , ScrollView, Image } from 'react-native';

import { colors, images } from '../../constants/theme';
import {Header} from '../common';
// import { ScrollView } from 'react-native-gesture-handler';

export default class ChatCmp extends Component {
	// static navigationOptions ={
	// 	drawerIcon:(
	// 		<Image source={images.wishlistIcon} style={{ width:36, height:36 }} />
	// 	)
	// }
	constructor(props) {
		super(props);
		this.state = {
		  chat: [
			{ id:0, image:images.chatSender1Icon, request:0},
			{ id:1, image:images.chatSender2Icon, request:1},
			{ id:2, image:images.chatSender1Icon, request:0},
			{ id:3, image:images.chatSender2Icon, request:1},
			{ id:4, image:images.chatSender1Icon, request:0},
			{ id:5, image:images.chatSender2Icon, request:1},
			{ id:6, image:images.chatSender1Icon, request:0},
			{ id:7, image:images.chatSender2Icon, request:1},
			{ id:8, image:images.chatSender1Icon, request:0},
			{ id:9, image:images.chatSender2Icon, request:1},
			{ id:10, image:images.chatSender1Icon, request:0},
		  ]
		}
	  }

	render() {
		return(
			<SafeAreaView style={{flex:1}}>
				<Header name={'Wishlist'}  navigation={this.props.navigation} search={true} />
				<ScrollView>
					{
						this.state.chat.map((val , i) =>{
							return (
								<View key={i} style={styles.chatMainView}>
									<View style={styles.chatImageView}>
										<Image style={styles.chatImageDimension} source={val.image} />
									</View>
									<View style={styles.chatTxtContView}>
										<View style={styles.chatTxtView}>
											<Text style={styles.chatHeading}>@yolk32</Text>
                                            <View style={styles.locationcont}>
                                                <Image style={styles.locationImg} source={images.locationIcon} />
											    <Text style={styles.chatLabel}>New York</Text>
                                            </View>
										</View>
										<View style={styles.chatBadgetContView}>
                                            <Text style={ val.request == 0 ? styles.greenColor : styles.redColor }>{ val.request == 0 ? 'Request Send': 'Send Request'}</Text>											
										</View>
									</View>
								</View>
							)
						})
					}

				</ScrollView>
      		</SafeAreaView>
		)
	}
}
const styles ={
	chatMainView:{ flex: 1, flexDirection:'row', padding:10 , borderColor:'#c5c5c5' , borderWidth:1 , margin:10, borderRadius:5},
	chatImageView:{ flex:1 , alignItems:'center', marginRight:10 },
	chatImageDimension:{ width:56, height:56 },
	chatTxtContView:{ flex:4, flexDirection:'row' },
	chatTxtView:{ flex:4 },
	chatHeading:{ fontSize:16, color:'#252525', fontFamily:'Poppins-SemiBold' },
	chatLabel: { fontSize:12, color:'#252525', fontFamily:'Poppins-Regular' },
	chatBadgetContView:{ flex:2 , alignItems:'center' , justifyContent:'center' },
	chatBadget:{ width:24, height:24,borderRadius:24 , backgroundColor:'#ff1822', justifyContent:'center', alignItems:'center' },
    chatBadgetTxt:{ fontSize:11, fontFamily:'Poppins-Medium', color:'#fff' },
    greenColor:{ color:'#39b54a' , fontSize:11, fontFamily:'Poppins-SemiBold', textDecorationLine:'underline' },
    redColor:{ color:'#ff1822' , fontSize:11, fontFamily:'Poppins-SemiBold', textDecorationLine:'underline' },
    locationcont:{flexDirection:'row'},
    locationImg:{ marginRight:5, width:11, height:16 },
}