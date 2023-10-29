import { Button, Container } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'

const App = () => {
  return (
    <Container maxW="700px">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/auth" element={<AuthPage />}/>
        <Route path="/:username" element={<UserPage />}/>
        <Route path="/:username/post/:pid" element={<PostPage />}/>
      </Routes>
    </Container>
  )
}

export default App