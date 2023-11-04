import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import { useTelegram } from './hooks/useTelegram'
import Plot from 'react-plotly.js'
// import { redraw } from 'plotly.js'

function App() {
  const {onToggleButton, tg} = useTelegram();
  const [data, setData] = useState([])

  const [dataX, setDataX] = useState()
  const [dataY, setDataY] = useState()

  const [ctr, setCtr] = useState(1);
  
  const foo = () => {
    const newData = [...data, {x: ctr, y: parseInt(10*Math.random())}]
    if (newData.length > 25) {
      newData.splice(0, 1)
    }
    const newDataX = data.map(d => d.x)
    const newDataY = data.map(d => d.y)
    setData(newData);
    setDataX(newDataX)
    setDataY(newDataY)

    setCtr(ctr+1)
    // setTimeout(foo, 1000)
  }

  useEffect(() => {
    tg.ready();
  }, [])
 
  useEffect(() => {
    setTimeout(foo, 50)
    console.log(ctr)
  }, [ctr])

  return (
    <div className='App'>
      <Header />
      <main>
        {ctr}
        <p>{JSON.stringify(data)}</p>
        <Plot
          data={[
            {
              x: dataX,
              y: dataY,
              type: 'scatter'
            }
          ]}
        />
      </main>
    </div>
  )
}

export default App
