import React from 'react'
import Alert from 'react-bootstrap/Alert'

const UploadResponse = ({ response, isError }) => {
  if (isError === null) {
    return <></>
  } else if (isError === true || isError === undefined) {
    return (
      <Alert variant='danger' dismissible>
        <Alert.Heading>Oh snap! You got an error! {isError} </Alert.Heading>
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
