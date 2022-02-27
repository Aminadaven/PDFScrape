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

  updateStatus (response, isError) {
    this.setState({
        uploadResponse: <UploadResponse response={response} isError={isError} />
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
