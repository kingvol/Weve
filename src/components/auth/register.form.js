import React, { Component } from 'react';
import { Alert, ImageBackground, StyleSheet, View, Platform } from 'react-native';
import { CheckBox, Body, ListItem, Picker, Left, Icon } from 'native-base';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Button, Container, Content, FieldInput, Text } from '../../components/common';
 //import Eula from 'Eula'
import { contrastColor, primaryFont } from '../../theme';
// import SignupImageForm from '../Components/Auth/SignupImageForm';

// const Item = Picker.Item;

/* const CATEGORIES = [
    I18n.t('categories.venue'),
    I18n.t('categories.artist'),
    I18n.t('categories.makeup'),
    I18n.t('categories.entertainment'),
    I18n.t('categories.costume'),
    I18n.t('categories.decoration'),
    I18n.t('categories.video'),
    I18n.t('categories.photo'),
    I18n.t('categories.cake'),
] */

class SignupForm extends Component {
  state = {
    loading: false,
    isModalVisible: false,
    step: 1,
    values: {
      email: '',
      password: '',
      confirmPassword: '',
      isAdvertiser: false,
      category: null,
      image: null,
    },
  }

  componentDidMount() {
    /* Predefine Venue category on iOS
    if (Platform.OS === 'ios') {
      this.onCategorySelect('Venue');
    } */
  }

  onCheckboxPress = () => {
    this.setState({
      isAdvertiser: !this.state.isAdvertiser,
    });
  }

  /* onCategorySelect = (category) => {
    this.setState({
      category,
    })
  } */

  /* onImageSelect = (uri) => {
    this.setState({
      image: uri,
    });
  } */

  /* onContinuePress = () => {
    this.setState({
      step: 2,
    });
  } */

  /* handleDecline() {
    this.setState({isModalVisible: !this.state.isModalVisible, values: null});
        setTimeout(() => {
            Alert.alert(
                `${I18n.t('eula.error')}`,
                `${I18n.t('eula.error_message')}`,
                [{text: `${I18n.t('common.ok')}`}]
            )
        }, 800)
  } */

  /* handleAccept() {
        this.setState({isModalVisible: !this.state.isModalVisible});
        const {email, password, fullName} = this.state.values;       
        const { isAdvertiser, category, image } = this.state;
        this.setState({loading: true});        
        const arrFN = fullName.split(' ').map((a) => { return a.charAt(0).toUpperCase() + a.substr(1) });
        const capitalFullName = arrFN.join(' ');        
        

        if (isAdvertiser) {
            this.props.signupProvider(email, password, capitalFullName, image, category, result => {
                this.setState({loading: false});
                const {errorMessage} = result;
                if (errorMessage) {
                    Alert.alert(
                        I18n.t('logIn.create_user_error'),
                        errorMessage,
                        [{text: I18n.t('common.ok')}],
                        {cancelable: false}
                    );
                }
            });
        } else {
            this.props.signupUser(email, password, capitalFullName, result => {
                this.setState({loading: false});
                const {errorMessage} = result;
                if (errorMessage) {
                    Alert.alert(
                        I18n.t('logIn.create_user_error'),
                        errorMessage,
                        [{text: I18n.t('common.ok')}],
                        {cancelable: false}
                    );
                }
            });
        }
  } */

  /* onSubmitForm = (values) => {
        const { isAdvertiser, image } = this.state;
        let { category } = this.state;

        // on Android the Venue category is predefined in UI but not set to state
        if (Platform.OS === 'android' && !category) {
            category = 'Venue';
            this.setState({
                category: 'Venue',
            })
        }

        if (isAdvertiser && !category) {
            alert(I18n.t('logIn.no_category'));
            return;
        }

        if (isAdvertiser && !image) {
            alert(I18n.t('logIn.no_image'));
            return;
        };
        this.setState({isModalVisible: !this.state.isModalVisible, values})
  } */

  renderSignUp = () => {
    const disabled = false;
    //const disabled = this.state.loading || pristine || submitting || !email || !password || !confirmPassword || (this.state.step === 2 && ! this.state.image)
    return (
      <Content
        id="SignUp.content"
        padder
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
      <View id="Signup.backButtonAndTitleWrapper" style={{
          justifyContent: 'flex-start',
                    top: 20,
                    flexDirection: 'row',
          }}>
                    <Button id="Signup.backButton" style={{flex: 1}} transparent >
                        <Icon size={25} style={{color: 'white'}} name="ios-chevron-left"/>
                    </Button>
                    <Text id="Signup.titleText" style={{color: contrastColor, fontSize: 25, flex: 2, ...primaryFont}}>
                        {I18n.t('logIn.sign_up')}
                    </Text>
                </View>
                <View id="Signup.formWrapper" style={{
                    flex: 0,
                    justifyContent: 'flex-start',
                }}>
                    <View style={{backgroundColor: 'rgba(0,0,0,0.2)', padding: 10, paddingTop: 0, paddingBottom: 0, flexDirection: 'column'}}>
                        {this.state.step === 1 && <View>
                        <FieldInput color={contrastColor}
                               name="fullName"
                               placeholder={I18n.t('common.fullName')}
                               errorColor={contrastColor}
                               id='SignUp.fullNameInput'
                               autoCapitalize='words'                              
                        />
                        <FieldInput color={contrastColor}
                               name="email"
                               placeholder={I18n.t('common.email')}
                               errorColor={contrastColor}
                               id='SignUp.emailInput'
                        />
                        <FieldInput color={contrastColor} name="password"
                               placeholder={I18n.t('common.password')}
                               errorColor={contrastColor}
                               secureTextEntry={true}
                               id='SignUp.passwordInput'
                        />
                        <FieldInput color={contrastColor}
                               name="confirmPassword"
                               placeholder={I18n.t('logIn.confirm_password')}
                               errorColor={contrastColor}
                               secureTextEntry={true}
                               id='SignUp.confirmPasswordInput'
                        />

                       
                        <View style={{ flexDirection: 'row', }}>
                        <CheckBox checked={this.state.isAdvertiser} onPress={this.onCheckboxPress} color="#f3c200" />
                            <Left>
                                <Text style={styles.checkBoxText}>{I18n.t('logIn.advertiser')}</Text>
                            </Left>
                        </View>

                        </View>}

                        {/*this.state.isAdvertiser && this.state.step === 1 && (
                          <View style={{ flexDirection: 'row'}}>
                              {Platform.OS === 'android' && <Text style={styles.categoryText}>{I18n.t('common.category')}</Text>}
                            <Picker
                                mode="dropdown"
                                style={{ color: 'white', flex: Platform.OS === 'ios' ? 0 : 1 }}
                                placeholder={I18n.t('logIn.select_category')}
                                selectedValue={this.state.category}
                                onValueChange={this.onCategorySelect}
                                placeholderTextColor="white"
                                placeholderStyle={{ color: 'white', }}
                                textStyle={{ color: 'white', }}
                            >
                                {CATEGORIES.map(item => (
                                    <Item key={item} label={item} value={item} />
                                ))}
                            </Picker>
                          </View>
                        )*/}

                        {/*this.state.isAdvertiser && this.state.step === 1 && (
                            <View style={{ alignItems: 'center', borderTopColor: 'white', borderTopWidth: 1 }}>
                                <Text note style={{ color: 'white', margin: 10, marginBottom: 0, }}>{I18n.t('logIn.account_activation')}</Text>
                            </View>
                        )*/}

                        {/*this.state.isAdvertiser && this.state.step === 2 && (
                            <SignupImageForm
                                onImageSelect={this.onImageSelect}
                            />
                        )*/}

                        <Button id="Signup.submitButton"
                            style={styles.registerButton} block
                            disabled={disabled}
                            onPress={() => {}/*this.state.isAdvertiser && this.state.step === 1 ? this.onContinuePress : handleSubmit(this.onSubmitForm) */}
                            spinner={this.state.loading}
                        >
                            <Text style={styles.registerButtonText}>
                                {this.state.isAdvertiser && this.state.step === 1 ? I18n.t('common.continue') : I18n.t('logIn.sign_up')}
                            </Text>
                        </Button>



                        {/* <Eula isModalVisible={this.state.isModalVisible}
                              handleDecline={this.handleDecline.bind(this)}
                              handleAccept={this.handleAccept.bind(this)}
                              id="Signup.EULA"
                      /> */}
                    </View>
                </View>
            </Content>
        )
    }

    render() {
        return (
            <Container id="SignUp.container" style={{ backgroundColor: 'red' }}>
                <ImageBackground id="SignUp.bg-image" resizeMode="cover" style={styles.background}
                                 source={require('../../images/loginBackground.png')}>
                    {this.renderSignUp()}
                </ImageBackground>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        height: null,
        width: null,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1
    },
    registerButton: {
        marginTop: 10,
        backgroundColor: '#f3c200',
    },
    registerButtonText: {
        color: 'red',
    },
    checkBoxText: {
        color: 'white',
        marginLeft: 20,
    },
    categoryText: {
        color: 'white',
        marginTop: 15,
        marginRight: 100,
    }
});

export default SignupForm;
