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

const selectedCategories = [];

class CategoryGridScreen extends React.Component {
  componentDidMount() {
    console.warn(this.props.categories);
  }
  // componentWillMount() {
  //   this.toggleCategory = this.toggleCategory.bind(this);
  //   this.props.selectedCategoriesArray.forEach((catId) => {
  //     CatInfo[`key_${catId}`].status = true;
  //   });
  // }

  // onOkPress = () => {
  //   selectedCategories = [];
  //   Object.keys(CatInfo).forEach((key) => {
  //     const { status, id } = CatInfo[key];
  //     if (status) selectedCategories.push(id);
  //   });
  //   this.props.onCategorySelect(selectedCategories);
  //   this.props.navigator.dismissModal({
  //     animationType: 'slide-down',
  //   });
  // };

  // toggleCategory = (catId) => {
  //   const currentStatus = CatInfo[`key_${catId}`].status;
  //   CatInfo[`key_${catId}`].status = !currentStatus;
  // };

  // keyExtractor = (item, index) => index;

  toggleCategory = () => {
    // const currentStatus = CatInfo[`key_${catId}`].status;
    // CatInfo[`key_${catId}`].status = !currentStatus;
  };

  keyExtractor = (item, index) => index;

  renderItem = ({ item }) => (
    <CategorySelectItem
      image={categoryImages[item.name]}
      name={item.name}
      catId={item._id}
      status={false}
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
          <Button onPress={this.onOkPress}>
            <Text>{I18n.t('common.ok')}</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(null, {})(CategoryGridScreen);
