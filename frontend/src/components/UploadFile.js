import { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class UploadFile extends Component {
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
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: '*/*'
      },
      body: formdata,
      redirect: 'follow'
    }

    fetch(
      `http://${process.env.BACKEND_HOST || 'localhost'}:8080/files`,
      requestOptions
    )
      .then(response =>
        response
          .text()
          .then(data => this.props.updateStatus(data, response.status))
      )
      .catch(error => this.props.updateStatus(error, null))
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Group controlId='formFile' name='formFile' className='mb-3'>
          <Form.Label>Choose a file to upload</Form.Label>
          <Form.Control type='file' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    )
  }
}
