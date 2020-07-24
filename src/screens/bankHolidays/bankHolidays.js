import moment from 'moment';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FlatList, Text, View } from 'react-native';
import { H1, Spinner } from 'native-base';

import { fetchBankHolidays } from '../../api/bankHolidaysApi';
import HeaderLogo from '../../components/Display/HeaderLogo';
import ScreenContainer from '../../components/Display/ScreenContainer';
import bankHolidaysStyle from './bankHolidaysStyle';

const cancelToken = axios.CancelToken;

const holidayKeyExtractor = ({ title, date }) => title + date;

const BankHolidays = () => {
  const [loading, setLoading] = useState(false);
  const [bankHolidays, setBankHolidays] = useState([]);

  useEffect(() => {
    setLoading(true);

    const cancelTokenSource = cancelToken.source();

    (async () => {
      try {
        const latestBankHolidays = await fetchBankHolidays({ cancelTokenSource });
        setBankHolidays(latestBankHolidays);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      cancelTokenSource.cancel();
    };
  }, []);

  const renderHoliday = (item) => {
    const { item: event, index } = item;

    return (
      <View
        style={[
          bankHolidaysStyle.holidayRowContainer,
          index === 0 && bankHolidaysStyle.holidayRowContainerTop,
        ]}
      >
        <Text style={bankHolidaysStyle.holidayRowTitle}>{event.title}</Text>

        <Text> - </Text>

        <Text style={bankHolidaysStyle.holidayRowDate}>
          {moment(event.date).format('dddd, Do MMMM YYYY')}
        </Text>
      </View>
    );
  };

  return (
    <ScreenContainer showHeader title={<HeaderLogo />}>
      <H1 style={bankHolidaysStyle.header}>Bank Holidays</H1>
      <View style={bankHolidaysStyle.divider} />

      {!!loading && <Spinner accessibilityLabel='Loading Bank Holidays' style={{ flex: 1 }} />}

      {!loading && (
        <FlatList
          data={bankHolidays}
          renderItem={renderHoliday}
          keyExtractor={holidayKeyExtractor}
        />
      )}
    </ScreenContainer>
  );
};

export default BankHolidays;
