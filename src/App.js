import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Container from 'react-bootstrap/Container'


import { parseShc } from './modules/parsers'
import MainPage from './pages/MainPage'
import AboutPage from './pages/AboutPage'
import Navigation from './components/Navigation';

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: undefined,
      lastText: '',
      tabKey: 'text'
    }
  }

  handleShc = async (data) => {
    if (data && data.startsWith('shc:/')) {
      var parsed = await parseShc(data)
      this.setState({ data: parsed, lastText: data, tabKey: 'info' })
    }
  }

  handlePasteSubmit = (event) => {
    this.handleShc(event.target[0].value);
    event.preventDefault();
  }

  render() {
    return (
      <Router>
        <Navigation />

        <Container className="mt-8 p-2 mx-auto" style={{ maxWidth: 600 }}>
          <Switch>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/">
              <MainPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
