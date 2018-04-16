import React from 'react';
import { View } from 'react-native';
import { Label } from 'native-base';
import { Col, Row } from 'react-native-easy-grid';
import CountryPicker from 'react-native-country-picker-modal';
import { primaryFont, primaryColor } from '../../theme';

const ProfileFieldForCountry = ({ icon, title, subTitle, id }) => {
  const noData = 'No data';
  return (
    <View id={id} style={{ marginHorizontal: 20 }}>
      <Row style={{ height: 80 }}>
        <Col style={{ justifyContent: 'center', alignItems: 'flex-start' }} size={15}>
          <CountryPicker onChange={() => {}} cca2={icon} disabled />
        </Col>
        <Col size={85} style={{ justifyContent: 'flex-end' }}>
          <Row style={{ alignItems: 'center' }}>
            <Label style={{ ...primaryFont }}>{title || noData}</Label>
          </Row>
          <Row style={{ paddingTop: 5 }}>
            <Label style={{ ...primaryFont, fontWeight: 'bold' }}>{subTitle || noData}</Label>
          </Row>
        </Col>
      </Row>
      <Row style={{ backgroundColor: primaryColor, height: 1 }} />
    </View>
  );
};

export { ProfileFieldForCountry };
