import React from 'react'
import Alert from 'react-bootstrap/Alert'

const UploadResponse = ({ response, isError }) => {
  if (isError) {
    return (
      <Alert variant='danger' dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{response}</p>
      </Alert>
    )
  } else {
    return (
      <Alert variant='success'>
        <Alert.Heading>Success!</Alert.Heading>
        <p>{response}</p>
      </Alert>
    )
  }
}

export default UploadResponse
