/**
 * @providesModule NavigationUtils
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons';
import { primaryFont, appColor as backgroundColor, titleColor } from '../../theme';
import { baseStyles } from '../../components/common/styles';

const styles = StyleSheet.create({
  ...baseStyles,
  badge: {
    paddingHorizontal: 3,
    height: 13,
    backgroundColor: 'orange',
    borderRadius: 6,
    position: 'absolute',
    marginTop: 10,
  },
});

export const getDrawerIcon = (iconName, tintColor, label) => {
  const icon = <Icon name={iconName} size={20} color={tintColor} />;
  return label ? (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          position: 'absolute',
          zIndex: 1,
        }}
      >
        <View
          warning
          style={[
            styles.badge,
            {
              marginLeft: 25 - 5 * label.toString().length,
            },
          ]}
        >
          <Text style={{ color: 'black', fontSize: 9 }}>{label}</Text>
        </View>
      </View>
      {icon}
    </View>
  ) : (
    icon
  );
};

export const getNavigationOptions = (options) => {
  const { title, icon, gesturesEnabled = false } = options;

  return {
    ...options,
    title,
    headerBackTitle: null,
    headerStyle: { backgroundColor },
    headerTitleStyle: {
      color: titleColor,
      ...primaryFont,
    },
    headerTintColor: titleColor,
    drawerLabel: title,
    tabBarIcon: icon,
    gesturesEnabled,
  };
};
