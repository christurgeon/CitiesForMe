import ReactDOM from 'react-dom'
import App from './App'
import './index.scss'
import AppContextProvider from './providers/AppContextProvider'

ReactDOM.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
  document.getElementById('root')
)
