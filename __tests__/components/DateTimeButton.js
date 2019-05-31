import React from 'react';
import renderer from 'react-test-renderer';
import DateTimeButton from '../../src/components/DateTimeButton';
import moment from 'moment';

test('renders correctly with expected args', () => {

    const props = {
        date: moment(),
        showTime: false,
        onDateChanged: () => {},
    }

    const tree = renderer.create(<DateTimeButton {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
});
