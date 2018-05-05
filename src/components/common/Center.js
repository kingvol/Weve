import React from 'react';
import { View } from 'react-native';

const Center = ({ style, children }) => (
  <View style={[style, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
    {children}
  </View>
);

export default Center;
