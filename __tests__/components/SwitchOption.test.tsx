import React from 'react';
import renderer from 'react-test-renderer';
import SwitchOption from '../../src/components/SwitchOption';

jest.useFakeTimers();

test('renders correctly with expected args', () => {
    const props = {
        title: 'string',
        subtitle: 'string',
        value: false,
        onValueChange: () => {},
        trackColor: 'string',
    }

    const tree = renderer.create(
        <SwitchOption {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
