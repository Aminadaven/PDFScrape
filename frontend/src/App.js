import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'

import './App.css'

import UploadFile from './components/UploadFile'
import ErrorBoundary from './components/ErrorBoundary'
import Files from './components/Files'
import UploadResponse from './components/UploadResponse'

export default class App extends Component {
  _isMounted = false

  constructor (props) {
    super(props)
    this.state = { uploadResponse: null }
  }

  componentDidMount () {
    this._isMounted = true
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  close () {
    if (this._isMounted) {
      this.setState({ uploadResponse: null })
    }
  }

  updateStatus (response, status) {
    if (this._isMounted) {
      this.setState({
        uploadResponse: (
          <UploadResponse
            response={response}
            status={status}
            close={this.close.bind(this)}
          />
        )
      })
    }
  }

  render () {
    return (
      <Container className='p-3'>
        <Container className='p-5 mb-4 bg-light rounded-3'>
          <h1 className='header'>PDF - Scrape</h1>
          <ErrorBoundary>
            {this.state.uploadResponse}
            <UploadFile updateStatus={this.updateStatus.bind(this)} />
            <Files />
          </ErrorBoundary>
        </Container>
      </Container>
    )
  }
}
