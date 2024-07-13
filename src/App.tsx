import React from 'react';
import "./App.css";
import Toolbar from '@mui/material/Toolbar';
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Indicator from "./components/Indicator";
import BasicTable from "./components/BasicTable";
import WeatherChart from "./components/WeatherChart";
import Variable from "./components/Variable";
import Grafico from "./components/Grafico"
import TablaDatos from "./components/TablaDatos"
import ControlPanel from "./components/ControlPane";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Typography } from "@mui/material";
function App() {

  {
    /* Variable de estado y función de actualización */
  }

  let [indicators, setIndicators] = useState<JSX.Element[]>([]);
  let [rowsTable, setRowsTable] = useState([]);
  let [infoGraphic, setInfoGraphic] = useState([]);
  let [selectedVariable, setSelectedVariable] = useState(-1);
  let [currentTime, setCurrentTime] = useState("");

  {
    /* Hook: useEffect */
  }

  {
    /* Función para el efecto secundario a ejecutar y Arreglo de dependencias */
  }

  useEffect(() => {
    (async () => {

      let savedTextXML = localStorage.getItem("openWeatherMap");
      let expiringTime = localStorage.getItem("expiringTime");
      let nowTime = new Date().getTime();

      if (expiringTime === null || nowTime > parseInt(expiringTime)) {
        {
          /* 5. Request */
        }

        let API_KEY = "c6b275e1842b7d17ad1ee3483de4ac4d"
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
        let savedTextXML = await response.text();

        console.log(savedTextXML)

        {
          /* 6. Diferencia de tiempo */
        }

        let hours = 1;
        let delay = hours * 3600000;

        {
          /* 7. En el LocalStorage, almacena texto en la clave openWeatherMap y la estampa de tiempo de expiración */
        }

        localStorage.setItem("openWeatherMap", savedTextXML);
        localStorage.setItem("expiringTime", (nowTime + delay).toString());
      }

      {
        /* XML Parser */
      }

      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");
      {
        /* Arreglo para agregar los resultados */
      }

      let dataToIndicators = new Array();

      {
        /* 
         Análisis, extracción y almacenamiento del contenido del XML 
         en el arreglo de resultados
     */
      }

      let location = xml.getElementsByTagName("location")[1];

      if (location) {
        let geobaseid = location.getAttribute("geobaseid");
        dataToIndicators.push(["Location", "geobaseid", geobaseid]);

        let latitude = location.getAttribute("latitude");
        dataToIndicators.push(["Latitude", "Latitude", latitude]);

        let longitude = location.getAttribute("longitude");
        dataToIndicators.push(["Longitude", "Longitude", longitude]);

        let altitude = location.getAttribute("altitude");
        dataToIndicators.push(["Altitude", "Altitude", altitude])
      } else {
        console.error("Location element not found in XML");
      }

      // console.log(dataToIndicators);
      {
        /* Renderice el arreglo de resultados en un arreglo de elementos Indicator */
      }

      let indicatorsElements = Array.from(dataToIndicators).map((element) => (
        <Indicator
          title={element[0]}
          subtitle={element[1]}
          value={element[2]}
        />
      ));
      {
        /* Modificación de la variable de estado mediante la función de actualización */
      }

      setIndicators(indicatorsElements);


      let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {

        let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1];
        let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code");
        let pressure = timeElement.getElementsByTagName("pressure")[0].getAttribute("value");
        let humidity = timeElement.getElementsByTagName("humidity")[0].getAttribute("value");
        let temperature = timeElement.getElementsByTagName("temperature")[0].getAttribute("value")
        let clouds = timeElement.getElementsByTagName("clouds")[0].getAttribute("all");
        return { "rangeHours": rangeHours, "windDirection": windDirection, "pressure": pressure, "temperature": temperature, "humidity": humidity, "clouds": clouds }

      })

      let arrayObjectsG = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {

        let hour = timeElement.getAttribute("from").split("T")[1].substring(0, 5);
        let precipitation = timeElement.getElementsByTagName("precipitation")[0].getAttribute("probability");
        let humidity = timeElement.getElementsByTagName("humidity")[0].getAttribute("value");
        let clouds = timeElement.getElementsByTagName("clouds")[0].getAttribute("all");
        return { "hour": hour, "precipitation": precipitation, "humidity": humidity, "clouds": clouds }

      })


      arrayObjects = arrayObjects.slice(0, 8)
      arrayObjectsG = arrayObjectsG.slice(0, 8)

      {/* 3. Actualice de la variable de estado mediante la función de actualización */ }

      setRowsTable(arrayObjects)
      setInfoGraphic(arrayObjectsG)



    })();
  }, []);


  useEffect(() => {
    const fetchCurrentTime = async () => {
      try {
        const response = await fetch('http://worldtimeapi.org/api/timezone/America/Guayaquil');
        const data = await response.json();
        const date = new Date(data.datetime);
        const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        setCurrentTime(`${formattedDate} · Hora: ${formattedTime}`);
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    fetchCurrentTime();

    const interval = setInterval(fetchCurrentTime, 1000);

    return () => clearInterval(interval);
  }, []);



  return (
    <>
      <div className="app" id='app'>
        <Sidebar />
        <Grid container spacing={5}>
          <Grid xs={12} lg={12}>
            <Header />
            <Typography variant="h5" color="text.secondary" sx={{ textAlign: "center" }}>
              Guayaquil<br />Fecha: {currentTime}
            </Typography>
          </Grid>
          <Grid xs={4} lg={3}>
            {indicators[0]}
            {/*<Indicator title="Precipitación" subtitle="Probabilidad" value={0.13} />*/}
          </Grid>
          <Grid xs={4} lg={3}>
            {indicators[1]}

            {/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}
          </Grid>
          <Grid xs={4} lg={3}>
            {indicators[2]}

            {/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}
          </Grid>
          <Grid xs={4} lg={3}>
            {indicators[3]}
          </Grid>
          
          <Grid xs={12} md={12} lg={12} id='variable'>
            <Variable/>
            <ControlPanel onChange={setSelectedVariable} />
          </Grid>
          <Grid xs={12} md={12} lg={12} id='graph'>
            <Grafico/>
            <WeatherChart selectedVariable={selectedVariable} graficos={infoGraphic}></WeatherChart>
          </Grid>
          <Grid xs={12} md={6} lg={12} id='data_Table'>
            <TablaDatos/>
            <BasicTable rows={rowsTable}></BasicTable>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;