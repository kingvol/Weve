/* REMOVE ME LATER */
import React, { Component } from 'react';
import { ImageBackground, ScrollView } from 'react-native';
import { View, Container, Button, Text } from 'native-base';


class BiometricsModal extends Component {
  render() {
    return (
      <Container id="Verification.container" style={{ backgroundColor: 'red' }}>
        <ImageBackground
          id="SignUp.bg-image"
          resizeMode="cover"
          style={styles.background}
          source={require('../../images/loginBackground.png')}
        >
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={styles.header}>
              <Text>header..</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text>test</Text>
            </View>
          </ScrollView>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = {
  header: {
    flex: 0.1,
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
  contentContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    color: 'white',
  },
  inputConteiner: {
    margin: 50,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    borderColor: 'gray',
  },
  inputTextStyle: {
    fontSize: 18,
    color: 'white',
    flex: 1,
  },
  button: {
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#f3c200',
  },
  buttonText: {
    color: 'red',
  },
  resend: {
    marginTop: -40,
    marginBottom: 20,
  },
  resendText: {
    color: 'white',
    fontSize: 18,
  },
};

export default BiometricsModal;
