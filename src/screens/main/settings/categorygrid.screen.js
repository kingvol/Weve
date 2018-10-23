import React from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import images from '../../../images';
import CategorySelectItem from '../../../components/settings/CategorySelectItem';
import I18n from '../../../locales';
import { Button, Text } from '../../../components/common';



// "key_" + categorty id( from backend ) = key for Catinfo lookup
// this is used to store category information for easy lookups

const CatInfo = {
  key_5ae9ba16c2ccda00b752b718: {
    image: images.venue,
    status: false,
    id: '5ae9ba16c2ccda00b752b718',
  },
  key_5ae9ba16c2ccda00b752b71a: {
    image: images.photo,
    status: false,
    id: '5ae9ba16c2ccda00b752b71a',
  },
  key_5ae9ba16c2ccda00b752b71c: {
    image: images.ent,
    status: false,
    id: '5ae9ba16c2ccda00b752b71c',
  },
  key_5ae9ba16c2ccda00b752b71d: {
    image: images.make_up,
    status: false,
    id: '5ae9ba16c2ccda00b752b71d',
  },
  key_5ae9ba16c2ccda00b752b71f: {
    image: images.decoration,
    status: false,
    id: '5ae9ba16c2ccda00b752b71f',
  },
  key_5ae9ba16c2ccda00b752b720: {
    image: images.cake,
    status: false,
    id: '5ae9ba16c2ccda00b752b720',
  },
  key_5ae9ba16c2ccda00b752b71e: {
    image: images.costume,
    status: false,
    id: '5ae9ba16c2ccda00b752b71e',
  },
  key_5ae9ba16c2ccda00b752b71b: {
    image: images.catering,
    status: false,
    id: '5ae9ba16c2ccda00b752b71b',
  },
  key_5b5c2f35a4a01374a3d1d74a: {
    image: images.transport,
    status: false,
    id: '5b5c2f35a4a01374a3d1d74a',
  },
  key_5bc7be2e58c2de53fff805aa: {
    image: images.jewelry,
    status: false,
    id: '5bc7be2e58c2de53fff805aa',
  },
  key_5bc7be2e58c2de53fff805ab: {
    image: images.stationary,
    status: false,
    id: '5bc7be2e58c2de53fff805ab',
  },
  key_5bc7be2e58c2de53fff805ac: {
    image: images.honeymoon,
    status: false,
    id: '5bc7be2e58c2de53fff805ac',
  },
};


// this stores the final result array of all the selected categories
// used 2 DataStrcutures to better integrate with the API.

let selectedCategories = [];


class CategoryGridScreen extends React.Component {
  componentWillMount() {
    this.toggleCategory = this.toggleCategory.bind(this);
    this.props.selectedCategoriesArray.forEach((catId) => {
      console.log(catId);
      CatInfo[`key_${catId}`].status = true;
    });
  }


  onOkPress = () => {
    selectedCategories = [];
    Object.keys(CatInfo).forEach((key) => {
      const { status, id } = CatInfo[key];
      if (status) selectedCategories.push(id);
    });
    this.props.onCategorySelect(selectedCategories);
    this.props.navigator.pop({ animated: true, animationType: 'slide-up' });
  }

  toggleCategory = (catId) => {
    const currentStatus = CatInfo[`key_${catId}`].status;
    CatInfo[`key_${catId}`].status = (!currentStatus);
  }

  keyExtractor = (item, index) => index ;

  renderItem = ({ item }) => (
    <CategorySelectItem
      image={CatInfo[`key_${item._id}`].image}
      name={item.name}
      catId={item._id}
      status={CatInfo[`key_${item._id}`].status}
      toggleCategory={this.toggleCategory}
    />
  )

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>

        <View style={{ alignItems: 'center', paddingTop: 10 }}>
          <FlatList
            numColumns={3}
            data={this.props.categories.slice(0, 12)}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }} >
          <Button onPress={this.onOkPress}>
            <Text>
              {I18n.t('common.ok')}
            </Text>
          </Button>
        </View>

      </SafeAreaView>
    );
  }
}


const styles = {
  okButton: {
    borderRadius: 5,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default connect(null, {})(CategoryGridScreen);
