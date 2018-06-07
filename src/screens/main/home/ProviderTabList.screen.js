/* eslint-disable no-underscore-dangle, react/no-unused-state */
import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import I18n from '../../../locales';
import ProviderList from '../../../components/home/ProviderList';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

class ProviderTabList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabBarState: {
        index: this.props.routeIndex || 0,
        routes: [
          { key: 'venue', title: I18n.t('categories.venue') },
          { key: 'artist', title: I18n.t('categories.artist') },
          { key: 'photo', title: I18n.t('categories.photo') },
          { key: 'catering', title: I18n.t('categories.catering') },
          { key: 'entertainment', title: I18n.t('categories.entertainment') },
          { key: 'makeup', title: I18n.t('categories.makeup') },
          { key: 'costume', title: I18n.t('categories.costume') },
          { key: 'decoration', title: I18n.t('categories.decoration') },
          { key: 'cake', title: I18n.t('categories.cake') },
        ],
      },
      visible: false,
    };
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent.bind(this));
  }

  handleNavigatorEvent(event) {
    if (event.id === 'willAppear') {
      this.setState({ visible: true });
    } else if (event.id === 'willDisappear') {
      this.setState({ visible: false });
    } else if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'fade',
      });
    }
  }

  VenueRoute = () => <ProviderList category="Venue" navigator={this.props.navigator} />;
  ArtistRoute = () => <ProviderList category="Artist" navigator={this.props.navigator} />;
  PhotoRoute = () => <ProviderList category="Photo" navigator={this.props.navigator} />;
  CateringRoute = () => <ProviderList category="Catering" navigator={this.props.navigator} />;
  EntertainmentRoute = () => (
    <ProviderList category="Entertainment" navigator={this.props.navigator} />
  );
  MakeupRoute = () => <ProviderList category="Make up" navigator={this.props.navigator} />;
  ConstumeRoute = () => <ProviderList category="Costume" navigator={this.props.navigator} />;
  DecorationRoute = () => <ProviderList category="Decoration" navigator={this.props.navigator} />;
  CakeRoute = () => <ProviderList category="Cake" navigator={this.props.navigator} />;

  _handleIndexChange = (index) => {
    this.setState({
      tabBarState: {
        ...this.state.tabBarState,
        index,
      },
    });
  };

  _renderHeader = props => (
    <TabBar
      {...props}
      scrollEnabled
      useNativeDriver
      style={{ backgroundColor: 'white' }}
      labelStyle={{ color: 'red' }}
      indicatorStyle={{ backgroundColor: 'red' }}
    />
  );

  _renderScene = SceneMap({
    venue: this.VenueRoute,
    artist: this.ArtistRoute,
    photo: this.PhotoRoute,
    catering: this.CateringRoute,
    entertainment: this.EntertainmentRoute,
    makeup: this.MakeupRoute,
    costume: this.ConstumeRoute,
    decoration: this.DecorationRoute,
    cake: this.CakeRoute,
  });

  render() {
    const { visible } = this.state;
    return (
      <View style={{ flex: visible === true ? 1 : 0 }}>
        <TabViewAnimated
          navigationState={this.state.tabBarState}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
      </View>
    );
  }
}

export default ProviderTabList;
