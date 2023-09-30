import React, { useState, useEffect } from 'react';
import HistoricStream from '../components/HistoricStream';
import LiveStream from '../components/LiveStream';

const Leaderboard = () => {


  return (
    <div>
      <h1>Historic Data</h1>
      <HistoricStream />
      <hr />
      <h1>Live Data</h1>
      <LiveStream />
    </div>
  );
};

export default Leaderboard;
