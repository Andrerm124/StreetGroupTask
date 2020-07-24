import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

// eslint-disable-next-line import/prefer-default-export
export const fetchBankHolidays = async ({ cancelTokenSource } = {}) => {
  const response = await axios.get('https://www.gov.uk/bank-holidays.json', {
    cancelToken: cancelTokenSource?.token,
  });

  const dateRangeLowerBounds = moment().subtract(1, 'days');
  const dateRangeHigherBounds = moment().add(6, 'months').add(1, 'days');

  const filterWithin6Months = ({ date }) =>
    moment(date).isBetween(dateRangeLowerBounds, dateRangeHigherBounds);

  return _.chain(response.data)
    .flatMap('events')
    .filter(filterWithin6Months)
    .uniqBy((event) => event.title + event.date)
    .sortBy((event) => event.date)
    .take(5)
    .value();
};
