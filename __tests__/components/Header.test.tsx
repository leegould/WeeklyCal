import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../src/components/Header';
import moment from 'moment';

test('renders correctly with expected args', () => {
    const props = {
        navigation: {
            navigate: () => {},
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
        options: {
            resetDate: false,
            eventColor: false,
            dayAddLink: false,
            rollingWeek: false,
            inlineAdd: false,
            eventRowBorder: false,
        },
        onChangeDate: () => {},
    }

    const tree = renderer.create(
        <Header {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
