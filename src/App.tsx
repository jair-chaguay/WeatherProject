import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import './App.css';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPane';


function App() {

          en el arreglo de resultados
      */}

      let location = xml.getElementsByTagName("location")[1]

      let geobaseid = location.getAttribute("geobaseid")
      dataToIndicators.push(["Location", "geobaseid", geobaseid])

      let latitude = location.getAttribute("latitude")
      dataToIndicators.push(["Location", "Latitude", latitude])

      let longitude = location.getAttribute("longitude")
      dataToIndicators.push(["Location", "Longitude", longitude])


      console.log(dataToIndicators)

      {/*Renderice el arreglo de resultados en un arreglo de elementos Indicator*/ }
      let indicatorsElements = Array.from(dataToIndicators).map(
        (element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
      )

      {/*Modificación de la variable de estado mediante a función de actualización*/ }

      setIndicators(indicatorsElements)

      let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {
        let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1]
        let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code")
        return { "rangeHours": rangeHours, "windDirection": windDirection }
      })

      arrayObjects = arrayObjects.slice(0, 8)
      setRowsTable(arrayObjects)

    })()
  }, [])


  {/* Función para el efecto secundario a ejecutar y Arreglo de dependencias */ }



  return (
    <Grid container spacing={5}>
      <Grid xs={6} lg={2}>
        {indicators[0]}
      </Grid>
      <Grid xs={6} lg={2}>
        {indicators[1]}
      </Grid>
      <Grid xs={6} lg={2}>
        {indicators[2]}
      </Grid>
      <Grid xs={6} lg={2}>
        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
      </Grid>
      <Grid xs={6} sm={4} md={6} lg={2}>
        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
      </Grid>
      <Grid xs={6} sm={4} md={6} lg={2}>
        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
      </Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>
        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
        <Summary></Summary>
      </Grid>
      <Grid xs={12} lg={8}>
        <BasicTable rows={rowsTable}></BasicTable>
      </Grid>
      <Grid xs={12} lg={2}>
        <ControlPanel />
      </Grid>
      <Grid xs={12} lg={10}>
        <WeatherChart></WeatherChart>
      </Grid>

    </Grid>

  )
}

export default App
