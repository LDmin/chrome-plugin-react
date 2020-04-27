import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { NAMESPACE } from '../constant'

function renderApp() {
  const app = document.createElement('div')
  app.id = NAMESPACE + 'root'
  document.body.appendChild(app)
  ReactDOM.render(<App />, app)
}

renderApp()
