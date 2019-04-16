import { isEmpty } from 'lodash';

const getActivePersonDisplayInfo = (people, activePerson) => {
  const person = formatPersonData(
    people.filter(person => person.id === activePerson)
  );
  return isEmpty(person) ? null : person[0].name;
};

const formatPersonData = people =>
  people.map(person => {
    const { firstName, lastName, id } = person;
    return { id, name: lastName + ', ' + firstName };
  });

const getActivePetDisplayInfo = (pets, activeOwnerId, activePetId) => {
  const pet = formatPetData(pets, activeOwnerId).filter(
    pet => pet.id === activePetId
  );
  return isEmpty(pet) ? null : pet[0].name;
};

const formatPetData = (petsByOwner, activeOwner) => {
  const cleanArray = [];
  if (isEmpty(petsByOwner) || !activeOwner) {
    return [];
  } else {
    // need another check in the case data hasnt returned
    const pets = petsByOwner[activeOwner];
    if (pets) {
      Object.values(pets).forEach(pet => {
        const { name, id } = pet;
        cleanArray.push({ name, id });
      });
    }
    return cleanArray;
  }
};

export {
  getActivePersonDisplayInfo,
  formatPersonData,
  getActivePetDisplayInfo,
  formatPetData
};
