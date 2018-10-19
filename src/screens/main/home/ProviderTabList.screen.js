/* eslint-disable no-underscore-dangle, react/no-unused-state */
import React, { Component } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import I18n from '../../../locales';
import ProviderList from '../../../components/home/ProviderList';
import { UIActions } from '../../../actions';

const { shortListChanged } = UIActions;

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
          { key: 'photo', title: I18n.t('categories.photo') },
          { key: 'catering', title: I18n.t('categories.catering') },
          { key: 'entertainment', title: I18n.t('categories.entertainment') },
          { key: 'makeup', title: I18n.t('categories.makeup') },
          { key: 'cake', title: I18n.t('categories.cake') },
          { key: 'decoration', title: I18n.t('categories.decoration') },
          { key: 'costume', title: I18n.t('categories.costume') },
          { key: 'venue', title: I18n.t('categories.venue') },
          { key: 'transport', title: I18n.t('categories.transport') },
          { key: 'jewelry', title: I18n.t('categories.jewelry') },
          { key: 'stationary', title: I18n.t('categories.stationary') },
          { key: 'honeymoon', title: I18n.t('categories.honeymoon') },
        ],
      },
      visible: false,
    };
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent.bind(this));
  }

  componentDidMount() {
    Promise.all([
      Icon.getImageSource('heart', 20, '#ffffff'),
      Icon.getImageSource('heart-o', 20, '#ffffff'),
    ]).then((sources) => {
      this.props.navigator.setButtons({
        rightButtons: [
          {
            icon: this.props.shortlisted ? sources[0] : sources[1],
            id: 'shortlisted',
          },
        ],
        animated: true,
      });
    });
  }

  onShortListChange = () => {
    this.props.shortListChanged();
  };

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
    } else if (event.id === 'shortlisted') {
      Promise.all([
        Icon.getImageSource('heart', 20, '#ffffff'),
        Icon.getImageSource('heart-o', 20, '#ffffff'),
      ]).then((sources) => {
        this.props.navigator.setButtons({
          rightButtons: [
            {
              icon: this.props.shortlisted ? sources[0] : sources[1],
              id: 'shortlisted',
            },
          ],
          animated: true,
        });
      });
      this.onShortListChange();
    }
  }

  PhotoRoute = () => <ProviderList category="Photo" navigator={this.props.navigator} />;
  CateringRoute = () => <ProviderList category="Catering" navigator={this.props.navigator} />;
  EntertainmentRoute = () => (
    <ProviderList category="Entertainment" navigator={this.props.navigator} />
  );
  MakeupRoute = () => <ProviderList category="Make up" navigator={this.props.navigator} />;
  CakeRoute = () => <ProviderList category="Cake" navigator={this.props.navigator} />;
  DecorationRoute = () => <ProviderList category="Decoration" navigator={this.props.navigator} />;
  ConstumeRoute = () => <ProviderList category="Costume" navigator={this.props.navigator} />;
  VenueRoute = () => <ProviderList category="Venue" navigator={this.props.navigator} />;
  TransportRoute = () => <ProviderList category="Transport" navigator={this.props.navigator} />;
  JewelryRoute = () => <ProviderList category="Jewelry" navigator={this.props.navigator} />;
  StationaryRoute = () => <ProviderList category="Stationary" navigator={this.props.navigator} />;
  HoneymoonRoute = () => <ProviderList category="Honeymoon" navigator={this.props.navigator} />;

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
      renderLabel={this._renderLabel}
      indicatorStyle={{ backgroundColor: 'red' }}
    />
  );

  _renderLabel = ({ route }) => (
    <Text style={styles.labelText} adjustsFontSizeToFit minimumFontScale={0.8}>
      {route.title.toUpperCase()}
    </Text>
  );

  _renderScene = SceneMap({
    photo: this.PhotoRoute,
    catering: this.CateringRoute,
    entertainment: this.EntertainmentRoute,
    makeup: this.MakeupRoute,
    cake: this.CakeRoute,
    decoration: this.DecorationRoute,
    costume: this.ConstumeRoute,
    venue: this.VenueRoute,
    transport: this.TransportRoute,
    jewelry: this.JewelryRoute,
    stationary: this.StationaryRoute,
    honeymoon: this.HoneymoonRoute,
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

const styles = {
  labelText: {
    padding: 7,
    color: 'red',
  },
};

const mapStateToProps = state => ({
  shortlisted: state.ui.shortlisted,
});

export default connect(mapStateToProps, { shortListChanged })(ProviderTabList);
