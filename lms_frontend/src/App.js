import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';
import { AuthProvider } from './store';
import { applyTheme } from './utils/theme';

// PUBLIC_INTERFACE
function App() {
  useEffect(() => {
    applyTheme();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
