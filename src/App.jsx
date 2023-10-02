import { Button, Container } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Container maxW="700px">
      <Routes>
        <Route path="/:username" element={<userPage />}/>
      </Routes>
    </Container>
  )
}

export default App