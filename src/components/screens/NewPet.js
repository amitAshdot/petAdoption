import React, { useEffect } from 'react';
import Contact from '../layout/contact/Contact';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const NewPet = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleClick = (event, linkTo) => {
        event.preventDefault();
        if (linkTo === "new-pet")
            window.open(ROUTES.GOOGLEPETS);
        else if (linkTo === "new-association")
            window.open(ROUTES.GOOGLEASSOCIATION);
    }

    return (
        <div className="newPet">
            <div className="newPet__container">
                <h1 className="newPet-title">רוצים לשתף מודעה באתר?</h1>
                <h3 className="newPet-subtitle">ניתן לעשות זאת בקלות באמצעות מילוי טופס קצר</h3>
                <div className="newPet__buttons">

                    <Link
                        target="_blank"
                        onClick={(event) => handleClick(event, 'new-pet')}
                        className="newPet__buttons-link"
                    >
                        <button className="newPet__button" type="button">העלת בעל חיים</button>
                    </Link>

                    <Link
                        target="_blank"
                        onClick={(event) => handleClick(event, 'new-association')}
                        className="newPet__buttons-link"
                    >
                        <button className="newPet__button" type="button">העלת פרטי עמותה</button>
                    </Link>
                </div>
            </div>
            <Contact />
        </div>
    )
}

export default NewPet
