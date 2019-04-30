import React from 'react';

const style = {
  width: 'calc(vw)',
  height: 'calc(vh)'
};

const imgStyle = {
  width: '30%',
  height: '30%'
};

const Home = () => (
  <div style={style}>
    <img src="rocky.jpg" alt="Rocky Bernhardt..Dog Tax" style={imgStyle} />
  </div>
);

export default Home;
