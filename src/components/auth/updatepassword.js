import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
const App = () => {
  return (
    <View
      style={{
        // backgroundColor: 'teal',
        flex: 1,
        width: '85%',
        alignSelf: 'center',
      }}>
      <View
        style={{
          //   backgroundColor: 'yellow',
          height: 75,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 23}}>Reset Password</Text>
      </View>
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Current Password</Text>
        <TextInput
          placeholder="Enter Password"
          secureTextEntry={true}
          style={{
            borderBottomWidth: 0.5,
            borderColor: '#999',
            // backgroundColor: 'pink',
            height: 40,
          }}
        />
      </View>
      <View style={{marginVertical: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>New Password</Text>
        <TextInput
          placeholder="Type New Password"
          secureTextEntry={true}
          style={{
            borderBottomWidth: 0.5,
            borderColor: '#999',
            // backgroundColor: 'pink',
            height: 40,
          }}
        />
      </View>
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          Confirm New Password
        </Text>
        <TextInput
          placeholder="Repeat New Password"
          secureTextEntry={true}
          style={{
            borderBottomWidth: 0.5,
            borderColor: '#999',
            // backgroundColor: 'pink',
            height: 40,
          }}
        />
      </View>
      <View
        style={{
          width: '100%',
          height: 100,
          //   backgroundColor: 'tomato',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={{
            width: '85%',
            borderRadius: 30,
            backgroundColor: '#ff1822',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 1.5,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
            UPDATE PASSWORD
          </Text>
        </TouchableOpacity>
      </View>
      {/* =====================issy uper======================== */}
    </View>
  );
};
export default App;
