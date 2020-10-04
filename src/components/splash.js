import React from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Alert,
  Platform,
  ImageBackground,
  StatusBar,
} from 'react-native';

import {EventRegister} from 'react-native-event-listeners';

import {colors, images} from '../constants/theme';

const {height: deviceHeight, width: deviceWidth} = Dimensions.get('screen');

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: false,
      inputStart: '-30deg',
      inputEnd: '20deg',
      loggedIn: null,
      rotateValue: new Animated.Value(0),
      isEnable: false,
      timeout: null,
      showBtn: false,
    };
    this.rotateAnimation();
  }

  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 5000),
    );
  };

  async componentDidMount() {
    const data = await this.performTimeConsumingTask();

    setTimeout(() => {
      // EventRegister.emit('isLoggedIn', 'Login')
      EventRegister.emit('isLoggedIn', 'Main');
    }, 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
  }

  rotateAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.rotateValue, {
        toValue: 100,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.rotateValue, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.setState({
        text: true,
        inputStart: '20deg',
        inputEnd: '20deg',
      });
    });
  };

  render() {
    return (
      <View style={styles.viewStyles}>
        <ImageBackground
          source={images.splashBackground}
          // resizeMode="contain"
          resizeMode="cover"
          style={styles.imageView}>
          <View style={styles.splashLogostyle}>
            <Image
              style={{width: 270, height: 130}}
              source={images.splashLogo}
            />
          </View>
        </ImageBackground>
        <StatusBar translucent backgroundColor="transparent" />
      </View>
    );
  }
}
const styles = {
  bgContainer: {
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogostyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  viewStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c3e0e3',
  },
  imageView: {
    height: deviceHeight,
    width: deviceWidth,
  },
  animatedBox: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
  },
};

export default Splash;
