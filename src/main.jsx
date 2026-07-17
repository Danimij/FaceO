import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Fade out the branded splash once the app has mounted (min visible time for polish)
window.setTimeout(() => {
  const s = document.getElementById('splash')
  if (s) {
    s.classList.add('hide')
    window.setTimeout(() => s.remove(), 600)
  }
}, 650)
