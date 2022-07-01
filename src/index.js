import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'jotai'
import BattleRing from './pages/BattleRing'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider>
      <BattleRing />
    </Provider>
  </React.StrictMode>
)
