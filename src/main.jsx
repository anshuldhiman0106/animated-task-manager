import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Data from './Data/Data'

createRoot(document.getElementById('root')).render(
  <Data>
    <StrictMode>
      <App />
    </StrictMode>
  </Data>
)
