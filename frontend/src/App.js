import React from 'react'

import Container from 'react-bootstrap/Container'

import './App.css'

import UploadFile from './components/UploadFile'
import Files from './components/Files'

const App = () => (
  <Container className='p-3'>
    <Container className='p-5 mb-4 bg-light rounded-3'>
      <h1 className='header'>PDF - Scrape</h1>
      <UploadFile />
      <Files />
    </Container>
  </Container>
)

export default App
