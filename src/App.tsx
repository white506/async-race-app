import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Garage from './pages/Garage';
import Winners from './pages/Winners';
import Layout from './components/Layout';

const App = () => {
  return (
    <Router basename="/async-race-app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="garage" element={<Garage />} />
          <Route path="winners" element={<Winners />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;