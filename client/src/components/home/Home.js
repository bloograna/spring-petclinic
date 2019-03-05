import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardDeck } from 'react-bootstrap';

const buildCardDeck = (text, onClick) => (
  <CardDeck>
    <Card border="secondary" style={{ width: '18rem' }} onClick={onClick}>
      <Card.Body>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  </CardDeck>
);

const Home = ({ onAddOwner, onAddVet, onAddVisit }) => (
  <React.Fragment>
    <p> what would you like to do today?</p>
    {buildCardDeck('Add an owner', onAddOwner)}
    {buildCardDeck('Add a vet', onAddVet)}
    {buildCardDeck('Schedule an apointment', onAddVisit)}
  </React.Fragment>
);

Home.propTypes = {
  onAddOwner: PropTypes.func.isRequired,
  onAddVet: PropTypes.func.isRequired,
  onAddVisit: PropTypes.func.isRequired
};

export default Home;
