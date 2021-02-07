import React, { useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const ShelterMap = () => {

    const containerStyle = {
        width: '100%',
        height: '2000px'
    };

    const center = {
        lat: 31.4117257,
        lng: 35.0818155
    };

    const OPTIONS = {
        minZoom: 10,
        maxZoom: 10,
      }
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDiAu70gQ4IMdIA5Jt8Y1t0257ReutV2mQ"
    })
    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="ShelterMap">
            {isLoaded ? (
                <GoogleMap
                options = {OPTIONS}
                    mapContainerStyle={containerStyle}
                    // center={center}
                    // zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    { /* Child components, such as markers, info windows, etc. */}
                    <></>
                </GoogleMap>
            ) : <></>
            }
        </div>
    )
}

    export default React.memo(ShelterMap);
