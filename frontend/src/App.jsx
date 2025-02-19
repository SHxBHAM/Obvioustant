import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {ThemeProvider} from './components/theme-provider'
import SpeechToText from './components/SpeechToText'


function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider>
      <SpeechToText/>
    </ThemeProvider>
  )
}

export default App
