import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import images from '../../images';

class CategorySelectItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: props.selected };
  }

  onToggle = () => {
    this.props.toggleCategory(this.props.catId);
    if (this.state.selected === false) {
      this.setState({ selected: !this.state.selected });
    } else {
      this.setState({ selected: !this.state.selected });
    }
  };

  render() {
    const tickImage = this.state.selected ? images.tick_active : images.tick_blank;

    return (
      <TouchableOpacity style={{ marginBottom: 5 }} onPress={() => this.onToggle()}>
        <View style={{ padding: 15, paddingBottom: 5 }}>
          <FastImage
            source={this.props.image}
            style={{ width: 65, height: 65, marginBottom: 3, alignSelf: 'center' }}
          />
          <View style={styles.imageCoverContainer}>
            <FastImage source={tickImage} style={{ height: 14, width: 14 }} />
          </View>
        </View>
        <Text style={{ alignSelf: 'center' }}>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  imageCoverContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'flex-end',
    padding: 5,
  },
};

export default CategorySelectItem;
