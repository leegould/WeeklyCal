import React from 'react';
import renderer from 'react-test-renderer';
import InlineEvent from '../../src/components/InlineEvent';

test('renders correctly with expected args', () => {
    const props = {
        date: new Date(),
        onAddEvent: () => {},
    }

    const tree = renderer.create(
        <InlineEvent {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
