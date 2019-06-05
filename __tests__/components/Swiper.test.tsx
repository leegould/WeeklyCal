import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import Swiper from '../../src/components/Swiper';

jest.useFakeTimers();

test('renders correctly with expected args', () => {
    const props = {
        navigation: {
            navigate: () => {},
        },
        options: {
            resetDate: false,
            eventColor: false,
            dayAddLink: false,
            rollingWeek: false,
            inlineAdd: false,
            eventRowBorder: false,
        },
        data: {
            isFetching: false,
            week: {
                days: [
                    {
                        date: moment('25/12/2005', 'DD/MM/YYYY').toDate(),
                        events: [],
                    },
                    {
                        date: moment('26/12/2005', 'DD/MM/YYYY').toDate(),
                        events: [],
                    },
                    {
                        date: moment('27/12/2005', 'DD/MM/YYYY').toDate(),
                        events: [],
                    },
                    {
                        date: moment('28/12/2005', 'DD/MM/YYYY').toDate(),
                        events: [],
                    },
                    {
                        date: moment('29/12/2005', 'DD/MM/YYYY').toDate(),
                        events: [],
                    },
                    {
                        date: moment('30/12/2005', 'DD/MM/YYYY').toDate(),
                        events: [],
                    },
                    {
                        date: moment('31/12/2005', 'DD/MM/YYYY').toDate(),
                        events: [],
                    },
                ],
            },
            calendars: {
                showAll: false,
                selectedCalendars: [],
                rollingWeek: false,
                inlineAdd: false,
                eventRowBorder: false,
            }
        },
        onChangeDate: () => {},
        onAddEvent: () => {},
    }

    const tree = renderer.create(
        <Swiper {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
