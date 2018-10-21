import React from 'react';
import { SafeAreaView, Text, FlatList, TouchableOpacity, Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import images from '../../../images';
import FastImage from 'react-native-fast-image';
import CategorySelectItem from '../../../components/settings/CategorySelectItem';



class CategoryGridScreen extends React.Component {
  componentWillMount() {
    console.log(this.props.categories);
    this.gridItemWidth = (Dimensions.get('window').width - 90) / 3;
  }

  keyExtractor = (item, index) => index ;

  renderItem = ({ item, index }) => {
    return (
      <CategorySelectItem image={images.costume} name={item.name} />
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex:1}}>

        <View style={{ alignItems:'center', flex:3}}>
          <FlatList
            numColumns={3}
            data={this.props.categories.slice(0,10)}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </View>

      </SafeAreaView>
    );
  }
}


export default connect(null, {})(CategoryGridScreen);
