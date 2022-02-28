import React from 'react'
import Alert from 'react-bootstrap/Alert'

function UploadResponse (props) {
  console.log(props)
  if (props.status === 200) {
    return (
      <Alert variant='success' onClose={props.close} dismissible>
        <Alert.Heading>Success!</Alert.Heading>
        <p>{props.response}</p>
      </Alert>
    )
  } else {
    return (
      <Alert variant='danger' onClose={props.close} dismissible>
        <Alert.Heading>
          There was an error. Code: {props.status}
        </Alert.Heading>
        <p>{props.response}</p>
      </Alert>
    )
  }
}

export default UploadResponse
