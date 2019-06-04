import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import { Event } from '../../src/components/Event'; // Get the one without the mapped props.
import { CalendarEvent } from '../../src/types';

jest.useFakeTimers();

test('renders correctly with expected args', () => {
    const props = {
        navigation: {
            getParam: () => {},
            goBack: () => {},
        },
        onAddEvent: () => {},
        onEditEvent: () => {},
        onDeleteEvent: () => {},
        date: moment('25/12/2005', 'DD/MM/YYYY'),
        event: {
            // id: '123',
            startDate: moment('25/12/2005', 'DD/MM/YYYY').toDate(),
            endDate: moment('25/12/2005', 'DD/MM/YYYY').toDate(),
            allDay: true,
            title: 'test',
        } as CalendarEvent,
    }

    const tree = renderer.create(
        <Event 
            navigation={props.navigation}
            onAddEvent={props.onAddEvent}
            onEditEvent={props.onEditEvent}
            onDeleteEvent={props.onDeleteEvent}
            date={props.date}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
