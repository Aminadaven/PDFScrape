import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const leastExponentOf = (num, base, startValue = 0) => {
    let exponent = startValue;
    while (num > base ** exponent) {
        exponent++;
    }
    return exponent;
}

const sizeInUnits = (size) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const exponent = leastExponentOf(size, 1024, 1);
    return size / (1024 ** exponent) + ' ' + sizes[exponent - 1];
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
