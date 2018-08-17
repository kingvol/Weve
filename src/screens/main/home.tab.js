import React, { Component } from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Modal,
  ImageBackground,
  Animated,
  Easing,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { Content } from 'native-base';

import { Button } from '../../components/common';
import I18n from '../../locales';
import images from '../../images';
import { primaryFont, backgroundColor } from '../../theme';
import { fetchProfile } from '../../actions/user.actions';
import { UIActions } from '../../actions';
import startPushService from '../../services/PushService';

const { exhibitionChanged } = UIActions;

const categories = [
  {
    route: 'Photo',
    screenIndex: 0,
    title: I18n.t('categories.photo'),
    imageSource: images.photo,
  },
  {
    route: 'Catering',
    screenIndex: 1,
    title: I18n.t('categories.catering'),
    imageSource: images.catering,
  },
  {
    route: 'Entertainment',
    screenIndex: 2,
    title: I18n.t('categories.entertainment'),
    imageSource: images.ent,
  },
  {
    route: 'MakeUp',
    screenIndex: 3,
    title: I18n.t('categories.makeup'),
    imageSource: images.make_up,
  },
  {
    route: 'Cake',
    screenIndex: 4,
    title: I18n.t('categories.cake'),
    imageSource: images.cake,
  },
  {
    route: 'Decoration',
    screenIndex: 5,
    title: I18n.t('categories.decoration'),
    imageSource: images.decoration,
  },
  {
    route: 'Costume',
    screenIndex: 6,
    title: I18n.t('categories.costume'),
    imageSource: images.costume,
  },
  {
    route: 'Venue',
    screenIndex: 7,
    title: I18n.t('categories.venue'),
    imageSource: images.venue,
  },
  {
    route: 'Transport',
    screenIndex: 8,
    title: I18n.t('categories.transport'),
    imageSource: images.transport,
  },
];

const items = [];
for (let i = 0; i <= categories.length; i += 3) {
  items.push(categories.slice(i, i + 3));
}

class HomeTab extends Component {
  constructor() {
    super();
    this.animatedValue1 = new Animated.Value(0);
    this.animatedValue2 = new Animated.Value(0);
    this.animatedValue3 = new Animated.Value(0);
  }

  componentDidMount() {
    startPushService(this.props.navigator);
    this.props.fetchProfile('me');
    this.animate();
  }

  onExhibitionChange = () => {
    this.props.exhibitionChanged();
  };

  onCategoryPress = (category) => {
    this.props.navigator.push({
      screen: 'wevedo.ProviderTabList',
      title: I18n.t('categories.categories'),
      passProps: { routeIndex: category.screenIndex },
      navigatorStyle: {
        navBarBackgroundColor: '#d64635',
        navBarTextColor: 'white',
        navBarButtonColor: 'white',
        navBarTextFontFamily: primaryFont,
      },
    });
  };

  animate = () => {
    this.animatedValue1.setValue(0);
    this.animatedValue2.setValue(0);
    this.animatedValue3.setValue(0);
    const createAnimation = (value, duration, easing, delay = 0) =>
      Animated.timing(value, {
        toValue: 1,
        duration,
        easing,
        delay,
      });
    Animated.parallel([
      createAnimation(this.animatedValue1, 2000, Easing.ease),
      createAnimation(this.animatedValue2, 1000, Easing.ease, 1000),
      createAnimation(this.animatedValue3, 1000, Easing.ease, 2000),
    ]).start();
  };

  renderItem = ({ item }) => (
    <View
      style={{
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: item.length === 3 ? 'space-around' : 'flex-start',
      }}
    >
      {item.map(category => (
        <TouchableOpacity
          style={{ width: '33%', alignItems: 'center' }}
          onPress={() => this.onCategoryPress(category)}
          key={category.title}
        >
          <FastImage source={category.imageSource} style={{ width: 80, height: 80 }} />
          <Text style={{ textAlign: 'center', ...primaryFont, color: 'black' }}>
            {category.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  render() {
    const { modalBackground, modalContainer, modalButton } = styles;
    const scaleText = this.animatedValue1.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 2],
    });
    const spinText = this.animatedValue2.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '720deg'],
    });
    const introButton = this.animatedValue3.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 400],
    });
    return (
      <Content style={{ flex: 1, backgroundColor }} contentContainerStyle={{ flexGrow: 1 }}>
        <Modal
          transparent={false}
          visible={this.props.exhibition && !this.props.user.profile.isProvider}
          onRequestClose={() => this.onExhibitionChange()}
        >
          <ImageBackground resizeMode="cover" style={modalBackground} source={images.backGround}>
            <View style={modalContainer}>
              <Animated.View style={{ transform: [{ scale: scaleText }] }}>
                <TouchableOpacity onPress={this.animate}>
                  <Text style={{ color: 'white' }}>YOU’RE A WINNER!</Text>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{ marginTop: 20, transform: [{ rotate: spinText }] }}>
                <TouchableOpacity onPress={this.animate}>
                  <View>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>Ticket number : C15</Text>
                    <Text style={{ fontSize: 18, textAlign: 'center' }}>
                      Please come to the Wevedo stand (B52) {'\n'} to collect your prize.
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{ top: introButton, position: 'absolute' }}>
                <Button style={modalButton} block onPress={this.onExhibitionChange}>
                  <Text style={{ color: 'red', fontSize: 20 }}>OK</Text>
                </Button>
              </Animated.View>
            </View>
          </ImageBackground>
        </Modal>
        <View style={{ flex: 1, minHeight: 150 }}>
          <FastImage
            source={images.category_hero}
            style={{
              flex: 1,
              width: null,
              height: null,
            }}
            resizeMode="cover"
          />
        </View>
        <View style={{ marginTop: 14 }}>
          <FlatList
            numColumns={1}
            data={items}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Content>
    );
  }
}

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
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
  modalButton: {
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor: '#f3c200',
    height: 40,
  },
};

const mapStateToProps = state => ({
  user: state.user,
  exhibition: state.ui.exhibition,
});

export default connect(mapStateToProps, { fetchProfile, exhibitionChanged })(HomeTab);
