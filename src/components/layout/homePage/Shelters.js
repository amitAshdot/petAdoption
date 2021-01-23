import React from 'react';
import { SEARCH } from '../../constants/routes';

const Shelters = () => {

    return (
        <>
            <div className="shelters">
                {window.location.href.includes(SEARCH) ?
                    <div className="shelters__rightPeekingImage">
                        <img src={require('../../../images/pets-peeking.png')} alt="pet with owner" className="shelters__image" />
                    </div>
                    :
                    <div className="shelters__leftPeekingImage">
                        <img src={require('../../../images/pets-peeking.png')} alt="pet with owner" className="shelters__image" />
                    </div>
                }
                <div className="shelters__wrapper">
                    <p className="shelters__title">בשיתוף פעולה עם עמותות</p>
          
                    <div className="shelters__content">
                        <p className="shelters__text">בישראל פועלות מספר לא קטן של עמותות שנועד להגן על הצרכים של חיות מחמד בצורות שונות, בפרט בכל מה שקשור לאימוץ, גידול וטיפול. עמותות אלו פועלות באופן עצמאי, חלקן פועלות על בסיס ארצי, אחרות על בסיס אזורי. באתר נאסוף למאגר את הבעלי חיים שמחכים לאימוץ על מנת לסייע להם למצוא בית.</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Shelters
