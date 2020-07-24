import React from 'react';
import { render, waitFor } from 'react-native-testing-library';
import * as bankHolidaysApi from '../../../api/bankHolidaysApi';
import BankHolidays from '../bankHolidays';

let mockFetchBankHolidays;

beforeEach(() => {
  mockFetchBankHolidays = jest.spyOn(bankHolidaysApi, 'fetchBankHolidays').mockImplementation();
  mockFetchBankHolidays.mockResolvedValue({});
});

describe('bankHolidays', () => {
  it('renders the title', async () => {
    const { getByText } = render(<BankHolidays />);

    await waitFor(() => getByText('Map'));
  });

  it('shows a loading spinner when loading', async () => {
    // Don't resolve the promise
    mockFetchBankHolidays.mockImplementation(() => new Promise(() => {}));

    const { getByA11yLabel } = render(<BankHolidays />);

    await waitFor(() => getByA11yLabel('Loading Bank Holidays'));
  });

  it('shows a list of bank holidays when the api has fetched them', async () => {
    const bankHolidays = [
      { title: 'Bank Holiday 1', date: '2020-01-01' },
      { title: 'Bank Holiday 2', date: '2020-01-02' },
      { title: 'Bank Holiday 3', date: '2020-02-03' },
      { title: 'Bank Holiday 4', date: '2020-04-05' },
    ];
    mockFetchBankHolidays.mockResolvedValue(bankHolidays);

    const { getByText } = render(<BankHolidays />);

    await waitFor(() => getByText('Bank Holiday 1'));
    getByText('Bank Holiday 2');
    getByText('Bank Holiday 3');
    getByText('Bank Holiday 4');

    getByText('Wednesday, 1st January 2020');
    getByText('Thursday, 2nd January 2020');
    getByText('Monday, 3rd February 2020');
    getByText('Sunday, 5th April 2020');
  });
});
