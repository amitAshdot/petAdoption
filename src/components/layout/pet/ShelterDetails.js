import React from 'react';
import { useSelector } from 'react-redux';

const ShelterDetails = () => {

    const detailState = useSelector(state => state.detailReducer);

    return (
        <>
            {detailState.shelter !== null && detailState.shelterLoading === false && detailState.pet !== null ?
                <div className="ShelterDetails">
                    <h2 className="ShelterDetails__title">פרטי העמותה המפרסמת</h2>
                    <div className="ShelterDetails__wrapper">
                        <img className="ShelterDetails__logo" src={`data:image/png;base64, ${detailState.shelter.logo}`} alt="לוגו של העמותה" />
                        <p className="ShelterDetails__name">{detailState.shelter.name}</p>
                        <p className="ShelterDetails__description">{detailState.shelter.description}</p>
                    </div>
                    <br />
                    <div className="ShelterDetails__contactInfo">

                        <div className="ShelterDetails__contactWrapper">
                            <p className="ShelterDetails__contactTitle">טלפון</p>
                            <p className="ShelterDetails__contactInfo">{detailState.shelter.phoneNumber}</p>
                        </div>


                        <div className="ShelterDetails__contactWrapper">
                            <p className="ShelterDetails__contactTitle">אימייל</p>
                            <a className="ShelterDetails__contactInfo" href={`mailto:${detailState.shelter.email}`}>{detailState.shelter.email}</a>
                        </div>

                        {detailState.shelter.website !== "" ?
                            <div className="ShelterDetails__contactWrapper">
                                <p className="ShelterDetails__contactTitle">אתר העמותה</p>
                                <a className="ShelterDetails__contactInfo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={detailState.shelter.website}
                                >
                                    {detailState.shelter.website}
                                </a>
                            </div>
                            :
                            <div />
                        }

                        {detailState.shelter.socialSite !== "" ?
                            <div className="ShelterDetails__contactWrapper">
                                <p className="ShelterDetails__contactTitle">רשת חברתית</p>
                                <a className="ShelterDetails__contactInfo"
                                    href={detailState.shelter.socialSite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {detailState.shelter.socialSite}
                                </a>
                            </div>

                            :
                            <div />
                        }
                        <div className="ShelterDetails__contactWrapper">
                            <p className="ShelterDetails__contactTitle">כתובת</p>
                            <p className="ShelterDetails__contactInfo">{detailState.shelter.address}</p>
                        </div>
                    </div>
                </div >
                :
                <div />
            }
        </>
    )
}

export default ShelterDetails
