import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, InfoWindow, Marker } from '@react-google-maps/api';

const ShelterMap = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const containerStyle = {
        width: '100%',
        height: '80vh'
    };

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
    },
    {
        id: 3,
        name: "רחובות אוהבת חיות",
        address: "אברבנאל 49, תל אביב יפו",
        website: "https://www.rehovotlovesanimals.org/",
        nav: "רחובות אוהבת חיות",
        position: {
            lat: 32.055493999331865,
            lng: 34.76708007034027
        }
    },
    {
        id: 4,
        name: "עמותת חבר לי",
        address: "2RQG+QC רמת גן",
        website: "https://www.imutz.org/",
        nav: "32.0395003404623, 34.82603726324894",
        position: {
            lat: 32.0396678436307,
            lng: 34.82601668312799
        }
    },
    {
        id: 5,
        name: "אגודת צער בעלי חיים בישראל",
        address: "הרצל 159, תל אביב יפו",
        website: "https://spca.co.il/",
        nav: "32.04683886660783, 34.769151470218226",
        position: {
            lat: 32.04695126717028,
            lng: 34.769136869438384
        }
    },
    {
        id: 6,
        name: "גג לחיות",
        address: "משה הלוי 1, תל אביב יפו",
        website: "https://animals-roof.org.il/",
        nav: "32.04713501167837, 34.758790158960615",
        position: {
            lat: 32.04713501167837,
            lng: 34.75879082951286
        }
    },
    {
        id: 7,
        name: "הום דוג",
        address: 'ש"י עגנון 1, תל אביב יפו',
        website: "https://www.homedog.co.il/",
        nav: "הום דוג",
        position: {
            lat: 32.10261454639824,
            lng: 34.78258525535481
        }
    },
    {
        id: 8,
        name: "אס. או. אס",
        address: "במרכז המסחרי, רחוב רבינדרנת טאגור 38, תל אביב יפו",
        website: "https://www.sospets.co.il/",
        nav: "עמותת S.O.S חיות ברמת אביב",
        position: {
            lat: 32.1171106323388,
            lng: 34.7975022065613
        }
    }
    ]

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
        googleMapsApiKey: "AIzaSyDiAu70gQ4IMdIA5Jt8Y1t0257ReutV2mQ"
    })
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

    const shelterMarkers = shelterData.length > 0 ? (
        shelterData.map(shelter => {
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

                                <a href={"http://maps.google.com/?q=" + shelter.nav} target="_blank"
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

export default ShelterMap
