import './App.css'
import { RouterProvider } from 'react-router'
import router from './routes'
import { useEffect } from 'react'
import { isEnvBrowser } from './utils/misc'

function App() {
  useEffect(() => {
    if (isEnvBrowser()) {
      document.getElementsByTagName('body')[0].style.backgroundImage = 'url(https://wallpapercat.com/w/full/5/1/f/130392-3840x2160-desktop-4k-grand-theft-auto-5-wallpaper-image.jpg)'
    }
  }, [])
  return (
    <RouterProvider router={router} />
  )
}

export default App
