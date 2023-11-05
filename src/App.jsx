import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import { useTelegram } from './hooks/useTelegram'
import { useSearchParams } from 'react-router-dom'
import Plot from 'react-plotly.js'
import axios from 'axios'
// import { redraw } from 'plotly.js'

function App() {
  const {onToggleButton, tg} = useTelegram();
  const [searchParams, setSearchParams] = useSearchParams()
  const [firstData, setFirstData] = useState(null)
  const [data, setData] = useState(null)

  // const [dataX, setDataX] = useState()
  // const [dataY, setDataY] = useState()

  // const [ctr, setCtr] = useState(1);
  
  const upd = async () => {
    // const newData = [...data, {x: ctr, y: parseInt(101*Math.random())}]
    // if (newData.length > 25) {
    //   newData.splice(0, 1)
    // }
    // const newDataX = data.map(d => d.x)
    // const newDataY = data.map(d => d.y)
    const res = await axios.get(`https://api.lazywatcher.divarteam.ru/v1/metric?access_id=${searchParams.get('access_id')}&metric_type=${searchParams.get('metric_type')}`)
    const json = res.data
    console.log(json)
    setData(json);
    // setDataX(newDataX)
    // setDataY(newDataY)

    // setCtr(ctr+1)
    // setTimeout(foo, 1000)
  }

  useEffect(() => {
    tg.ready();

    (async () => {
      const res = await axios.get(`https://api.lazywatcher.divarteam.ru/v1/metric?access_id=${searchParams.get('access_id')}&metric_type=${searchParams.get('metric_type')}`)
      const json = res.data
      setFirstData(json)
    })()
  }, [])
 
  useEffect(() => {
    // (async() => {
    //   const res = await axios.get('https://api.lazywatcher.divarteam.ru/v1/metric?access_id=1&metric_type=check_server_size')
    //   const json = res.data
    //   console.log(json)
    //   setData(json);
    // })()
    setTimeout(upd, 3 * 1000)
    //console.log(data)
  }, [data])

  return (
    <div className='App'>
      <Header />
      <main>
        <h2>Статистика в реальном времени</h2>
        {/* {ctr} */}
        {/* <p>{JSON.stringify(searchParams)}</p> */}
        {/* <p>{searchParams.get('access_id')}</p> */}
        {/* <p>{searchParams.get('metric_type')}</p> */}
        <Plot
          // style={{width: '100%'}}
          data={[
            {
              x: data ? data?.x : firstData?.x,
              y: data ? data?.y : firstData?.y,
              type: 'scatter',
              marker: {color: '#1B9E77'}
            }
          ]}
          layout={
            {
              // template: 'plotly_dark',
              width: 400,
              height: 300,
              plot_bgcolor: '#0F2027',
              paper_bgcolor: '#0F2027',
              color: 'green',
              title: {text: data ? data?.title : firstData?.title, font: {color: '#FFFFFF'} /*plot_name*/},
              xaxis: {
                  title: {
                      text: data ? data?.x_title : firstData?.x_title, //x_axis_name
                  },
                  color: "#FFFFFF",
                  fixedrange: true
              },
              yaxis: {
                  title: {
                    text: data ? data?.y_title : firstData?.y_title, //y_axis_name
                  },
                  color: "#FFFFFF",
                  fixedrange: true
                  // range: [0, 100],
              }
            } 
          }
        />
      </main>
    </div>
  )
}

export default App
