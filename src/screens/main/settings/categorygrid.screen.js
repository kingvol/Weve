import React from 'react';
import { SafeAreaView, Text, FlatList, TouchableOpacity, Dimensions, View, Button } from 'react-native';
import { connect } from 'react-redux';
import images from '../../../images';
import FastImage from 'react-native-fast-image';
import CategorySelectItem from '../../../components/settings/CategorySelectItem';
import I18n from '../../../locales'


// "key_" + categorty id( from backend ) = key for image lookup
const CatImages = {
  key_5ae9ba16c2ccda00b752b718: images.venue,
  key_5ae9ba16c2ccda00b752b71a: images.photo,
  key_5ae9ba16c2ccda00b752b71c: images.ent,
  key_5ae9ba16c2ccda00b752b71d: images.make_up,
  key_5ae9ba16c2ccda00b752b71f: images.decoration,
  key_5ae9ba16c2ccda00b752b720: images.cake,
  key_5ae9ba16c2ccda00b752b71e: images.costume,
  key_5ae9ba16c2ccda00b752b71b: images.catering,
  key_5b5c2f35a4a01374a3d1d74a: images.transport,
  key_5bc7be2e58c2de53fff805aa: images.jewelry,
  key_5bc7be2e58c2de53fff805ab: images.stationary,
  key_5bc7be2e58c2de53fff805ac: images.honeymoon,
};

class CategoryGridScreen extends React.Component {
  componentWillMount() {
    this.gridItemWidth = (Dimensions.get('window').width - 90) / 3;
  }

  keyExtractor = (item, index) => index ;

  renderItem = ({ item }) => {
    const image = CatImages[`key_${item._id}`];

    return (
      <CategorySelectItem image={image} name={item.name} />
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>

        <View style={{ alignItems: 'center', paddingTop:10}}>
          <FlatList
            numColumns={3}
            data={this.props.categories.slice(0, 12)}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={styles.okButton}>
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>
              {I18n.t('common.ok')}
            </Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    );
  }
}


const styles = {
  okButton: {
    width: 200,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#FF0000',
    justifyContent:'center',
    alignItems:'center'
  },
};


export default connect(null, {})(CategoryGridScreen);
