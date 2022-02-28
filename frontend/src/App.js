import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'

import './App.css'

import UploadFile from './components/UploadFile'
import Files from './components/Files'
import UploadResponse from './components/UploadResponse'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = { uploadResponse: null }
  }
  
  close() {
    this.setState({ uploadResponse: null })
  }

  updateStatus (response, status) {
    this.setState({
        uploadResponse: <UploadResponse response={response} status={status} close={this.close.bind(this)} />
    })
  }

  render () {
    return (
      <Container className='p-3'>
        <Container className='p-5 mb-4 bg-light rounded-3'>
          <h1 className='header'>PDF - Scrape</h1>
          {/* {this.state.uploadResponse} */}
          <UploadFile updateStatus={this.updateStatus.bind(this)} />
          <Files />
        </Container>
      </Container>
    )
  }
}
