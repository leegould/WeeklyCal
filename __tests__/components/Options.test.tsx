import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import { Options } from '../../src/components/Options';

jest.useFakeTimers();

test('renders correctly with expected args', () => {
    const props = {
        navigation: {
            getParam: () => {},
            navigate: () => {},
        },
        date: moment('25/12/2005', 'DD/MM/YYYY'),
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
            showAll: true,
            allCalendars: [],
            selectedCalendars: [],
        },
        onFetchCalendars: () => {},
        onChangeDate: () => {},
        onToggleShowAllAndUpdateWeek: () => {},
        onToggleCalendarAndUpdateWeek: () => {},
        onToggleResetDateOption: () => {},
        onToggleEventColorOptionAndUpdateWeek: () => {},
        onToggleDayAddLinkAndUpdateWeek: () => {},
        onToggleRollingWeekAndUpdateWeek: () => {},
        onToggleInlineAddAndUpdateWeek: () => {},
        onToggleEventRowBorderAndUpdateWeek: () => {},
    }

    const tree = renderer.create(
        <Options {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
