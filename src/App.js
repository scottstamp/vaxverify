import React, { Component, useState } from 'react';
import ModalScan from './modals/scan';
import './App.css';

import Container from 'react-bootstrap/Container'
import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button'
import Scanner from './components/scanner';

const MODAL_SCAN = "modal_scan";
const DEFAULT_TITLE = "Cov";

const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(true);

  return (
    <>
      {!show && <Button onClick={() => toggleShow(true)}>Scan QR Code</Button>}
      <Toast className="m-auto" show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="m-auto">Scan QR Code</strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </>
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      title1: DEFAULT_TITLE,
      currentModal: null
    };
  }

  toggleModal = key => event => {
    event.preventDefault();
    if (this.state.currentModal) {
      this.handleModalCloseRequest();
      return;
    }
  
    this.setState({
      ...this.state,
      currentModal: key,
      title1: "Title"
    });
  }

  handleModalCloseRequest = () => {
    // opportunity to validate something and keep the modal open even if it
    // requested to be closed
    this.setState({
      ...this.state,
      currentModal: null
    });
  }

  handleInputChange = e => {
    let text = e.target.value;
    if (text === '') {
      text = DEFAULT_TITLE;
    }
    this.setState({ ...this.state, title1: text });
  }

  handleOnAfterOpenModal = () => {
    // when ready, we can access the available refs.
    this.heading && (this.heading.style.color = '#F00');
  }

  onScan = (data) => {
    console.log(data);
  }

  onError = (err) => {
    console.error(err);
  }

  render() {
    return (
      <div className="App">
        {/* <Container className="p-0">
            <Button type="button" className="btn btn-primary" onClick={this.toggleModal(MODAL_SCAN)}>Scan QR Code</Button>
        </Container> */}

        <ExampleToast>
          <Scanner />
        </ExampleToast>

        {/* <ModalScan 
          title="Scan QR Code"
          isOpen={this.state.currentModal === MODAL_SCAN}
          onAfterOpen={this.handleOnAfterOpenModal}
          onRequestClose={this.handleModalCloseRequest}
          askToClose={this.toggleModal(MODAL_SCAN)}
          onChangeInput={this.handleInputChange}
          /> */}
      </div>
    );
  }
}

export default App;
