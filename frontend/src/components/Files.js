import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import FileCard from './FileCard'

export default class Files extends Component {
  constructor (props) {
    super(props)
    this.state = {
      files: []
    }
  }

  componentDidMount () {
    fetch('http://localhost:8080/files')
      .then(response => response.json())
      .then(files => this.setState({ files }))
  }

  render () {
    return (
      <ListGroup variant='flush'>
        {this.state.files.map(file => (
          <ListGroup.Item key={file.id}>
            <FileCard key={file.id} file={file} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }
}
