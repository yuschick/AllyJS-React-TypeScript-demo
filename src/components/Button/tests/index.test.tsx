import { shallow } from 'enzyme';
import * as React from 'react';

import Button from '../';

describe('<Button />', () => {

  test('displays without errors', () => {
    const wrapper = shallow(
      <Button
        type="primary"
        clickHandler={jest.fn()}
        msg="Save"
      />
    );
    expect(wrapper).toBeTruthy();
  });

});
