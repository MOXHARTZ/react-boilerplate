import './App.css'
import { RouterProvider } from 'react-router'
import router from './routes'
import { useEffect } from 'react'
import { isEnvBrowser } from './utils/misc'
import useNuiEvent from './hooks/useNuiEvent'
import { ReadyListener } from './utils/types'
import { initReactI18next } from 'react-i18next'
import i18n from "i18next";

function App() {
  useEffect(() => {
    if (isEnvBrowser()) {
      document.body.style.backgroundImage = 'url(https://wallpapercat.com/w/full/5/1/f/130392-3840x2160-desktop-4k-grand-theft-auto-5-wallpaper-image.jpg)'
    }
  }, [])
  useNuiEvent<ReadyListener>('onUiReady', (data) => {
    i18n.use(initReactI18next).init({
      lng: data.languageName,
      resources: data.resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    })
  })
  return (
    <RouterProvider router={router} />
  )
}

export default App
