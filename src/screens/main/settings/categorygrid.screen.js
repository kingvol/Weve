import React from 'react';
import { SafeAreaView, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import images from '../../../images';
import CategorySelectItem from '../../../components/settings/CategorySelectItem';
import I18n from '../../../locales';
import { Button, Text } from '../../../components/common';

const categoryImages = {
  Venue: images.venue,
  Media: images.photo,
  Catering: images.catering,
  Entertainment: images.ent,
  Beauty: images.make_up,
  Boutique: images.costume,
  Decoration: images.decoration,
  Cake: images.cake,
  Transport: images.transport,
  Stationary: images.stationary,
  Jewelry: images.jewelry,
  Honeymoon: images.honeymoon,
};

class CategoryGridScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategories: props.selectedCategoriesArray,
    };
  }

  onSubmitPress = () => {
    this.props.onCategorySelect(this.state.selectedCategories);
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
  };

  toggleCategory = (id) => {
    const { selectedCategories } = this.state;

    if (selectedCategories.indexOf(id) === -1) {
      this.setState({ selectedCategories: [...selectedCategories, id] });
    } else {
      this.setState({
        selectedCategories: selectedCategories.filter(item => item !== id),
      });
    }
  };

  keyExtractor = (item, index) => index;

  renderItem = ({ item }) => (
    <CategorySelectItem
      image={categoryImages[item.name]}
      name={I18n.t(`categories.${item.name.toLowerCase()}`)}
      catId={item._id}
      selected={this.state.selectedCategories.indexOf(item._id) !== -1}
      toggleCategory={this.toggleCategory}
    />
  );

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ alignItems: 'center', paddingTop: 10 }}>
          <FlatList
            numColumns={3}
            data={this.props.categories}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Button onPress={this.onSubmitPress}>
            <Text>{I18n.t('common.ok')}</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(null, {})(CategoryGridScreen);
