import React, { useEffect, useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useSelector } from 'react-redux'
import { RootState } from 'sr/redux/store'

const GoogleMapComponent = (props: any) => {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoadedLegend, setIsLoadedLegend] = useState(false)
  const [mapObj, setMap] = useState<any | null>(null)
  const [polylineCoordinates, setPolylineCoordinates] = useState<any | null>([])
  const [clusterData, setClusterData] = useState<any | null>([])
  const [farmData, setFarmData] = useState<any | null>([])
  const mapStatus: string = useSelector((state: RootState) => state.googleMap.status)

  useEffect(() => {
    if (mapStatus == 'success') {
      setIsLoaded(true)
    }
  }, [mapStatus])

  useEffect(() => {
    if (props.clusterData && props.clusterData?.length > 0) {
      const cluster = props.selectedClusterId ? props.clusterData.filter((val: any) => val.id == props.selectedClusterId) : props.clusterData
      console.log('cluster', cluster)
      setClusterData(cluster)
      setFarmData(props.farmData)
    }
  }, [props.selectedClusterId, props.clusterData])

  useEffect(() => {
    if (mapObj) {
      const map = mapObj
      if (props.mapType === 'FarmLandPlotting') {
        let ploygonArr: any = []
        let statusTypes: any = []
        for (const status of props.farmStatus) {
          statusTypes[status.id] = status
        }
        let i = 99999;
        for (const farmData of props.farmData) {
          let ploy: any = []
          const farm = farmData?.data
          const color: any = statusTypes?.[farm?.status]
          farm.farmProfile?.farmLandPlotting?.coordinates.map((val: any) => {
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
          ploygonArr.push(ploy)

          const polygon: any = new window.google.maps.Polygon({
            paths: ploy,
            strokeColor: color?.borderColor || '#00D4FF', // Outline color
            strokeOpacity: 0.9, // Outline opacity
            strokeWeight: 1, // Outline thickness
            fillColor: color?.color || '#00FFFF', // Fill color
            fillOpacity: 0.35, // Fill opacity    
            zIndex: i++
          })
          // var infowindow = new google.maps.InfoWindow();
          polygon.setMap(map)
          polygon.addListener('click', function () {
            props.handleFramClick(farm, true)
          });
          // polygon.addListener('mouseover', function () {
          //   infowindow.setContent(farm.farmName);
          //   infowindow.open(map, polygon);
          //   console.log('hover', farm)
          // });
          // polygon.addListener('mouseout', function () {
          //   infowindow.close();
          //   console.log('mouseout', polygon)
          // });
          // google.maps.event.addListener(polygon, 'click', showArrays);
          // map.setCenter(bounds.getCenter())

        }

        const legend = document.getElementById("legend") as HTMLElement;

        map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(legend);
        setIsLoadedLegend(true)

        // const bounds = new window.google.maps.LatLngBounds()
        // farmLandPlotting.forEach(function (coord: any, index: any) {
        //   bounds.extend(coord)
        // })
        // polygon.setMap(map)

      } else {
        map.setCenter({ lat: latitude, lng: longitude })
        map.setZoom(10)
      }
    }
  }, [mapObj])

  const handleLoad = (map: any) => {
    map.data.forEach(function (feature: any) {
      console.log('feature', feature)
      // filter...
      map.data.remove(feature);
    });
    if (props.clusterData?.length > 0) {
      const clusters = props.selectedClusterId ? props.clusterData.filter((val: any) => val.id == props.selectedClusterId) : props.clusterData
      for (const cluster of clusters) {
        const coordinates = cluster?.geoLocation?.coordinates
        const circle: any = new window.google.maps.Circle({
          center: {
            lat: coordinates?.[1],
            lng: coordinates?.[0]
          },
          radius: cluster?.radius * 1000,
          strokeColor: '#FF5500', // Outline color
          strokeOpacity: 0.9, // Outline opacity
          strokeWeight: 1, // Outline thickness
          fillColor: '#FF0000', // Fill color
          fillOpacity: 0.35, // Fill opacity              
        })
        // var infowindow = new google.maps.InfoWindow();
        circle.setMap(map)
      }
      const pinLocation = props.clusterData[0]?.geoLocation?.coordinates
      map.setZoom(10)
      map.setCenter({ lat: pinLocation[1], lng: pinLocation[0] })
     
    }
    map.setMapTypeId('satellite')
    setMap(map)
  }
  const defaultOptions = {
    disableDefaultUI: true,
  }

  return (
    <div style={{ height: '500px', width: '100%' }}>      
      {isLoaded ? (
        <GoogleMap
          onLoad={handleLoad}
          mapContainerStyle={{ height: '100%', width: '100%' }}
          options={defaultOptions}
        >
          {props.mapType !== 'FarmLandPlotting' && (
            <Marker position={{ lat: latitude, lng: longitude }} title={'Farm Location'} />
          )}
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
      <div id='legend' className='bg-white border border-[#000] p-2 m2'>
        <div className='text-sm font-bold'>Legend</div>
      {
        isLoadedLegend && props?.farmStatus?.map((status: any)=>(
          <div key={status.id} style={{
            backgroundColor: status.color,
            borderColor:  status.borderColor
          }} className={`border p-1`}>{status.value}</div>
        ))
      }
      </div>
    </div>
  )
}

export default GoogleMapComponent
