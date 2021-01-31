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
            window.open(ROUTES.GOOGLEASSOCIATION);
        else if (linkTo === "new-association")
            window.open(ROUTES.GOOGLEASSOCIATION);
    }

    return (
        <div className="newPet">
            <div className="newPet__container">
                <h1 className="newPet-title">רוצים לקחת חלק?</h1>
                <h3 className="newPet-subtitle">הרשמו בתור עמותה או העלו חיית מחמד עם טופס פשוט</h3>
                <div className="newPet__buttons">
                    <Link
                        target="_blank"
                        onClick={(event) => handleClick(event, 'new-association')}
                        className="newPet__buttons-link"
                    >
                        <button class="miniSearch__button" type="button">הרשמו כעמותה</button>
                    </Link>
                    <Link
                        target="_blank"
                        onClick={(event) => handleClick(event, 'new-pet')}
                        className="newPet__buttons-link"
                    >
                        <button class="miniSearch__button" type="button">הוספת חבר מחמד</button>
                    </Link>
                </div>
            </div>
            <Contact />
        </div>
    )
}

export default NewPet
