import React from 'react'

const CarouselPetImage = (props) => {

    const getNonZeroRandomNumberWithMathRound = () => {
        var random = Math.round(Math.random() * 15) - 7;
        console.log(random)
        if (random > 7)
            random = 7
        if (random < -7)
            random = -7
        // console.log(random)

        return `${random}deg`;
    }
    const style = { transform: `rotate(${getNonZeroRandomNumberWithMathRound()})` }
    return (
        <div className="" style={style}>
            {/* <img src="../../../images/frame.png" alt="image frame" className="carousel__item__imageFrame" /> */}
            <img src={props.image} alt="petImage" className="carousel__item__image" />
        </div>
    )
}

export default CarouselPetImage