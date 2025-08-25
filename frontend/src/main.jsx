import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import ChatProvider from './context/ChatContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ShopContextProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </ShopContextProvider>
    </BrowserRouter>
  </StrictMode>
)
