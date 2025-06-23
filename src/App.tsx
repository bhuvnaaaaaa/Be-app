import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthGuard from './components/AuthGuard'
import Home from './pages/Home'
import Journal from './pages/Journal'
import Meditations from './pages/Meditations'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Navigation from './components/Navigation'

function App() {
  return (
    <Router>
      <div className="min-h-screen relative">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <AuthGuard>
              <Home />
              <Navigation />
            </AuthGuard>
          } />
          <Route path="/journal" element={
            <AuthGuard>
              <Journal />
              <Navigation />
            </AuthGuard>
          } />
          <Route path="/meditations" element={
            <AuthGuard>
              <Meditations />
              <Navigation />
            </AuthGuard>
          } />
          <Route path="/profile" element={
            <AuthGuard>
              <Profile />
              <Navigation />
            </AuthGuard>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App