"use client"

import { useEffect, useState } from "react"

const Forecast: React.FC = () => {
  const [weatherData, setWeatherData] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://wttr.in/?format=%f+%w")
        // const response = await fetch("https://wttr.in/?format=%f+%w+%l")
        const data = await response.text()
        setWeatherData(data)
      } catch (error) {
        console.error("Error fetching weather data:", error)
      }
    }

    if (!weatherData) {
      fetchData()
    }
  }, [weatherData])

  return weatherData && <span>{weatherData}</span>
}

export default Forecast
