import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import UnderConstruction from './pages/UnderConstruction'
import './pages/construction.css'

function HomePage() {

  return (
    <>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UnderConstruction />} />
        <Route path="/app" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
