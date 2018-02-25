import React from 'react';
import { View } from 'react-native';
import { Label, Input } from 'native-base';
import Color from 'color';
import { Row } from 'react-native-easy-grid';
import { primaryFont, lightTextColor, black } from '../../Theme';

const EditProfileField = (props) => {
  const {
    input, id, disabled = false, label,
    secureTextEntry, autoCapitalize = 'none', // type,
    color = black,
    meta: {
      active, // touched, error, warning
    },
  } = props;

  return (
    <View>
      <Row>
        <Label style={{ fontSize: 14, marginLeft: 5, ...primaryFont }}>{label}</Label>
      </Row>
      <Row>
        <Input
          id={id}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          {...input}
          style={{ height: 40, ...primaryFont }}
          disabled={disabled}
          selectionColor={Color(color).alpha(0.5).toString()}
        />
      </Row>
      <Row style={{ backgroundColor: active ? 'red' : lightTextColor, height: 1, marginBottom: 10 }} />
    </View>
  );
};

export { EditProfileField };
