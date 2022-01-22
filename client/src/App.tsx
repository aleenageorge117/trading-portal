import React from 'react';
import { HashRouter as Router } from "react-router-dom";

//COMPONENTS
import SiteLayout from './containers/SiteLayout/SiteLayout';

// SCSS
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <SiteLayout></SiteLayout>
      </Router>
    </div>
  );
}

export default App;
