import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { Provider } from 'react-redux'
import store from './stores'
import { AnimatePresence } from 'framer-motion';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <Provider store={store}>
        <AnimatePresence mode='wait' initial={true}>
          <App></App>
        </AnimatePresence>
      </Provider>
    </HeroUIProvider>
  </StrictMode>,
)
