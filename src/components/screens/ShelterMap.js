import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader, InfoWindow, Marker } from '@react-google-maps/api';

const ShelterMap = () => {

    // const markerSize = new window.google.maps.Size(50, 50)
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

    const containerStyle = {
        width: '100%',
        height: '2000px'
    };

    const position = {
        lat: 32.0069574,
        lng: 34.7630300
    }

    const OPTIONS = {
        minZoom: 8,
        maxZoom: 18
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        language: 'he',
        googleMapsApiKey: "AIzaSyDiAu70gQ4IMdIA5Jt8Y1t0257ReutV2mQ"
    })
    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(position);
        map.fitBounds(bounds);
        setMap(bounds)
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
        id: 1,
        name: "עמותת תנו לחיות לחיות",
        address: "דב פרידמן 8, רמת גן",
        website: "https://www.letlive.org.il/",
        nav: "עמותת תנו לחיות לחיות",
        position: {
            lat: 32.08141107662856,
            lng: 34.80155481663905
        }
    },
    {
        id: 2,
        name: "אגודת צער בעלי חיים בישראל רמת גן והסביבה",
        address: "חפץ חיים 4, תל אביב יפו",
        website: "https://www.spca.org.il/",
        nav: "אגודת צער בעלי חיים בישראל רמת גן והסביבה",
        position: {
            lat: 32.07364912700168,
            lng: 34.798742224227205
        }
    }
    ]

    const shelterMarkers = shelterData.length > 0 ? (
        shelterData.map(shelter => {
            return (
                <Marker
                    onClick={onMarkerClick.bind(this, shelter.id)}
                    onMouseOver={onMarkerClick.bind(this, shelter.id)}
                    position={shelter.position}
                    name={'Kenyatta International Convention Centre'}
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
                                <a className="ShelterMap__markerAddress"
                                    href={shelter.website}
                                    target="_blank"
                                    className="ShelterMap__website"
                                    rel="noopener noreferrer"   >
                                    <p>
                                        <img src={require('../../images/desktop.svg')} className="ShelterMap__websiteLogo" alt="לוגו מחשב" />
                                &nbsp;&nbsp;האתר של העמותה
                            </p>

                                </a>

                                <a href={"http://maps.google.com/?q=עמותת תנו לחיות לחיות" + shelter.nav} target="_blank"
                                    className="ShelterMap__website"
                                    rel="noopener noreferrer">
                                    <p>

                                        <img src={require('../../images/compass.svg')} className="ShelterMap__websiteLogo" alt="לוגו ניווט" />
                                &nbsp;&nbsp;ניווט
                            </p>
                                </a>
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

export default React.memo(ShelterMap);
