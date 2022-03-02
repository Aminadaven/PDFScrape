import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const leastExponentOf = (num, base) => {
    let exponent = 0;
    while (num > base ** ++exponent) ;
    return --exponent;
}

const sizeInUnits = (size) => {
    const sizes = ['Bytes', 'KBs', 'MBs', 'GBs'];
    const exponent = leastExponentOf(size, 1024);
    return (size / (1024 ** exponent)).toFixed(2) + ' ' + sizes[exponent];
}

const FileCard = ({file}) => (
    <Card>
        <Card.Header>{file.name}</Card.Header>
        <Card.Body>
            <Card.Text>Size: {sizeInUnits(file.size)}.</Card.Text>
            <Button href={file.url}>Download Excel File</Button>
        </Card.Body>
    </Card>
)

export default FileCard
