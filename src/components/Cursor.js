/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import "./cursor.css"

export default function Cursor(props) {
    const { x, y, img } = props
    return (
        <img className="cursor" width="60px" height="60px" src={img} style={{
            position: 'absolute',
            top: y,
            left: x
        }} />
    )
}
