import './tokens.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Board } from './components/Board/Board'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>,
)
