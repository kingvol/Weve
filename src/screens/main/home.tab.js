import React, { Component } from 'react';
import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { Content } from 'native-base';

import I18n from '../../locales';
import images from '../../images';
import { primaryFont, backgroundColor } from '../../theme';
import { fetchProfile } from '../../actions/user.actions';
import startPushService from '../../services/PushService';

const categories = [
  {
    route: 'Venue',
    screenIndex: 0,
    title: I18n.t('categories.venue'),
    imageSource: images.venue,
  },
  {
    route: 'Artist',
    screenIndex: 1,
    title: I18n.t('categories.artist'),
    imageSource: images.artist,
  },
  {
    route: 'Photo',
    screenIndex: 2,
    title: I18n.t('categories.photo'),
    imageSource: images.photo,
  },
  {
    route: 'Catering',
    screenIndex: 3,
    title: I18n.t('categories.catering'),
    imageSource: images.catering,
  },
  {
    route: 'Entertainment',
    screenIndex: 4,
    title: I18n.t('categories.entertainment'),
    imageSource: images.ent,
  },
  {
    route: 'MakeUp',
    screenIndex: 5,
    title: I18n.t('categories.makeup'),
    imageSource: images.make_up,
  },
  {
    route: 'Costume',
    screenIndex: 6,
    title: I18n.t('categories.costume'),
    imageSource: images.costume,
  },
  {
    route: 'Decoration',
    screenIndex: 7,
    title: I18n.t('categories.decoration'),
    imageSource: images.decoration,
  },
  {
    route: 'Cake',
    screenIndex: 8,
    title: I18n.t('categories.cake'),
    imageSource: images.cake,
  },
];

const items = [];
for (let i = 0; i <= categories.length; i += 3) {
  items.push(categories.slice(i, i + 3));
}

class HomeTab extends Component {
  componentDidMount() {
    startPushService(this.props.navigator);
    this.props.fetchProfile('me');
  }

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
    return (
      <Content style={{ flex: 1, backgroundColor }} contentContainerStyle={{ flexGrow: 1 }}>
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

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { fetchProfile })(HomeTab);
