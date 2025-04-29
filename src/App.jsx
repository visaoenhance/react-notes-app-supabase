import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NoteEditor from './components/NoteEditor';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>React Notes App (Demo Mode)</h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard"
            element={ <Dashboard /> }
          />
          <Route 
            path="/note/:id" 
            element={ <NoteEditor /> }
          />
          <Route 
            path="/"
            element={ <Navigate to="/login" replace /> }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
