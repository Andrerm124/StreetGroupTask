import axios from 'axios';
import mockdate from 'mockdate';

import { fetchBankHolidays } from '../bankHolidaysApi';

const events = {
  ValidEvent1: { title: 'ValidEvent1', date: '2020-01-10' },
  ValidEvent2: { title: 'ValidEvent2', date: '2020-01-11' },
  ValidEvent3: { title: 'ValidEvent3', date: '2020-01-12' },
  ValidEvent4: { title: 'ValidEvent4', date: '2020-01-13' },
  ValidEvent5: { title: 'ValidEvent5', date: '2020-06-10' },
  ValidEvent6: { title: 'ValidEvent6', date: '2020-06-10' },
  TooLateEvent1: { title: 'TooLateEvent1', date: '2020-07-11' },
  TooLateEvent2: { title: 'TooLateEvent2', date: '2020-08-01' },
  TooEarlyEvent1: { title: 'TooEarlyEvent1', date: '2020-01-09' },
  TooEarlyEvent2: { title: 'TooEarlyEvent2', date: '2019-12-02' },
};

describe('fetchBankHolidays', () => {
  let mockAxiosGet;

  beforeEach(() => {
    mockdate.set(new Date('2020-01-10'));

    mockAxiosGet = jest.spyOn(axios, 'get').mockImplementation();
  });

  it('fetches and returns the events of multiple locations', async () => {
    mockAxiosGet.mockResolvedValue({
      data: {
        location1: {
          events: [events.ValidEvent1, events.ValidEvent2],
        },
        location2: {
          events: [events.ValidEvent3, events.ValidEvent4],
        },
      },
    });

    const expectedEvents = [
      events.ValidEvent1,
      events.ValidEvent2,
      events.ValidEvent3,
      events.ValidEvent4,
    ];

    const response = await fetchBankHolidays();
    expect(response).toEqual(expectedEvents);
  });

  describe('filtering', () => {
    it('filters out events that are before today', async () => {
      mockAxiosGet.mockResolvedValue({
        data: {
          location1: {
            events: [events.ValidEvent1, events.TooEarlyEvent1],
          },
          location2: {
            events: [events.TooEarlyEvent2, events.ValidEvent3],
          },
        },
      });

      const expectedEvents = [events.ValidEvent1, events.ValidEvent3];

      const response = await fetchBankHolidays();
      expect(response).toEqual(expectedEvents);
    });

    it('filters out events that are after today', async () => {
      mockAxiosGet.mockResolvedValue({
        data: {
          location1: {
            events: [events.ValidEvent1, events.TooLateEvent1],
          },
          location2: {
            events: [events.TooLateEvent2, events.ValidEvent3],
          },
        },
      });

      const expectedEvents = [events.ValidEvent1, events.ValidEvent3];

      const response = await fetchBankHolidays();
      expect(response).toEqual(expectedEvents);
    });

    it('filters out duplicate events', async () => {
      mockAxiosGet.mockResolvedValue({
        data: {
          location1: {
            events: [events.ValidEvent1, events.ValidEvent2],
          },
          location2: {
            events: [events.ValidEvent3, events.ValidEvent2],
          },
        },
      });

      const expectedEvents = [events.ValidEvent1, events.ValidEvent2, events.ValidEvent3];

      const response = await fetchBankHolidays();
      expect(response).toEqual(expectedEvents);
    });
  });

  it('sorts events by their date', async () => {
    mockAxiosGet.mockResolvedValue({
      data: {
        location1: {
          events: [events.ValidEvent5, events.ValidEvent3],
        },
        location2: {
          events: [events.ValidEvent4, events.ValidEvent1],
        },
      },
    });

    const expectedEvents = [
      events.ValidEvent1,
      events.ValidEvent3,
      events.ValidEvent4,
      events.ValidEvent5,
    ];

    const response = await fetchBankHolidays();
    expect(response).toEqual(expectedEvents);
  });

  it('only returns the first 5 results', async () => {
    mockAxiosGet.mockResolvedValue({
      data: {
        location1: {
          events: [events.ValidEvent1, events.ValidEvent2, events.ValidEvent3],
        },
        location2: {
          events: [events.ValidEvent4, events.ValidEvent5, events.ValidEvent6],
        },
      },
    });

    const expectedEvents = [
      events.ValidEvent1,
      events.ValidEvent2,
      events.ValidEvent3,
      events.ValidEvent4,
      events.ValidEvent5,
    ];

    const response = await fetchBankHolidays();
    expect(response).toEqual(expectedEvents);
  });
});
