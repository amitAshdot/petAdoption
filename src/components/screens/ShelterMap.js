import React, { useEffect, useState } from 'react';
import { googleMapsAPIKey } from '../../config/apiKeys'
import { shelterLocations } from '../constants/shelterLocations';
import { GoogleMap, useJsApiLoader, InfoWindow, Marker } from '@react-google-maps/api';

const ShelterMap = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const containerStyle = {
        width: '100%',
        height: '80vh'
    };

    const position = {
        lat: 32.0569574,
        lng: 34.7930300
    }

    const OPTIONS = {
        minZoom: 8,
        maxZoom: 18,
        streetViewControl: false
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        language: 'he',
        mapTypeControl: false,
        googleMapsApiKey: googleMapsAPIKey
    })

    const [state, setState] = useState(
        {
            markerId: null,
            showingInfoWindow: false
        }
    );

    const onMarkerClick = (id) => {
        setState({
            markerId: id,
            showingInfoWindow: true
        });
    };

    const onInfoWindowClose = () =>
        setState({
            markerId: null,
            showingInfoWindow: false
        });

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(position);
        map.fitBounds(bounds);
        setMap(bounds)
        var zoomChangeBoundsListener = window.google.maps.event.addListenerOnce(map, 'bounds_changed', function (event) {
            if (this.getZoom()) {
                this.setZoom(13);
            }
        });
        setTimeout(function () { window.google.maps.event.removeListener(zoomChangeBoundsListener) }, 2000);
        setMap(map)
    }, [position])

    const onUnmount = React.useCallback(function callback() {
        setMap(null)
    }, [])

    const shelterMarkers = shelterLocations.length > 0 ? (
        shelterLocations.map(shelter => {
            return (
                <Marker
                    onClick={onMarkerClick.bind(this, shelter.id)}
                    onMouseOver={onMarkerClick.bind(this, shelter.id)}
                    position={shelter.position}
                    icon={{
                        url: require('../../images/map.svg'),
                        scaledSize: map !== null ? new window.google.maps.Size(50, 50) : null
                    }}
                >
                    {state.showingInfoWindow === true && state.markerId === shelter.id ?
                        <InfoWindow
                            onCloseClick={onInfoWindowClose}
                        >
                            <div className="ShelterMap">
                                <p className="ShelterMap__markerName">{shelter.name}</p>
                                <p className="ShelterMap__markerAddress">{shelter.address}</p>
                                <a className="ShelterMap__website"
                                    href={shelter.website}
                                    target="_blank"
                                    rel="noopener noreferrer"   >
                                    <p>
                                        <img src={require('../../images/desktop.svg')} className="ShelterMap__websiteLogo" alt="לוגו מחשב" />
                                &nbsp;&nbsp;האתר של העמותה
                            </p>

                                </a>
                                {shelter.nav !== "" ? 
                                <a href={"http://maps.google.com/?q=" + shelter.nav} target="_blank"
                                    className="ShelterMap__website"
                                    rel="noopener noreferrer">
                                    <p>
                                        <img src={require('../../images/compass.svg')} className="ShelterMap__websiteLogo" alt="לוגו ניווט" />
                                &nbsp;&nbsp;ניווט
                            </p>
                                </a>
                                :
                                <p className="ShelterMap__website">
                                                                        <img src={require('../../images/compass.svg')} className="ShelterMap__websiteLogo" alt="לוגו ניווט" />
                                    &nbsp;&nbsp;אין מיקום
                                    </p>
                    }
                            </div>
                        </InfoWindow>
                        : <></>
                    }
                </ Marker>)
        })
    ) : (
            <></>
        )

    return (
        <div className="ShelterMap">
            {isLoaded ? (
                <GoogleMap
                    options={OPTIONS}
                    mapContainerStyle={containerStyle}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    <></>
                    {shelterMarkers}
                </GoogleMap>
            ) : <></>
            }
        </div>
    )
}

export default ShelterMap
