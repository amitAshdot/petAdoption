import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader, InfoWindow, Marker } from '@react-google-maps/api';

const ShelterMap = () => {

    const markerSize = new window.google.maps.Size(50, 50)
    const [state, setState] = useState(
        {
            mapMarker: null,
            showingInfoWindow: false
        }
    );

    const onMarkerClick = (props) => {
        setState({
            showingInfoWindow: true
        });
    };

    const onInfoWindowClose = () =>
        setState({
            showingInfoWindow: false
        });

    const containerStyle = {
        width: '100%',
        height: '2000px'
    };

    const position = {
        lat: 32.0069574,
        lng: 34.7630300
    }

    const position2 = {
        lat: 31.2117257,
        lng: 35.0818155
    }

    const OPTIONS = {
        // zoom: 12,
        minZoom: 8,
        maxZoom: 18
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDiAu70gQ4IMdIA5Jt8Y1t0257ReutV2mQ"
    })
    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(position);
        map.fitBounds(bounds);
        var zoomChangeBoundsListener = window.google.maps.event.addListenerOnce(map, 'bounds_changed', function (event) {
            if (this.getZoom()) {
                this.setZoom(11);
            }
        });
        setTimeout(function () { window.google.maps.event.removeListener(zoomChangeBoundsListener) }, 2000);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const shelterData = [{
        name: "עמותת תנו לחיות לחיות",
        address: "דב פרידמן 8, רמת גן",
        website: "https://www.letlive.org.il/",
        address: "",
        lat: "",
        lng: ""

    },
    {

    }
    ]

    const shelterMarkers = shelterData.length > 0 ? (
        shelterData.map(shelter => {
            return (
                <Marker
                onMouseOver={onMarkerClick}
                position={position}
                name={'Kenyatta International Convention Centre'}
                onClick={onMarkerClick}
                icon={{
                    url: require('../../images/map.svg'),
                    scaledSize: new window.google.maps.Size(50, 50)
                }}
            >
                {state.showingInfoWindow === true && (
                    <InfoWindow
                        onCloseClick={onInfoWindowClose}
                    >
                        <div className="ShelterMap">
                            <p className="ShelterMap__markerName">עמותת תנו לחיות לחיות</p>
                            <p className="ShelterMap__markerAddress">דב פרידמן 8, רמת גן</p>
                            <a className="ShelterMap__markerAddress"
                                href='https://www.letlive.org.il/'
                                target="_blank"
                                className="ShelterMap__website"
                                rel="noopener noreferrer"   >
                                <p>
                                    <img src={require('../../images/desktop.svg')} className="ShelterMap__websiteLogo" alt="קבוצה של כלבים חתולים וכל מיני חיות אחרות" />
                                &nbsp;&nbsp;האתר של העמותה
                            </p>

                            </a>

                            <a href="http://maps.google.com/?q=עמותת תנו לחיות לחיות" target="_blank"
                                className="ShelterMap__website"
                                rel="noopener noreferrer">
                                <p>

                                    <img src={require('../../images/compass.svg')} className="ShelterMap__websiteLogo" alt="קבוצה של כלבים חתולים וכל מיני חיות אחרות" />
                                &nbsp;&nbsp;ניווט
                            </p>
                            </a>
                        </div>
                    </InfoWindow>
                )}
            </ Marker>)
        })
    ) : (
            <div className="search__noPets"> לא נמצאו חיות לפי הסינון הנוכחי.</div>
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
                    <Marker
                        onMouseOver={onMarkerClick}
                        // onMouseOut={onInfoWindowClose}
                        position={position}
                        name={'Kenyatta International Convention Centre'}
                        onClick={onMarkerClick}
                        icon={{
                            url: require('../../images/map.svg'),
                            scaledSize: new window.google.maps.Size(50, 50),
                        }}
                    >
                        {state.showingInfoWindow === true && (
                            <InfoWindow
                                onCloseClick={onInfoWindowClose}
                            >
                                <div className="ShelterMap">
                                    <p className="ShelterMap__markerName">עמותת תנו לחיות לחיות</p>
                                    <p className="ShelterMap__markerAddress">דב פרידמן 8, רמת גן</p>
                                    <a className="ShelterMap__markerAddress"
                                        href='https://www.letlive.org.il/'
                                        target="_blank"
                                        className="ShelterMap__website"
                                        rel="noopener noreferrer"   >
                                        <p>
                                            <img src={require('../../images/desktop.svg')} className="ShelterMap__websiteLogo" alt="קבוצה של כלבים חתולים וכל מיני חיות אחרות" />
                                        &nbsp;&nbsp;האתר של העמותה
                                    </p>

                                    </a>

                                    <a href="http://maps.google.com/?q=עמותת תנו לחיות לחיות" target="_blank"
                                        className="ShelterMap__website"
                                        rel="noopener noreferrer">
                                        <p>

                                            <img src={require('../../images/compass.svg')} className="ShelterMap__websiteLogo" alt="קבוצה של כלבים חתולים וכל מיני חיות אחרות" />
                                        &nbsp;&nbsp;ניווט
                                    </p>
                                    </a>
                                </div>
                            </InfoWindow>
                        )}
                        {shelterMarkers}
                    </ Marker>
                    <Marker
                        position={position2}
                        name={'Kenyatta International Convention Centre'}
                    />
                </GoogleMap>
            ) : <></>
            }
        </div>
    )
}

export default React.memo(ShelterMap);
