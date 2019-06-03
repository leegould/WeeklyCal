import React from 'react';
import renderer from 'react-test-renderer';
import Event from '../../src/components/Event';

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
    }

    const tree = renderer.create(
        <Event {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
