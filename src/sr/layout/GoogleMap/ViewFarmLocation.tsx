import React, { useEffect, useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useSelector } from 'react-redux'
import { RootState } from 'sr/redux/store'

const GoogleMapComponent = ({ pinFarmLocation, farmLandPlotting, currentModel }: any) => {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const [isLoaded, setIsLoaded] = useState(false)
  const [map, setMap] = useState(null)
  const [polylineCoordinates, setPolylineCoordinates] = useState<any | null>([])
  const mapStatus: string = useSelector((state: RootState) => state.googleMap.status)

  useEffect(() => {
    if (mapStatus == 'success') {
      setIsLoaded(true)
    }
  }, [mapStatus])

  useEffect(() => {
    if (currentModel === 'FarmLandPlotting') {
      if (farmLandPlotting && farmLandPlotting.length > 0) {
        if (farmLandPlotting[0] && farmLandPlotting[0].length > 0) {
          setLatitude(farmLandPlotting[0][1])
          setLongitude(farmLandPlotting[0][0])
        }
        let ploy: any = []
        farmLandPlotting.map((val: any) => {
          if (val && val.length > 0) {
            const coordinates = val.map((layer: any) =>
            ({
              lat: layer[1],
              lng: layer[0]
            })
            )
            ploy.push(coordinates)
          }
        })
        console.log('ploy', ploy)
        setPolylineCoordinates(ploy)
      }
    } else {
      console.log('pinFarmLocation', pinFarmLocation)
      setLatitude(pinFarmLocation?.lat)
      setLongitude(pinFarmLocation?.lng)
    }
  }, [currentModel])

  const handleLoad = (map: any) => {
    setMap(map)
    if (currentModel === 'FarmLandPlotting') {
      const polygon: any = new window.google.maps.Polygon({
        paths: polylineCoordinates,
        strokeColor: '#004eff', // Outline color
        strokeOpacity: 0.9, // Outline opacity
        strokeWeight: 3, // Outline thickness
        fillColor: '#FF0000', // Fill color
        fillOpacity: 0.35, // Fill opacity
      })
      const bounds = new window.google.maps.LatLngBounds()
      // farmLandPlotting.forEach(function (coord: any, index: any) {
      //   bounds.extend(coord)
      // })
      polygon.setMap(map)

      polygon.getPaths().forEach(function (path: any) {
        let points = path.getArray()
        for (let p in points) bounds.extend(points[p])
      })
      map.setZoom(1)
      map.setCenter(bounds.getCenter())
    } else {
      map.setCenter({ lat: latitude, lng: longitude })
      map.setZoom(15)
    }
    map.setMapTypeId('satellite')
  }
  const defaultOptions = {
    disableDefaultUI: true,
  }

  return (
    <div style={{ height: '300px', width: '100%' }} className='mb-4'>
      {/* <h1 className='text-center text-2xl'>{`${currentModel === 'FarmLandPlotting' ? 'Farm boundaries' : 'Pin farm location'}`}</h1> */}
      {isLoaded ? (
        <GoogleMap
          onLoad={handleLoad}
          mapContainerStyle={{ height: '100%', width: '100%' }}
          options={defaultOptions}
        >
          {currentModel !== 'FarmLandPlotting' && (
            <Marker position={{ lat: latitude, lng: longitude }} title={'Farm Location'} />
          )}
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default GoogleMapComponent
