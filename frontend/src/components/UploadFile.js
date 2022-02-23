import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//import UploadResponse from './UploadResponse'

export default class UploadFile extends Component {
//  constructor (props) {
//    super(props)
//    this.state = {
//      response: null,
//      isError: null,
//      uploadResponse: null
//    }
//  }

  // componentDidMount () {
  //   if (this.state.response != null && this.state.isError != null) {
  //     this.setState(state => {
  //       // Important: read `state` instead of `this.state` when updating.
  //       return { uploadResponse: <UploadResponse response={state.response} isError={state.isError} /> }
  //     })
  //   }
  // }

  handleSubmit (e) {
    e.preventDefault()

    const formdata = new FormData()
    formdata.append(
      'file',
      e.target.formFile.files[0],
      e.target.formFile.files[0].name
    )

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    }

    fetch(`http://${process.env.BACKEND_HOST || 'localhost'}:8080/files`, requestOptions)
      .then(response => response.text())
//      .then(text => this.setState({ response: text, isError: false }))
       .then(result => console.log(result))
       .then(() => window.location.reload())
       .catch(error => console.error('error', error))
//      .catch(error => this.setState({ response: error, isError: true }))

//      this.setState(state => {
        // Important: read `state` instead of `this.state` when updating.
//        return { uploadResponse: <UploadResponse response={state.response} isError={state.isError} /> }
//      })
  }

//        {this.state.uploadResponse}
  render () {
    return (
      <>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group controlId='formFile' name='formFile' className='mb-3'>
            <Form.Label>Choose a file to upload</Form.Label>
            <Form.Control type='file' />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </>
    )
  }
}
