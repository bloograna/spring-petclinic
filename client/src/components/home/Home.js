import React from 'react';
import PropTypes from 'prop-types';

const style = {
  width: 'calc(vw)',
  height: 'calc(vh)'
};

const imgStyle = {
  width: '30%',
  height: '30%'
};
const Home = ({ onAddOwner, onAddVet, onAddVisit }) => (
  <div style={style}>
    <img src="rocky.jpg" alt="Rocky Bernhardt..Dog Tax" style={imgStyle} />
  </div>
);

Home.propTypes = {
  onAddOwner: PropTypes.func.isRequired,
  onAddVet: PropTypes.func.isRequired,
  onAddVisit: PropTypes.func.isRequired
};

export default Home;
