import { useEffect, useState } from "react";


const useMousePosition = () => {
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    })

    useEffect(() => {
        const updatePointer = event => {
            setPosition(p => ({
                x: event.x,
                y: event.y,
            }))
        }
        window.addEventListener("mousemove", updatePointer);
        // window.addEventListener("touchmove", updatePointer);
    
        return () => {
            window.removeEventListener('mousemove', updatePointer);
            // window.removeEventListener('touchmove', updatePointer);
        }
    }, [])

    return position
}


export default useMousePosition;