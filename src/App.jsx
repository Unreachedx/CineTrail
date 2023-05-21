import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ThemeContextProvider from './contexts/ThemeContext'
import HomePage from './pages/HomePage/HomePage'


function App() {
  const apiKey = "08465c38c08edc9799de53e48d8f4492";
  const baseUrl = "https://api.themoviedb.org/3"

  return (
      <ThemeContextProvider>
        <BrowserRouter>
          <Header />    
          <Routes>
            <Route path='/' element={<HomePage apiKey={apiKey} baseUrl={baseUrl} />} />
          </Routes>
        </BrowserRouter>
      </ThemeContextProvider>
  )
}

export default App
