/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { motion } from "framer-motion"

import "./cursor.css"

export default function Cursor(props) {
    console.log(props)
    const { x, y, img } = props
    return (
        <motion.div layout={props.name}  style={{
            position: 'absolute',
            top: y,
            left: x
        }} >
            <img className="cursor" width="60px" height="60px" src={img}/>
            <span>{props.name}</span>
        </motion.div>
    )
}
