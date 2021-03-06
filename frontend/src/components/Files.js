import {Component} from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import FileCard from './FileCard'

export default class Files extends Component {
    _isMounted = false

    constructor(props) {
        super(props)
        this.state = {
            files: []
        }
    }

    fetchFiles() {
        fetch(`http://${process.env.BACKEND_HOST || 'localhost'}:8080/files`)
            .then(response => response.json())
            .then(files => {
                if (this._isMounted) {
                    this.setState({files})
                }
            })
            .catch(error => this.props.updateStatus(error, null))
    }

    componentDidMount() {
        this._isMounted = true
        this.interval = setInterval(() => this.fetchFiles(), 500)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        this._isMounted = false
    }

    render() {
        return (
            <ListGroup variant='flush'>
                {this.state.files.map(file => (
                    <ListGroup.Item key={file.id}>
                        <FileCard key={file.id} file={file}/>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )
    }
}
