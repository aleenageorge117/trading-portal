import { HashRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

//COMPONENTS
import SiteLayout from './containers/SiteLayout/SiteLayout';
import Modal from 'react-bootstrap/Modal';
import React, { ReactEventHandler, useEffect, useState } from 'react';

// SCSS
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    console.log('\setIsOpen(true)')
    setIsOpen(true);
};

const hideModal = () => {
    setIsOpen(false);
};

  return (
    <div className="App">
      <Router>
        <SiteLayout></SiteLayout>
      </Router>
      <ToastContainer />
      <button onClick={() => showModal}>btttttttttttttttttttttttttttton</button>
      <Modal show={isOpen} onHide={hideModal}>
            <Modal.Header>
            <Modal.Title>Hi</Modal.Title>
            </Modal.Header>
            <Modal.Body>The body</Modal.Body>
            <Modal.Footer>
            <button onClick={hideModal}>Cancel</button>
            <button>Save</button>
            </Modal.Footer>
        </Modal>
    </div>
  );
}

export default App;
