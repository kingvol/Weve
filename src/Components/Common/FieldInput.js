import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Input, Text } from 'native-base';
import { primaryFont, lightTextColor } from '../../Theme';
// import Icon from 'react-native-vector-icons/FontAwesome'
import Color from 'color';

class FieldInput extends PureComponent {
  constructor(props) {
    super(props);
    this.switchSecure = this.switchSecure.bind(this);
    this.state = {
      secureVisible: false,
    };
  }

  switchSecure() {
    this.setState({ secureVisible: !this.state.secureVisible });
  }

  render() {
    const {
      input, id, label, placeholder, color = lightTextColor,
      secureTextEntry, autoCapitalize = 'none', type,
      meta: { touched, error, warning },
    } = this.props;

    const isError = !!(touched && error);

    const secure = secureTextEntry ? !this.state.secureVisible : false;

    return (
      <View style={{ height: 80 }}>
        <Text style={{ color, ...primaryFont }}>{placeholder}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Input
            id={id}
            style={{ color, ...primaryFont }}
            secureTextEntry={secure}
            autoCapitalize={autoCapitalize}
            {...input}
            selectionColor={Color(color).alpha(0.5).toString()}
          />
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            bottom: 2,
            flex: 0,
          }}
          >
            {isError && <Text style={{ color, fontSize: 14, paddingHorizontal: 5 }}>{error}</Text>}
            {secureTextEntry && (
              <TouchableOpacity onPress={this.switchSecure}>
                {/* <Icon style={{color}} size={24} name={secure ? 'eye-slash' : 'eye'}/> */}
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{ borderBottomColor: `${isError ? 'red' : color}`, borderBottomWidth: 1, bottom: 12 }} />
      </View>
    );
  }
}

export { FieldInput };
