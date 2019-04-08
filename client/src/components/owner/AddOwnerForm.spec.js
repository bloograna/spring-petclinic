import React from 'react';
import AddOwnerForm from './AddOwnerForm';

describe('AddOwnerForm', () => {
  test('render AddOwnerForm', () => {
    const props = {
      formValidated: true,
      onAddButtonClick: jest.fn(),
      onHideAddOwnerModal: jest.fn()
    };
    const form = shallow(<AddOwnerForm {...props} />);
    expect(form).toMatchSnapshot();
  });
});
