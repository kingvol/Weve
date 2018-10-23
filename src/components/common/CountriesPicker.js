/* eslint-disable no-underscore-dangle, camelcase */
import React, { PureComponent } from 'react';
import countryLib from '../../countryLib';
import I18n from '../../locales';
import { lightTextColor } from '../../theme';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { View, Dimensions, Platform, Text } from 'react-native';
import { Picker } from 'native-base';
import emojiFlags from 'emoji-flags';
import Icon from 'react-native-vector-icons/MaterialIcons';

const excludeCountries = [
  'AD',
  'AQ',
  'BV',
  'VG',
  'CW',
  'XK',
  'ME',
  'PS',
  'BL',
  'MF',
  'RS',
  'SX',
  'TC',
  'UM',
  'VI',
  'VA',
  'AX',
];

const styleSheet = {
  textColor: '#848787',
  chipBorderColor: '#f3c200',
  backgroundColor: '#f5f5f5',
  backgroundButton: '#d64635',
  labelColor: lightTextColor,
  selectedTextColor: '#848787',
  selectOffset: 20,
};

class CountriesPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      selectedItems: props.selectedCountries,
    };
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
    this.props.onCountrySelect(selectedItems);
  };

  showRegionSelector = () => {
    const countries = this.state.selectedItems;
    if (countries.length === 1) return countryLib[`${countries[0]}`];
    return false;
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedCountries !== this.state.selectedItems &&
      nextProps.selectedRegion !== this.state.selectedRegion
    ) {
      this.setState({ selectedItems: nextProps.selectedCountries });
    }
  }

  componentWillMount() {
    const countries = Object.keys(countryLib).map((key) => {
      if (!excludeCountries[key]) {
        let name = countryLib[key].name;
        const flag = emojiFlags.countryCode(key);
        if (flag) {
          name = `${flag.emoji} ${name}`;
        }
        return {
          name,
          id: key,
        };
      }
    });
    this.setState({ countries });
    if (this.props.styles) {
      styles = this.props.styles;
    } else {
      styles = styleSheet;
    }
  }

  render() {
    const region = this.showRegionSelector();
    return (
      <View>
        <Text style={{ flex: 1, color: styles.labelColor, paddingBottom: 10 }}>
          {`${I18n.t('editProfile.country')}`}
        </Text>
        <SectionedMultiSelect
          items={this.state.countries}
          uniqueKey="id"
          subKey="children"
          selectText="Select country"
          showDropDowns={false}
          single={this.props.single || false}
          showCancelButton
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          showChips={this.props.readOnly || this.state.selectedItems.length !== 1}
          hideSelect={this.props.readOnly}
          chipRemoveIconComponent={
            this.props.readOnly ? (
              <View
                style={{
                  marginHorizontal: 6,
                  marginVertical: 7,
                }}
              />
            ) : (
              <Icon
                name="close"
                style={{
                  color: '#848787',
                  fontSize: 16,
                  marginHorizontal: 6,
                  marginVertical: 7,
                }}
              />
            )
          }
          colors={{
            selectToggleTextColor: styles.selectedTextColor,
          }}
          styles={{
            button: {
              backgroundColor: styles.backgroundButton,
            },
            selectToggle: {
              width: Dimensions.get('screen').width - 40,
              backgroundColor: styles.backgroundColor,
              padding: 10,
            },
            chipContainer: {
              borderColor: styles.chipBorderColor,
              backgroundColor: '#fff',
              borderWidth: 2,
            },
            chipText: {
              maxWidth: Dimensions.get('screen').width,
            },
            itemText: {
              color: lightTextColor,
              fontWeight: 'normal',
              fontSize: 15,
            },
            subItemText: {
              color: styles.textColor,
            },
          }}
        />

        {region && (
          <View style={{ flex: 1 }}>
            <Text style={{ flex: 3, color: styles.labelColor, paddingTop: 10, paddingBottom: 10 }}>
              {`${I18n.t('editProfile.region')}`}
            </Text>
            <Picker
              enabled={!this.props.readOnly}
              mode="dropdown"
              style={{
                flex: 1,
                backgroundColor: styles.backgroundColor,
              }}
              itemTextStyle={{ color: styles.textColor }}
              placeholder={I18n.t('logIn.select_category')}
              selectedValue={this.props.selectedRegion}
              onValueChange={this.props.onRegionSelect}
              placeholderTextColor={styles.textColor}
              placeholderStyle={{ color: styles.textColor }}
              textStyle={{ color: styles.selectedTextColor }}
            >
              {region.provinces.map(item => <Picker.Item label={item} value={item} key={item} />)}
            </Picker>
          </View>
        )}
      </View>
    );
  }
}

export { CountriesPicker };
