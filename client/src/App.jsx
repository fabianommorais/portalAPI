import React, { useState } from 'react';
import ApiTester from './components/ApiTester';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <h1>Portal de Integração de APIs</h1>
      <ApiTester />
    </div>
  );
}

export default App;
