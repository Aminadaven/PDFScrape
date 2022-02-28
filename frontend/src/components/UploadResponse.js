import React from 'react'
import Alert from 'react-bootstrap/Alert'

const UploadResponse = ({ response, status, close }) => {
  if (status === 200) {
    return (
      <Alert variant='success' onClose={() => close()} dismissible>
        <Alert.Heading>Success!</Alert.Heading>
        <p>{response}</p>
      </Alert>
    )
  } else {
    return (
      <Alert variant='danger' onClose={() => close()} dismissible>
        <Alert.Heading>Oh snap! You got an error! {isError} </Alert.Heading>
        <p>{response}</p>
      </Alert>
    )
  }
}

export default UploadResponse
