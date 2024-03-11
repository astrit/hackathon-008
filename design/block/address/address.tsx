import { useEffect, useState } from "react"

import "@/address/address.css"

export default function Address() {
  const [location, setLocation] = useState({ city: "", country: "" })

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        const city = data.city ? data.city.substring(0, 3).toUpperCase() : ""
        const country = data.country ? data.country_code.toUpperCase() : ""
        setLocation({ city, country })
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <address>
      {location.city && location.country && (
        <div>{`${location.city}, ${location.country}`}</div>
      )}
    </address>
  )
}
