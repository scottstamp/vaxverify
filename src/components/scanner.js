import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

class Scanner extends Component {
  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    const previewStyle = {
        height: 320,
        width: 320,
      }

    return (
      <div>
        <QrReader
          style={previewStyle}
          onScan={this.handleScan}
          onError={this.handleError}
          showViewFinder={false}
          delay={100}
          />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

export default Scanner;