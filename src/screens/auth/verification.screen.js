import React, { Component } from 'react';
import { Image, ImageBackground, TouchableOpacity, View, ScrollView } from 'react-native';
import { CardItem, Container, Form, Icon, Item, Input, Label, Title } from 'native-base';
import I18n from '../../locales';
import { primaryColor, backgroundColor, contrastColor, primaryFont } from '../../theme';
import images from '../../images';
import { Button, Center, Text } from '../../components/common';

class VerificationScreen extends Component {
  onBackPress = () => {
    this.props.navigator.pop();
  }

  render() {
    return (
      <Container id="Verification.container" style={{ backgroundColor: 'red' }}>
        <ImageBackground
          id="SignUp.bg-image"
          resizeMode="cover"
          style={styles.background}
          source={require('../../images/loginBackground.png')}
        >
          <View id="Signup.backButtonAndTitleWrapper" style={styles.header}>
            <Button
              id="Signup.backButton"
              style={{ flex: 1 }}
              transparent
              onPress={this.onBackPress}
            >
            <Icon style={{ color: 'white', fontSize: 40 }} name="ios-arrow-back" />
          </Button>
          <Text
            id="Verification.titleText"
            style={{ color: contrastColor, fontSize: 25, flex: 1.6, ...primaryFont }}
          >
            Register
          </Text>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = {
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    top: 20,
    flexDirection: 'row',
  },
  background: {
    flex: 1,
    height: null,
    width: null,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
};


export default VerificationScreen;

