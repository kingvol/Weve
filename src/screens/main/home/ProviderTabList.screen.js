/* eslint-disable no-underscore-dangle, react/no-unused-state */
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import ProviderList from '../../../components/home/ProviderList';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const VenueRoute = () => <ProviderList category="Venue" />;
const ArtistRoute = () => <ProviderList category="Artist" />;
const PhotoRoute = () => <ProviderList category="Photo" />;
const VideoRoute = () => <ProviderList category="Video" />;
const EntertainmentRoute = () => <ProviderList category="Entertainment" />;
const MakeupRoute = () => <ProviderList category="Make up" />;
const ConstumeRoute = () => <ProviderList category="Costume" />;
const DecorationRoute = () => <ProviderList category="Decoration" />;
const CakeRoute = () => <ProviderList category="Cake" />;

class ProviderTabList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.routeIndex || 0,
      routes: [
        { key: 'venue', title: 'Venue' },
        { key: 'artist', title: 'Artist' },
        { key: 'photo', title: 'Photo' },
        { key: 'video', title: 'Video' },
        { key: 'entertainment', title: 'Entertainment' },
        { key: 'makeup', title: 'Make up' },
        { key: 'costume', title: 'Costume' },
        { key: 'decoration', title: 'Decoration' },
        { key: 'cake', title: 'Cake' },
      ],
    };
  }

  _handleIndexChange = index => this.setState({ index });

_renderHeader = props => (
  <TabBar
    {...props}
    scrollEnabled
    useNativaDriver
    style={{ backgroundColor: 'white' }}
    labelStyle={{ color: 'red' }}
    indicatorStyle={{ backgroundColor: 'red' }}
  />);

  _renderScene = SceneMap({
    venue: VenueRoute,
    artist: ArtistRoute,
    photo: PhotoRoute,
    video: VideoRoute,
    entertainment: EntertainmentRoute,
    makeup: MakeupRoute,
    costume: ConstumeRoute,
    decoration: DecorationRoute,
    cake: CakeRoute,
  });

  render() {
    return (
      <TabViewAnimated
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProviderTabList;
