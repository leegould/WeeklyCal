import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import { Event } from '../../src/components/Event'; // Get the one without the mapped props.

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
    }

    const tree = renderer.create(
        <Event {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
