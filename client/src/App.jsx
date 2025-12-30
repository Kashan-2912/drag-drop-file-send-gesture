import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GrabPage from './pages/GrabPage'
import DropPage from './pages/DropPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GrabPage />} />
        <Route path="/about" element={<DropPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App