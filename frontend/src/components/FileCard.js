import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const FileCard = ({ file }) => (
  <Card>
    <Card.Header>{file.name}</Card.Header>
    <Card.Body>
      <Card.Text>Size: {file.size / 1024} KBs.</Card.Text>
      <Button href={file.url}>Download Excel File</Button>
    </Card.Body>
  </Card>
)

export default FileCard
