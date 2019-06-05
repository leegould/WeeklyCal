import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import Day from '../../src/components/Day';

jest.useFakeTimers();

test('renders correctly with expected args', () => {
    const props = {
        navigation: {
            navigate: () => {},
        },
        onExpand: () => {},
        onAddEvent: () => {},
        date: moment('25/12/2005', 'DD/MM/YYYY'),
        isFetching: false,
        day: {
            date: moment('25/12/2005', 'DD/MM/YYYY').toDate(),
            events: [],
        },
        isToday: false,
        options: {
            resetDate: false,
            eventColor: false,
            dayAddLink: false,
            rollingWeek: false,
            inlineAdd: false,
            eventRowBorder: false,
        },
        expanded: false,
    }

    const tree = renderer.create(
        <Day {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
