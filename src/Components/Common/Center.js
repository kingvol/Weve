import React from 'react';
import { View } from 'react-native';

function Center({ style, children }) {
  return (
    <View style={[style, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
      {children}
    </View>
  );
}

export default Center;
