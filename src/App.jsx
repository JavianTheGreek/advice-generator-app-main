import { useState } from 'react'
import Card from './Components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Card />
    </div>
  )
}

export default App
