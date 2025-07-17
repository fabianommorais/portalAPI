import React, { useState } from 'react';
import ApiTester from './components/ApiTester';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '1rem',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
      }}
    >
      <ApiTester />
    </div>
  );
}

export default App;
