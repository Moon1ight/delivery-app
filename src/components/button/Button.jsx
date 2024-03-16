import React from "react"
import "./styles.scss"

const Button = ({ title, onClick }) => {
    return (
        <button className='custom-button' onClick={() => onClick()}>
            {title}
        </button>
    )
}

export default Button
