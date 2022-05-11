import { HashRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

//COMPONENTS
import SiteLayout from './containers/SiteLayout/SiteLayout';

// SCSS
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="App">
      <Router>
        <SiteLayout></SiteLayout>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
