import React from 'react';
import { TestOwnersContainer } from './Owners.container';

describe('OwnersContainer render', () => {
  let props;
  let wrapper;
  let instance;
  let event;

  beforeEach(() => {
    props = {
      dispatch: action => action,
      searchResults: [],
      showAddOwnerModal: false,
      shouldValidateOwnerModalData: false,
      pets: [],
      petTypes: [],
      showAddPetModal: false,
      shouldValidatePetModalData: false,
      activePet: null,
      // actions
      searchByLastName: jest.fn(),
      openAddOwnerModal: jest.fn(),
      closeAddOwnerModal: jest.fn(),
      validateOwnerModalData: jest.fn(),
      saveOwner: jest.fn(),
      openAddPetModal: jest.fn(),
      closeAddPetModal: jest.fn(),
      setActivePet: jest.fn(),
      getPetsByOwner: jest.fn(),
      validatePetModalData: jest.fn(),
      savePet: jest.fn()
    };

    event = {
      target: {
        value: 'value'
      },
      preventDefault: jest.fn()
    };

    wrapper = shallow(<TestOwnersContainer {...props} />);
    instance = wrapper.instance();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders successfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('onSearch', () => {
    const { searchByLastName } = props;
    const lastName = 'lastName';
    const localEvent = {
      currentTarget: {
        form: [{ value: lastName }]
      }
    };

    instance.onSearch(localEvent);
    expect(searchByLastName).toHaveBeenCalledWith(lastName);
  });

  test('handleAddPetFormData should save when valid', () => {
    const { validatePetModalData, savePet } = props;
    const checkValidity = jest.fn();
    const localEvent = {
      currentTarget: {
        checkValidity: checkValidity
      }
    };

    checkValidity.mockReturnValue(true);

    const formObj = { value: 'foo' };

    instance.handleAddPetFormData(formObj, localEvent);
    expect(validatePetModalData).toHaveBeenCalled();
    expect(savePet).toHaveBeenCalledWith(formObj);
  });

  test('handleAddPetFormData should not save when invalid', () => {
    const { validatePetModalData, savePet } = props;
    const checkValidity = jest.fn();
    const localEvent = {
      currentTarget: {
        checkValidity: checkValidity
      }
    };

    checkValidity.mockReturnValue(false);

    const formObj = { value: 'foo' };

    instance.handleAddPetFormData(formObj, localEvent);
    expect(validatePetModalData).toHaveBeenCalled();
    expect(savePet).not.toHaveBeenCalled();
  });
});
